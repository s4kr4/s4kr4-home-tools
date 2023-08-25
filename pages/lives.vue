<template>
  <v-row>
    <v-col>
      <NotifyButton />
      <h2 class="mt-12">My lives</h2>
      <v-data-table
        :headers="headers"
        :items="entries"
        :loading="isLoading"
      >
        <template v-slot:item.link="{ item }">
          <a :href="item.link" target="_blank">
            {{ item.linkText }}
          </a>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import NotifyButton from '@/components/NotifyButton'
import dayjs from 'dayjs'

export default {
  components: {
    NotifyButton,
  },
  data: function() {
    return {
      headers: [
        { text: 'TITLE', value: 'title' },
        { text: 'LINK', value: 'link' },
        { text: 'PUB DATE', value: 'pubDate' },
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
        const response = await fetch(`${this.$config.API_BASE_URL}/api/lives/data`)

        if (response.ok) {
          const json = await response.json()

          this.entries = json.data.map((entry) => {
            return {
              id: entry.id,
              title: entry.title,
              link: entry.link,
              linkText: `youtu.be/${entry.videoId}`,
              pubDate: dayjs(entry.pubDate).format('YYYY/MM/DD HH:mm:ss'),
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

