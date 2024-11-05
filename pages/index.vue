<script lang="ts" setup>
import { errorMessages } from 'vue/compiler-sfc'

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref()
// const successMsg = ref()

async function signUp() {
  errorMessage.value = ''
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error)
      throw error

    const { data: user } = await supabase.auth.getUser()
    const admin = computed(() => user.user.user_metadata.admin)

    if (admin.value)
      router.push('/checkin/staff')
    else
      router.push('/checkin/day1')
  }
  catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error)
      message = error.message
      errorMessage.value = message
  }
}
</script>

<template>
  <div class="relative mx-auto flex h-screen w-full max-w-screen-md flex-col items-center justify-center">
    <img class="absolute top-0 z-10" src="/logos/logo_purple.png" alt="">
    <img class="absolute bottom-0 z-10 " src="/logos/logo_green.png" alt="">

    <img class="relative z-20" src="/logos/logo_white.png">
    <p class="font-bold text-xl relative z-10 mb-10">Credienciamento</p>

    <form class="relative z-20 flex w-full max-w-80 flex-col items-center gap-6" @submit.prevent="signUp">
      <Input
        class="rounded-full"
        v-model="email"
        placeholder="Usuário"
        required
      />
      <Input
        class="rounded-full"
        v-model="password"
        type="password"
        placeholder="Senha"
        required
      />
      <Button class="w-full rounded-full" variant="secondary" type="submit">
        Entrar
      </Button>
      <div v-if="errorMessage" class="bg-slate-700 py-1 px-2 rounded-full">
        <p class="text-red-400 font-bold">
        {{ errorMessage }}
      </p>
      </div>
    </form>
  </div>
</template>
