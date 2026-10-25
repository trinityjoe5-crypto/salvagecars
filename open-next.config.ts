import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Live feed pages use request-time rendering; no R2/paid cache services needed.
export default defineCloudflareConfig({});
