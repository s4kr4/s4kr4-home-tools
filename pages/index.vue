<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn elevation="2" v-on:click="notifyBroadcast">Notify broadcast</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    notifyBroadcast: function() {
      fetch('http://192.168.1.100:8000/api/notify-broadcast')
        .then(res => res.json())
        .then(data => console.log(data))
    }
  },
}
</script>

