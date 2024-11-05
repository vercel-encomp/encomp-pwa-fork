<script lang="ts" setup>
import { LogOut, RefreshCcw } from 'lucide-vue-next'

const supabase = useSupabaseClient()
async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  await navigateTo('/')
}

function refresh() {
  window.location.reload()
}

</script>

<template>
  <header class="flex justify-end my-2 mx-2 gap-5">
    <RefreshCcw @click="refresh"/>
    <LogOut @click="logout"/>
  </header>
  <slot />
</template>
