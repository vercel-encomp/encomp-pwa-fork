<script lang="ts" setup>
</script>

<template>
  <header class="flex items-center">
    <HeaderDesktop />
    <HeaderMobile />
  </header>
  <div class="h-screen w-full grid-cols-[300px_1fr] lg:grid">
    <div class="hidden bg-primary lg:flex" />
    <slot />
  </div>
</template>
