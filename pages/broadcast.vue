<template>
  <v-row>
    <v-col class="text-center">
      <v-btn
        class="mb-4"
        color="red"
        elevation="2"
        v-on:click="notifyBroadcast">
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted: function() {
    setInterval(this.$nuxt.refresh, 180000)
  },
  methods: {
    notifyBroadcast: function() {
      fetch(`${this.$config.API_BASE_URL}/api/broadcast/notify`)
        .then(res => res.json())
        .then(data => console.log(data))
    },
  },
  asyncData: function({ $config }) {
    return fetch(`${$config.API_BASE_URL}/api/broadcast/data`)
      .then(res => res.json())
  }
}
</script>

