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
const dayTickets = computed(() => user.user.user_metadata.tickets.day2)

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
    <div class="w-full md:max-w-4xl">
      <Nav
        class="mb-10"
        current-day="7 de Novembro"
        opt1="6"
        opt1-link="/checkin/day1"
        opt2="8"
        opt2-link="/checkin/day3"
      />
      <div v-for="ticket in dayTickets" :key="ticket.ticket_qrcode" class="flex justify-center">
        <div class="mb-10 flex min-w-[320px] flex-col items-center rounded-xl border-2 border-white py-5">
          <p class="mb-5 max-w-[320px] text-wrap text-center text-xl font-bold md:text-3xl">
            {{ ticket.ticket_name }}
          </p>
          <QrcodeVue background="#111215" foreground="#14CFAA" :size="200" :value="ticket.ticket_qrcode" />
        </div>
      </div>
    </div>
  </div>
</template>
