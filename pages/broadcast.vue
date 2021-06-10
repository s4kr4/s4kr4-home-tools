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
              v-for="video in videos"
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
  data: function() {
    return {
      videos: [],
    }
  },
  mounted: function() {
    setInterval(this.getBroadcastData(), 3000)
  },
  methods: {
    notifyBroadcast: function() {
      fetch('http://192.168.1.100:8000/api/broadcast/notify')
        .then(res => res.json())
        .then(data => console.log(data))
    },
    getBroadcastData: function() {
      try {
        fetch('http://192.168.1.100:8000/api/broadcast/data')
          .then(res => res.json())
          .then(data => {
            this.videos = data.entries
          })
        console.log("getBroadcastData")
        console.log(this.videos)
      } catch(e) {
        console.warn(e)
      }
    },
  },
}
</script>

