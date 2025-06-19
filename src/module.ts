import { addImportsDir, createResolver, defineNuxtModule } from "@nuxt/kit"
import { defu } from "defu"
import { name, version } from "../package.json"
import type { ModuleOptions } from "./runtime/types"

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    compatibility: {
      nuxt: ">=3.10.0"
    },
    configKey: "hmeqoNuxtWebKit"
  },

  defaults: {
    routeAuth: {
      defaultRedirect: false
    }
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      hmeqoNuxtWebKit: options
    })

    addImportsDir(resolve("./runtime/composables"))
    addImportsDir(resolve("./runtime/utils"))
  }
})
