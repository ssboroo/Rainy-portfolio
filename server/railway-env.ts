import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type PutOptions = {
  onlyIf?: { etagMatches?: string; etagDoesNotMatch?: string };
  httpMetadata?: { contentType?: string };
};

const contentKey = "portfolio/content-v1.json";
const dataDirectory = resolve(
  process.env.DATA_DIR || process.env.RAILWAY_VOLUME_MOUNT_PATH || "/data",
);
const contentFile = resolve(dataDirectory, contentKey);
let writeQueue: Promise<unknown> = Promise.resolve();

function etag(value: string): string {
  return `"${createHash("sha256").update(value).digest("hex")}"`;
}

async function readValue(): Promise<string | null> {
  try {
    return await readFile(contentFile, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

const bucket = {
  async get(key: string) {
    if (key !== contentKey) throw new Error("Unsupported content key");
    const value = await readValue();
    return value === null ? null : { text: async () => value, etag: etag(value) };
  },
  async put(key: string, value: string, options: unknown) {
    if (key !== contentKey) throw new Error("Unsupported content key");
    const run = async () => {
      const current = await readValue();
      const currentEtag = current === null ? null : etag(current);
      const condition = options as PutOptions;
      if (
        (condition.onlyIf?.etagMatches &&
          currentEtag !== condition.onlyIf.etagMatches) ||
        (condition.onlyIf?.etagDoesNotMatch === "*" && current !== null)
      ) {
        return null;
      }
      await mkdir(dirname(contentFile), { recursive: true });
      const tempFile = `${contentFile}.${process.pid}.${randomUUID()}.tmp`;
      await writeFile(tempFile, value, { encoding: "utf8", mode: 0o600 });
      await rename(tempFile, contentFile);
      return { etag: etag(value) };
    };
    const next = writeQueue.then(run, run);
    writeQueue = next.catch(() => undefined);
    return next;
  },
};

if (!process.env.RAILWAY_VOLUME_MOUNT_PATH && !process.env.DATA_DIR) {
  console.warn("RAINY: DATA_DIR is not configured; admin edits may be lost on redeploy. Mount a Railway Volume at /data and set DATA_DIR=/data.");
}

// Vinext routes use Cloudflare's env binding in the Worker build. This
// production Node target exposes the equivalent settings and a durable-volume
// backed implementation of the small R2 interface used by the portfolio.
export const env = {
  ...process.env,
  BUCKET: bucket,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_USER: process.env.ADMIN_USER,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};
