<script setup>
import QrcodeVue from 'qrcode.vue'
import { toRaw } from 'vue'

// definePageMeta({
//   middleware: ['auth-pwa'],
// })

onMounted(() => {
  const usr = useSupabaseUser()
  console.log(usr)
})

const client = useSupabaseClient()

const { data: user } = await client.auth.getUser()
const dayTickets = computed(() => user.user.user_metadata.tickets.day1)

const router = useRouter()

async function logout() {
  try {
    const { error } = await client.auth.signOut()
    if (error)
      throw error
    router.push('/pwa/login')
  }
  catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="w-full lg:max-w-4xl">
      <Nav
        class="mb-10"
        current-day="6 de Novembro"
        opt1="7"
        opt1-link="/checkin/day2"
        opt2="8"
        opt2-link="/checkin/day3"
      />
      <div v-for="ticket in dayTickets" :key="ticket.ticket_qrcode">
        <div class="mb-10 flex flex-col items-center py-5">
          <p class="mb-5 lg:mb-10 max-w-[300px] lg:max-w-full text-wrap text-center text-xl font-bold lg:text-3xl">
            {{ ticket.ticket_name }}
          </p>
          <div class="lg:hidden">
            <QrcodeVue background="#111215" foreground="#14CFAA" :size="200" :value="ticket.ticket_qrcode" @click="logout"/>
          </div>
          <div class="hidden lg:block">
            <QrcodeVue background="#111215" foreground="#14CFAA" :size="300" :value="ticket.ticket_qrcode" @click="logout"/>
          </div>
        </div>
        <div class="mx-5">
          <Separator v-if="dayTickets.length > 1" class="shrink-0 bg-primary"/>
        </div>
      </div>
    </div>
  </div>
</template>
