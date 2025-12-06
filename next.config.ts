import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local with override to ensure it takes precedence over shell env vars
config({ 
  path: resolve(process.cwd(), ".env.local"), 
  override: true 
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
