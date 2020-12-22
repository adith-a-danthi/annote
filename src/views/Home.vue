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
          <v-card-title class="my-0 py-0">
            <v-row>
              <v-col>
                <h4 v-text="note.title"></h4>
              </v-col>
              <v-col class="text-right">
                <v-btn
                    icon
                    x-small
                    @click="deleteNote(index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
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
    notes: [],
    notesId: []
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
            this.notes = [];
            this.notesId = [];
            querySnapshot.forEach(note => {
              this.notes.push(note.data());
              this.notesId.push(note["id"]);
            });
          })
          .catch(err => {
            console.log(err);
            alert('Oops! Error fetching notes');
          });

    },
    deleteNote: function (index) {
      const removedNoteId = this.notesId[index];
      firebase.notesCollection.doc(removedNoteId).delete()
          .then(() => {
            this.getNotes();
            alert('Note Deleted');
          })
          .catch(err => {
            console.log(err);
            alert('Oops! Error deleting note');
          });
    }
  }
}
</script>
