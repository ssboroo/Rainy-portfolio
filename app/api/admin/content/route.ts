import {env} from 'cloudflare:workers';
import {adminContent,type PortfolioEnv} from '../../../../server/handlers';
export const dynamic='force-dynamic';
export async function GET(request:Request){return adminContent(request,env as unknown as PortfolioEnv);}
export async function PUT(request:Request){return adminContent(request,env as unknown as PortfolioEnv);}
