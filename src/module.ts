import { addImportsDir, createResolver, defineNuxtModule } from "@nuxt/kit"
import { name, version } from "../package.json"

export default defineNuxtModule({
  meta: {
    name,
    version,
    compatibility: {
      nuxt: ">=3.10.0"
    }
  },

  // hooks: {
  //   "prepare:types": ({ references }) => {
  //     references.push({
  //       types: "@hmeqo/nuxt-web-kit/runtime"
  //     })
  //   }
  // },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    addImportsDir(resolve("./runtime/composables"))
    addImportsDir(resolve("./runtime/utils"))
  }
})
