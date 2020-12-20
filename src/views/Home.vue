<template>
  <!--  <div class="home">-->
  <!--    <img alt="Vue logo" src="../assets/logo.png">-->
  <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  </div>-->
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
  </v-container>
</template>

<script>
// @ is an alias to /src
import firebase from "@/utils/firebase";

export default {
  name: 'Home',
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
