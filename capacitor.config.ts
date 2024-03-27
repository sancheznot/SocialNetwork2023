import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.photera.app",
  appName: "Photera",
  webDir: "public",
  server: {
    url: "https://gallery2023-beta.vercel.app/",
    cleartext: false,
  },
};

export default config;
