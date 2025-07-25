// src/lib/env/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_APP_URL: z
            .string()
            .default('http://localhost:3000')
            .refine((url) => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            }, "NEXT_PUBLIC_APP_URL must be a valid URL")
            .transform((url) => {
                if (process.env.NODE_ENV === 'development') {
                    return 'http://localhost:3000';
                }
                return url;
            }),
        NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required"),
    },
    server: {
        DATABASE_URL: z.url("DATABASE_URL must be a valid URL").optional(),
    },
    shared: {
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
        NODE_ENV: process.env.NODE_ENV,
    },
});