<template>
  <div>
    <v-btn
      class="mb-4"
      color="red"
      elevation="2"
      fixed
      :style="{ left: '50%', transform: 'translateX(-50%)' }"
      @click="notifyLives">
      Notify lives
    </v-btn>
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
  </div>
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
  methods: {
    notifyLives: async function() {
      try {
        const response = await fetch(`${this.$config.API_BASE_URL}/api/lives/notify`)

        if (response.ok) {
          const json = await response.json()

          this.snackbarMessage = json.message
          this.snackbarColor = 'green'
        } else {
          this.snackbarMessage = response.statusText
          this.snackbarColor = 'red'
        }

        this.showSnackbar = true
      } catch(e) {
        console.warn(e)
      }
    },
  },
}
</script>

