/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/stories/**/*.stories.{ts,tsx}",
  port: 6313,
  outDir: "dist",
  base: "/",
  addons: {
    theme: {
      enabled: true,
      defaultState: "light",
    },
    mode: {
      enabled: false,
    },
  },
}
