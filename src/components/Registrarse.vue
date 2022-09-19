<template>
  <v-app>
     
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-19">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registrarse </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form>
                  <v-text-field v-model="nombre" label="Nombre" required></v-text-field>
                  <v-text-field v-model="email" label="E-mail" required></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password">

                  </v-text-field>
                  <v-btn class="mr-4" @click=Registrar()>
                    >
                    registrar
                  </v-btn>

                  <v-btn color="primary" @click=inicio()>
                    ir al inicio
                  </v-btn>

                </form>
              </v-card-text>

            </v-card>

            <v-alert :value="alert" type="success" transition="scale-transition">
              {{ mensajep }}

            </v-alert>
            <v-alert :value="alert2" type="red darken-4" transition="scale-transition">

              {{ mensajen }}
            </v-alert>

          </v-flex>
        </v-layout>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import axios from "axios"
export default {
  name: "PageRegistrar",
  dialog: false,


  data: () => ({

    email: "",
    password: "",
    nombre: "",
    mensajep: "",
    mensajen: "",
    alert: false,
    alert2: false

  }),
  methods: {
    Registrar() {
      axios.post("http://localhost:5000/api/personas/insertarUsuario", {
        email: this.email,
        password: this.password,
        nombre: this.nombre,
      })
        .then(response => {
          this.mensajep = response.data.msg
          this.alert = true
          this.alert2 = false
          //this.$router.push('/')

        })
        .catch(error => {
          this.mensajen = error.response.data.errors[0].msg
          this.alert2 = true
          this.alert = false
        })
    },
    inicio() {
      this.$router.push('/')
    }

  }
}
</script>