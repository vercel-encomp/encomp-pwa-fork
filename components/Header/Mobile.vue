<script lan="ts" setup>
import { Calendar, Check, MenuIcon, QrCode } from 'lucide-vue-next'

// const client = useSupabaseClient()
// const router = useRouter()

// async function logout() {
//   try {
//     const { error } = await client.auth.signOut()
//     if (error)
//       throw error
//     router.push('/app/login')
//   }
//   catch (error) {
//     console.log(error.message)
//   }
// }
</script>

<template>
  <div class="lg:hidden">
    <Sheet>
      <SheetTrigger class="my-2">
        <MenuIcon :size="40" />
        PROGRAMAÇÃO
      </SheetTrigger>
      <SheetContent side="left" class="max-w-[250px] bg-primary" />
    </Sheet>
  </div>
</template>
