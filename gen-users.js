/* eslint-disable */

// FETCHING TICKETS FROM SYMPLA AND CREATING USER OBJECTS

// Fetching tickets from the Sympla API
const apiUrl = 'https://api.sympla.com.br/public/v3/events/2696886/participants?fields=first_name,last_name,email,ticket_name,ticket_num_qr_code,custom_form'
const token = '10ef3fa4339c27bb14027a050a778fdde9e34510e949cd28aefacb3030d285ac'

const requestOptions = {
  method: 'GET',
  headers: {
    s_token: token,
  },
}

// const response = await fetch(apiUrl, requestOptions).then(response => response.json())
// const tickets = response.data

const participants = []
const DAY1_ACTIVITIES = ['1', 'Soft Skills', 'ASP.NET', 'UI/UX', 'Beatriz']
const DAY2_ACTIVITIES = ['2', 'Análise', 'CRUD', 'Arduino']
const DAY3_ACTIVITIES = ['3', 'Front', 'Android']

// Function that adds the bough ticket into the right day array on the user object
const addActivity = (participant, ticket) => {
  if (ticket.ticket_name.includes('Combo')) {
    participant.tickets.day1.push({
      ticket_name: ticket.ticket_name,
      ticket_qrcode: ticket.ticket_num_qr_code
    })
    participant.tickets.day2.push({
      ticket_name: ticket.ticket_name,
      ticket_qrcode: ticket.ticket_num_qr_code
    })
    participant.tickets.day3.push({
      ticket_name: ticket.ticket_name,
      ticket_qrcode: ticket.ticket_num_qr_code
    })
  }
  else if (DAY1_ACTIVITIES.some(v => ticket.ticket_name.includes(v))) {
    participant.tickets.day1.push({
      ticket_name: ticket.ticket_name,
      ticket_qrcode: ticket.ticket_num_qr_code
    })
  }
  else if (DAY2_ACTIVITIES.some(v => ticket.ticket_name.includes(v))) {
    participant.tickets.day2.push({
      ticket_name: ticket.ticket_name,
      ticket_qrcode: ticket.ticket_num_qr_code
    })
  }
  else if (DAY3_ACTIVITIES.some(v => ticket.ticket_name.includes(v))) {
    participant.tickets.day3.push({
      ticket_name: ticket.ticket_name,
      ticket_qrcode: ticket.ticket_num_qr_code
    })
  }
}

const tickets = [
  {
    first_name: 'Felipe',
    last_name: 'Tolentino Pereira',
    email: 'felipe-pereira1@live.com',
    custom_form: [
      {value: '147.954.817-09'}
    ],
    ticket_name: 'Combo - Todos os dias (Palestras)',
    ticket_num_qr_code: 'TTUVUD4WJN'
  },
  {
    first_name: 'Felipe',
    last_name: 'Tolentino Pereira',
    email: 'felipe-pereira1@live.com',
    custom_form: [
      {value: '147.954.817-09'}
    ],
    ticket_name: 'Minicurso - Análise de Dados',
    ticket_num_qr_code: 'TU3SADTHBL'
  },
  {
    first_name: 'Felipe',
    last_name: 'Tolentino Pereira',
    email: 'felipe-pereira1@live.com',
    custom_form: [
      {value: '147.954.817-09'}
    ],
    ticket_name: 'Minicurso - Do Zero ao CRUD! (Backend)',
    ticket_num_qr_code: 'TU3SADTLXC'
  },
  {
    first_name: 'Felipe',
    last_name: 'Tolentino Pereira',
    email: 'felipe-pereira1@live.com',
    custom_form: [
      {value: '147.954.817-09'}
    ],
    ticket_name: 'Minicurso - Introdução à Android Nativo',
    ticket_num_qr_code: 'TU3SADTV2Z'
  },
]

// Loop through all tickets fetched from the Sympla API and
// create the user objects. Add tickets bough from the same person
// in the same user object.
tickets.forEach(ticket => {
  var participant = participants.find(
    participant => participant.cpf === ticket.custom_form[0].value
  );

  if (participant) {
    addActivity(participant, ticket)
  }
  else {
    participant = {
      first_name: ticket.first_name,
      last_name: ticket.last_name,
      email: ticket.email,
      cpf: ticket.custom_form[0].value,
      tickets: {
        day1: [],
        day2: [],
        day3: []
      }
    }

    addActivity(participant, ticket);

    participants.push(participant);
  }
});


// USE THE NEWLY CREATED USER OBJECTS TO CREATE SUPABASE USERS PwOppHfgy9ls k55TgNSbIsTR

import { createClient } from '@supabase/supabase-js'

const url = 'https://kejnzgchwgonxhcmltfl.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlam56Z2Nod2dvbnhoY21sdGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MDk0NzAsImV4cCI6MjA0NjI4NTQ3MH0.WtyE1sPnawhcLXw4U0s5QOTcIZ1-N-l3zNBZ7JMOGSU'

const client = createClient(url, key)

function genPassword() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let password = ''

  for (let i = 0; i < 12; i++) {
    const num = Math.floor(Math.random() * chars.length)
    password += chars.substring(num, num + 1)
  }
  console.log(password)
  return password
}

for (let i = 0; i < 2; i++) {
  try {
    const { error } = await client.auth.signUp({
      email: participants[i].email,
      password: genPassword(),
      options: {
        data: {
          first_name: participants[i].first_name,
          last_name: participants[i].last_name,
          cpf: participants[i].cpf,
          tickets: participants[i].tickets,
          admin: false
        }
      }
    })
    if (error) throw error;
    console.log("success")
  }
  catch(error) {
    console.log(error)
  }
}

// try {
//   const { error } = await client.auth.signUp({
//     email: 'admin@admin.com',
//     password: 'admin123',
//     options: {
//       data: {
//         first_name: 'admin',
//         last_name: 'admin',
//         cpf: '000.000.000-00',
//         tickets: {},
//         admin: true
//       }
//     }
//   })
//   if (error) throw error;
//   console.log("success")
// }
// catch(error) {
//   console.log(error)
// }

// try {
//   const { error } = await client.auth.signInWithPassword({
//     email: 'felipe-pereira1@live.com',
//     password: 'undefinedu5Anw^ha',
//   })
//   if (error)
//     throw error
// }
// catch (error) {
//   console.log(error)
// }

// const { data: { user } } = await client.auth.getUser()
// console.log(user.user_metadata.tickets[0].ticket_qrcode)

// for (const participant of participants) {
//   for (const day in participant.tickets) {
//     const tickets = participant.tickets[day]
//     for (const ticket of tickets) {
//       let table;
//       let diff;

//       if (ticket.ticket_name.includes('Combo')) {
//         table = 'checkin-talks'
//         diff = day.slice(-1);
//       }
//       else if (ticket.ticket_name.includes('DIA 1')) {
//         table = 'checkin-talks'
//         diff = '1'
//       }
//       else if (ticket.ticket_name.includes('DIA 2')) {
//         table = 'checkin-talks'
//         diff = '2'
//       }
//       else if (ticket.ticket_name.includes('DIA 3')) {
//         table = 'checkin-talks'
//         diff = '3'
//       }
//       else if (ticket.ticket_name.includes('UI')) {
//         table = 'checkin-courses'
//         diff = 'UI'
//       }
//       else if (ticket.ticket_name.includes('ASP')) {
//         table = 'checkin-courses'
//         diff = 'ASP'
//       }
//       else if (ticket.ticket_name.includes('Skills')) {
//         table = 'checkin-courses'
//         diff = 'Beatriz'
//       }
//       else if (ticket.ticket_name.includes('Dados')) {
//         table = 'checkin-courses'
//         diff = 'Dados'
//       }
//       else if (ticket.ticket_name.includes('CRUD')) {
//         table = 'checkin-courses'
//         diff = 'CRUD'
//       }
//       else if (ticket.ticket_name.includes('Arduino')) {
//         table = 'checkin-courses'
//         diff = 'Arduino'
//       }
//       else if (ticket.ticket_name.includes('HTML')) {
//         table = 'checkin-courses'
//         diff = 'HTML'
//       }
//       else if (ticket.ticket_name.includes('Android')) {
//         table = 'checkin-courses'
//         diff = 'Android'
//       }

//       try {
//         const { error } = await client.from(table)
//         .insert({
//           qrcode: ticket.ticket_qrcode,
//           participant_name: `${participant.first_name} ${participant.last_name}`,
//           differentiator: diff
//         })

//         if (error)
//           throw error
//       }
//       catch (error) {
//         console.log(error.message)
//       }
//     }
//   }
// }