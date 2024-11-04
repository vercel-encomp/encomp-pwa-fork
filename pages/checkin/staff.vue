<script setup>
import QrcodeVue from 'qrcode.vue'
import { toRaw } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

// definePageMeta({
//   middleware: ['auth-pwa'],
// })

function onDetect(codes) {
  console.log(codes[0].rawValue)
}

</script>

<template>
  <div>
    <QrcodeStream @detect="onDetect"/>
  </div>
</template>
