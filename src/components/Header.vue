<template>
  <div>
    <v-app-bar felx color="red darken-3" dense dark>
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="$store.state.token !== ''"
      ></v-app-bar-nav-icon>

      <v-btn class="transparent disabled" v-if="$store.state.token !== ''" to="/home">
      <v-icon class="mr-2"> mdi-movie-open-play</v-icon>
      <v-toolbar-title>API PELICULAS</v-toolbar-title>
     </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.token == ''" text xsmall @click="login1()">
        <v-icon v-if="$store.state.token == ''" center>mdi-account</v-icon>
        Login
      </v-btn>
      <v-btn v-if="$store.state.token == ''" text xsmall @click="register()">
        <v-icon center> mdi-pencil </v-icon>
        Registrarse
      </v-btn>

      <v-spacer></v-spacer>

      <template v-if="$store.state.token !== ''">
        <v-flex xs12 sm6 md2 mt-7>
          <v-text-field label="Buscar..." v-model="$store.state.busqueda">
          </v-text-field>
        </v-flex>
        <v-btn flat @click="searchMovie()">
          <span class="mr-2">Buscar</span>
        </v-btn>

        <v-btn to="/favoritos" icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
      <v-btn
        @click="salir()"
        class="white blue--text"
        v-if="$store.state.token !== ''"
      >
        salir
        <v-icon>mdi-door-open</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="drawer" absolute color="primary">
      <v-list>
        <v-list-item>
          <h1></h1>
        </v-list-item>

        <v-list-item class="d-flex justify-center" to="/perfil">
          <v-badge color="green" overlap>
            <v-icon>far fa-bell</v-icon>
          </v-badge>
          <v-avatar color="white" size="62">
            <v-img :src="$store.state.datos.foto"> </v-img>
          </v-avatar>
        </v-list-item>
        <v-list-item class="d-flex justify-center white--text mt-4 mb-4">
          <h3 align="center" justify="center">
            {{ $store.state.datos.nombre }}
          </h3>
        </v-list-item>

        <!-- //Pagina  -->
        <v-list-item to="/perfil">
          <v-list-item-icon class="white--text">
            <v-icon color="white">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Perfil</v-list-item-title>
        </v-list-item>

        <v-list-item to="/home">
          <v-list-item-icon class="white--text">
            <v-icon color="white">mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="white--text">Home</v-list-item-title>
        </v-list-item>


        <v-list-item to="/InsertarPelicula">
          <v-list-item-icon class="white--text">
            <v-icon color="white">mdi-plus-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Agregar Pelicula</v-list-item-title>
        </v-list-item>
        <v-list-item to="/AgregarActor">
          <v-list-item-icon class="white--text">
            <v-icon color="white">mdi-plus-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Agregar Actor</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "PageHeader",
  data() {
    return {
      drawer: false,
      group: null,
      searchString: "",
      resultado: [],
    };
  },
  methods: {
    salir() {
      this.$router.replace("/");
      this.$store.commit("setToken", "");
    },
    login1() {
      this.$router.replace("/login");
    },
    register() {
      this.$router.replace("/Registrarse");
    },

    searchMovie() {
      let header = { headers: { "x-token": this.$store.state.token } };

      axios
        .get(
          `http://localhost:5000/api/peliculas/buscar/${this.searchString}`,
          header
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.resultado = response.data.peliculas;

          this.$store.commit("setPeliculas");
          console.log(this.$store.state.resultado);
          this.$router.replace("/Buscar");
          this.searchString = "";

          // this.ac=response.data.actor.foto
          // eResultado.push(this.ac)
          // console.log(this.actoresi)

          // console.log(this.idactores2)
          // console.log(this.actores)

          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setDatos", response.data.pelicula);
          //this.$router.push("/articulos")
          //this.$router.push("/Home")
          //this.peliculas=response.data.persona
        })
        .catch((error) => {
          console.log(error);
          console.log(this.searchString);
        });
      //this.actores.push(this.ac)
      //console.log(this.actores);
      //console.log(eResultado);
    },
  },
};
</script>
