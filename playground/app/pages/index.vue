<script setup lang="ts">
import { useQueryInt } from "#imports"

const a = useQueryInt("a", { default: () => 0 })
</script>

<template>
  <div>
    <p>Hello World</p>
    <div>{{ a }}</div>
    <button @click="a += 1">Increment</button>
  </div>
</template>
