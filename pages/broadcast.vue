<template>
  <v-row>
    <v-col class="text-center">
      <v-btn
        class="mb-4"
        color="red"
        elevation="2"
        @click="notifyBroadcast">
        Notify broadcast
      </v-btn>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>LINK</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="video in entries"
              :key="video.id"
            >
              <td>{{ video.title }}</td>
              <td><a :href="video.link" target="blank">{{ $generateShortURL(video.yt_videoid) }}</a></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-snackbar
        v-model="showSnackbar"
        :color="snackbarColor"
      >
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="showSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: function() {
    return {
      showSnackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
    }
  },
  mounted: function() {
    setInterval(this.$nuxt.refresh, 180000)
  },
  methods: {
    notifyBroadcast: async function() {
      try {
        const result = await fetch(`${this.$config.API_BASE_URL}/api/broadcast/notify`)

        if (result.ok) {
          const json = await result.json()

          this.snackbarMessage = json.message
          this.snackbarColor = 'green'
        } else {
          this.snackbarMessage = result.statusText
          this.snackbarColor = 'red'
        }

        this.showSnackbar = true
      } catch(e) {
        console.warn(e)
      }
    },
  },
  asyncData: async function({ $config }) {
    try {
      const response = await fetch(`${$config.API_BASE_URL}/api/broadcast/data`)

      if (response.ok) {
        return await response.json()
      }
    } catch(e) {
      console.warn(e)
    }
  }
}
</script>

