<template>
  <v-row>
    <v-col class="text-center">
      <NotifyButton />
      <v-data-table
        :headers="headers"
        :items="entries"
        :loading="isLoading"
      >
        <template v-slot:item.title="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:item.link="{ item }">
          <a :href="item.link" target="_blank">
            {{ `https://youtu.be/${item.videoId}` }}
          </a>
        </template>
      </v-data-table>
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
      retrieveTimer: null,
      isLoading: false,
    }
  },
  methods: {
    async retrieveData() {
      this.isLoading = true

      try {
        const response = await fetch(`${this.$config.API_BASE_URL}/api/broadcast/data`)

        if (response.ok) {
          const json = await response.json()

          this.entries = json.entries.map((entry) => {
            return {
              id: entry.id,
              videoId: entry.yt_videoid,
              title: entry.title,
              link: entry.link,
            }
          })
        }
      } catch(e) {
        console.warn(e)
      }

      this.isLoading = false
    },
  },
  mounted: function() {
    this.retrieveData()
    this.retrieveTimer = setInterval(this.retrieveData, 180000)
  },
  beforeDestroy: function() {
    clearInterval(this.retrieveTimer)
  },
}
</script>

