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

    <new-note @noteAdded="getNotes" />

    <v-row>
      <v-col
        v-for="(note, index) in notes"
        v-bind:key="index"
        cols="6"
        md="3"
      >
        <v-card>
          <v-card-title>
            <h4 v-text="note.title"></h4>
          </v-card-title>
          <v-card-text>
            <p> {{ note.content }} </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
  mounted() {
    this.getNotes();
  },
  data: () => ({
    notes: []
  }),
  methods: {
    logout: function () {
      firebase.auth.signOut()
          .then(() => {
            this.$router.push('login');
          });
    },
    getNotes: function () {
      firebase.notesCollection.where("userId", "==", firebase.auth.currentUser.uid)
          .get()
          .then(querySnapshot => {
            console.log(querySnapshot);
            this.notes = [];
            querySnapshot.forEach(note => {
              console.log(note.data());
              this.notes.push(note.data());
            });
          })
          .catch(err => {
            console.log(err);
            alert('Oops! Error fetching notes');
          });

    }
  }
}
</script>
