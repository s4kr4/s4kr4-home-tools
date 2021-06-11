<template>
  <v-row>
    <v-col class="text-center">
      <NotifyButton />
      <v-data-table
        :headers="headers"
        :items="entries"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import NotifyButton from '@/components/NotifyButton'
export default {
  components: {
    NotifyButton,
  },
  data: function() {
    return {
      headers: [
        { text: 'TITLE', value: 'title' },
        { text: 'LINK', value: 'link' },
      ],
      entries: [],
    }
  },
  methods: {
    async retrieveData() {
      try {
        const response = await fetch(`${this.$config.API_BASE_URL}/api/broadcast/data`)

        if (response.ok) {
          const json = await response.json()

          this.entries = json.entries.map((entry) => {
            return {
              id: entry.id,
              title: entry.title,
              link: entry.link,
            }
          })
        }
      } catch(e) {
        console.warn(e)
      }
    },
  },
  mounted: function() {
    setInterval(this.retrieveData(), 180000)
  },
}
</script>

