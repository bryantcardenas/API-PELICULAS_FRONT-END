<template>
  <v-container-fluid>
    <v-img height="100%"
    src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg">
    <v-row >
      <v-col></v-col>

      <v-col>
        <v-card
          class="overflow-hidden mt-8 my-5 text-center"
          color="primary lighten-1"
          dark
        >
          <v-avatar class="mt-5 my-4" color="white" size="100">
            <v-img :src="$store.state.datos.foto"> </v-img>
          </v-avatar>
          <v-list-item class="justify-center white-text">
            <h3 justify="center">{{ $store.state.datos.nombre }}</h3>
          </v-list-item>
          <v-list-item class="justify-center white-text">
            <h3 justify="center">{{ $store.state.datos.email }}</h3>
          </v-list-item>
          <v-toolbar flat color="primary">
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light">
              Perfil del Usuario
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              color="white"
              label="Nombre"
              v-model="$store.state.datos.nombre"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              color="white"
              label="Email"
              type="email"
              v-model="$store.state.datos.email"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              color="white"
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="save()"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-img>
  </v-container-fluid>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "PagePerfil",
  data() {
    return {
      hasSaved: false,

      model: null,
      nombre: "",
      email: "",
      password: "",
      foto:""
    };
  },

  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      console.log(this.$store.state.token);
      console.log(this.$store.state.datos._id);
      
      let header = { headers: { "x-token": this.$store.state.token } };
      
      axios
        .put(
          `http://localhost:5000/api/personas/editar/${this.$store.state.datos._id}`,
          
          {
            nombre: this.$store.state.datos.nombre,
            email: this.$store.state.datos.email,
            password: this.password,
         
          },
          header
        )

        .then(response => {
         console.log(response);
          console.log(this.$store.state.datos._id);
          console.log(this.nombre);
          console.log(this.email);
          console.log(this.password);
      
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setDatos", response.data.persona);

          this.$store.state.datos = response.data.persona;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>