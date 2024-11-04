<script lang="ts" setup>
import { Calendar } from 'lucide-vue-next'

const props = defineProps(['name', 'link'])
</script>

<template>
  <NuxtLink :to="props.link">
    <div class="my-1 inline-flex items-center rounded p-1 hover:bg-primary-400 ">
      <slot /><p class="pl-4 font-bold text-white">
        {{ props.name }}
      </p>
    </div>
  </NuxtLink>
</template>
