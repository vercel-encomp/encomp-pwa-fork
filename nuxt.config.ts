// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    'nuxt-typed-router',
    '@nuxt/fonts',
    'nuxt-og-image',
    '@vite-pwa/nuxt',
    'nuxt-lucide-icons',
  ],

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '',
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 700, 800],
    },
    assets: {
      prefix: '/public/_fonts/',
    },
  },
  ogImage: {
    fonts: [
      {
        name: 'Chillax',
        weight: 500,
        path: '/fonts/WZY5PMNTII6NKOB2TTIAX7QVAWMSY2DQ-pyl6MWuNMf.ttf',
      },
      {
        name: 'Satoshi',
        weight: 400,
        path: '/fonts/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY-7iCxS4avLs.ttf',
      },
      {
        name: 'Satoshi',
        weight: 500,
        path: '/fonts/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP-hLQRzv849O.ttf',
      },
    ],
  },
  
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  supabase: {
   redirectOptions: {
    login: '/',
    callback: '/checkin/day1',
    include: undefined,
    exclude: [],
    cookieRedirect: false
   }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      start_url: '/',
      name: 'ENCOMP Credenciamento',
      short_name: 'ENCOMP',
      description: '',
      icons: [
        { src: '/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      ],
      theme_color: '#ffffff'
    },
    workbox: {
      navigateFallback: '/checkin/day1',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})