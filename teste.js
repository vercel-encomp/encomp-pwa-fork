const url = 'https://kejnzgchwgonxhcmltfl.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlam56Z2Nod2dvbnhoY21sdGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MDk0NzAsImV4cCI6MjA0NjI4NTQ3MH0.WtyE1sPnawhcLXw4U0s5QOTcIZ1-N-l3zNBZ7JMOGSU'
import { createClient } from '@supabase/supabase-js'
const client = createClient(url, key)

const { error } = await client.from('checkin-talks')
    .update({checked: false})
    .eq('qrcode', 'TTUVUD4WJN')
    .eq('differentiator', '1')
