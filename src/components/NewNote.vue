<template>
  <v-container>
    <v-row >
      <v-col class="mx-auto" cols="6">
        <v-card class="mx-auto">
          <v-card-title>
            <h4>Add Note</h4>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="form.title"
                  label="Title"
                  color="#66a6ff"
                  outlined
                  dense
              ></v-text-field>
              <v-textarea
                  v-model="form.content"
                  label="Take a note"
                  color="#66a6ff"
                  outlined
                  dense
              ></v-textarea>
            </v-form>

            <v-row class="justify-end mr-2">
              <v-btn
                  class="mr-2"
                  color="secondary"
                  elevation="0"
                  text
                  @click="clear"
              >
                Clear
              </v-btn>
              <v-btn
                  color="secondary"
                  elevation="0"
                  outlined
                  @click="createNote"
              >
                Save
              </v-btn>
            </v-row></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/utils/firebase";

export default {
  name: "NewNote",
  data() {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    clear: function () {
      this.form = {title: '', content: ''};
    },
    createNote: function () {
      firebase.notesCollection.add({
        title: this.form.title,
        content: this.form.content,
        userId: firebase.auth.currentUser.uid,
        createdOn: new Date()
      })
          .then(() => {
            alert('Note Added');
            this.$emit('noteAdded');
          })
          .catch(err => {
            console.log(err);
            alert('Oops! Error Adding Note.');
          });
    }
  }
}
</script>

<style scoped>

</style>