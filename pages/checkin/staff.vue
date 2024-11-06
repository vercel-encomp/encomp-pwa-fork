<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
import { Check, ChevronsUpDown, Flag, Soup } from 'lucide-vue-next'

const isComboOpen = ref(false)
const activities = [
  { value: '1', label: 'Quarta - 06/11 (Palestras)'},
  { value: '2', label: 'Quinta - 07/11 (Palestras)'},
  { value: '3', label: 'Sexta - 08/11 (Palestras)'},
  { value: 'UI', label: 'Minicurso - UI/UX'},
  { value: 'ASP', label: 'Minicurso - ASP.NET'},
  { value: 'Beatriz', label: 'Minicurso - Além do Código'},
  { value: 'Dados', label: 'Minicurso - Análise de Dados'},
  { value: 'CRUD', label: 'Minicurso - Back-End'},
  { value: 'Arduino', label: 'Minicurso - Arduino'},
  { value: 'HTML', label: 'Minicurso - Front-End'},
  { value: 'Android', label: 'Minicurso - Android'},
]
const selected = ref(activities[0])

const supabase = useSupabaseClient();
const participants = ref([])

function getParticipants() {
  supabase
  .from(['1','2','3'].includes(selected.value.value) ? 'checkin-talks' : 'checkin-courses')
  .select('qrcode, participant_name, checkin_start, checkin_break')
  .eq('differentiator', selected.value.value).then(({ data, error }) => {
    participants.value = data;
  })
}


const checkin = ref('start')
let updatedCheckin = { checkin_start: true }
function whichCheckin(which) {
  checkin.value = which;
  if (which == 'start')
    updatedCheckin = { checkin_start: true }
  else
    updatedCheckin = { checkin_break: true }
}

const detectionPaused = ref(false)
async function onDetect(codes) {
  console.log(codes[0].rawValue)
  console.log(selected.value.value)
  const { error } = await supabase
  .from(['1','2','3'].includes(selected.value.value) ? 'checkin-talks' : 'checkin-courses')
  .update(updatedCheckin)
  .eq('qrcode', codes[0].rawValue)
  .eq('differentiator', selected.value.value)

  if (error) console.log(error)

  detectionPaused.value = true;
  getParticipants()
  setTimeout(() => { detectionPaused.value = false; })
}
</script>

<template>
  <div class="flex flex-col items-center pt-2 mx-5">
    <p class="text-sm mb-2">
      Defina uma atividade para o credenciamento
    </p>
    <Popover v-model:open="isComboOpen" class="">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="isComboOpen"
          class="justify-between w-[220px] border-primary">
          {{ selected ? selected.label : 'Selecione uma atividade...' }}
          <ChevronsUpDown class="shrink-0 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0">
        <Command v-model="selected">
          <CommandInput placeholder="Procurar atividade..." />
          <CommandEmpty>Nenhuma atividade encontrada.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="activity in activities"
                :key="activity.value"
                :value="activity"
                @select="async (ev) => {
                  selected = ev.detail.value
                  getParticipants()
                  isComboOpen = false
                }"
              >
              <Check v-if="selected.value === activity.value" :size="20" class="mr-2"/>
              <Check v-else="selected.value === activity.value" :size="20" class="mr-2 opacity-0"/>
              {{ activity.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <div class="max-h-60 max-w-56 overflow-hidden mt-5 rounded-lg">
      <QrcodeStream @detect="onDetect" :paused="detectionPaused"/>
    </div>
    <div class="mt-2 w-full">
      <Separator class="bg-gray-400"/>
      <div class="flex flex-row items-center justify-between">
        <p class="font-bold text-lg text-primary mt-2">Lista de Participantes</p>
        <div class="flex flex-row gap-1 mr-1">
          <Flag :class="{'text-tertiary' : checkin == 'start'}" @click="whichCheckin('start')"/>
          <Soup :class="{'text-tertiary' : checkin == 'break'}" @click="whichCheckin('break')"/>
        </div>
      </div>
      <ScrollArea v-if="participants.length > 0" class="mt-2 lg:max-w-1/3">
        <div v-for="(participant, index) in participants" :key="participants.qrcode">
          <div class="inline-flex justify-between w-full py-1 pl-2 rounded-lg"
              :class="{'bg-gray-900' : index % 2 == 0 }">
            <p class="text-start font-bold text-sm lg:text-lg">{{ participant.participant_name }}</p>
            <div class="flex flex-row gap-1 mr-1">
              <Check :class="{'opacity-0' : !participant.checkin_start }" class="text-green-400"/>
              <Check :class="{'opacity-0' : !participant.checkin_break }" class="text-green-400"/>
            </div>
          </div>
        </div>
      </ScrollArea> 
      <div v-else class="w-full flex justify-center mt-10">Não há participantes</div>
    </div>
  </div>
</template>
