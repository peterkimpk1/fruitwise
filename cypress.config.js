import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    watchForFileChanges: false,
    baseURL: 'http://0.0.0.0:5173'
  },
});
