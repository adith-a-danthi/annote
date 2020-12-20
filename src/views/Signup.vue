<template>
  <v-container class="bg-gradient fill-height" fluid>
    <v-card
        class="align-center mx-auto pa-10"
        elevation="2"
    >
      <v-card-title class="mb-5">
        <h1>Annote</h1>
      </v-card-title>
      <v-card-text>
        <h2 class="mb-5" style="color:#66a6ff;">Sign Up</h2>

        <v-text-field
            v-model="form.email"
            type="email"
            label="Email ID"
            prepend-inner-icon="mdi-email"
            color="#66a6ff"
            :rules="rules.email"
            required
            outlined
        ></v-text-field>

        <v-text-field
            v-model="form.password"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
            hint="At least 8 characters"
            :rules="[rules.required, rules.min]"
            color="#66a6ff"
            counter
            required
            outlined
        ></v-text-field>

        <v-text-field
            v-model="form.confirmPassword"
            :type="showConfirmPass ? 'text' : 'password'"
            label="Confirm Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showConfirmPass = !showConfirmPass"
            hint="At least 8 characters"
            :rules="[rules.required, rules.min, rules.match]"
            color="#66a6ff"
            counter
            required
            outlined
        ></v-text-field>

        <v-row>
          <v-btn
              class="mx-auto"
              color="#66a6ff"
              style="color: white"
              elevation="0"
              @click="signUp"
          >
            Sign Up
          </v-btn>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <span class="mx-auto">
          Already have an account?
          <v-btn
              class="mx-auto px-0 text-capitalize"
              color="#66a6ff"
              elevation="0"
              text
              to="login"
          >
          Login
          </v-btn></span>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import firebase from "@/utils/firebase";

export default {
  name: "Signup",

  data() {

    const defaultForm = Object.freeze({
      email: '',
      password: '',
      confirmPassword: ''
    });

    return {
      form: Object.assign({}, defaultForm),
      showPass: false,
      showConfirmPass: false,
      rules: {
        email: [v => v.length > 0 || 'This field is required'],
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        match: v => v === this.form.password || "Passwords don't match"
      }
    }

  },

  methods: {
    signUp: function () {
      firebase.auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((user) => {
            console.log(user)
            this.$router.push('home');
          })
          .catch(err => {
            console.log(err);
            alert('Oops. ' + err.message);
          });

    }
  }
}
</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom, #66a6ff 50%, #ace0f9 100%);
}
</style>