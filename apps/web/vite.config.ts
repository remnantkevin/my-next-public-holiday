import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return {
      plugins: [vue()],
    };
  } else {
    return {
      plugins: [vue()],
      server: {
        https: {
          key: fs.readFileSync("localhost-key.pem"),
          cert: fs.readFileSync("localhost.pem"),
        },
      },
    };
  }
});
