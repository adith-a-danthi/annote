<template>
  <v-container>
    <v-app-bar color="#66a6ff" flat app dense>

      <v-toolbar-title style="color: white">Annote</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn
            icon
            color="white"
            @click="logout"
        >
          <v-icon color="white">mdi-location-exit</v-icon>
        </v-btn>
    </v-app-bar>

    <br>

    <new-note/>

  </v-container>
</template>

<script>
// @ is an alias to /src
import firebase from "@/utils/firebase";
import NewNote from "@/components/NewNote";

export default {
  name: 'Home',
  components: {
    'new-note': NewNote
  },
  data: () => ({

  }),
  methods: {
    logout: function () {
      firebase.auth.signOut()
          .then(() => {
            this.$router.push('login');
          });
    }
  }
}
</script>
