import {env} from 'cloudflare:workers';
import {publicContent,type PortfolioEnv} from '../../../server/handlers';
export const dynamic='force-dynamic';
export async function GET(){return publicContent(env as unknown as PortfolioEnv);}
