import { drizzle } from 'drizzle-orm/neon-http';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import * as schema from './schema';
import { env } from '../env';

type CastNeonQueryFunction = NeonQueryFunction<boolean, boolean>;
const sql = neon(env.DATABASE_URL) as CastNeonQueryFunction;

export const db = drizzle(sql, { schema });