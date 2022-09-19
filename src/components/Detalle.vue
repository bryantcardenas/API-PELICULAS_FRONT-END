<template v-slot:img="{ props }">
  <v-container-fluid>
    <div>
      <v-img
        
        width="1600"
        height="550"
        v-bind="props"
        gradient="to top right, rgba(150,115,180,.7), rgba(25,32,72,.7)  "
        dark
        
        :src="pelicula.imagen"
      >
        <v-row>
          <v-col cols="4">
            <v-img width="6000" height="550" :src="pelicula.imagen"> </v-img>
          </v-col>
          <v-col cols="7">
            <v-card flat color="transparent">
              <h1>{{ pelicula.titulo }}</h1></v-card
            >
            <br />
            <v-card flat color="transparent">
              <h3>{{ pelicula.subtitulo }}</h3>
            </v-card>
            <br />
            <v-spacer></v-spacer>

            <v-card flat color="transparent">
              <h4>{{ pelicula.descripcion }}</h4> </v-card
            ><br />

            <v-rating
              color="yellow"
              v-model="rating"
              icon-label="custom icon label text {0} of {1}"
            ></v-rating
            ><br />

            <v-row>
              <v-col cols="4">
                <v-card flat color="transparent">
                  <h4>{{ fechaEntrada(pelicula.fechaCreacion) }}</h4></v-card
                >
              </v-col>
              <v-col cols="4">
                <h3>33333</h3>
              </v-col>
              <v-col cols="4">
                <v-card flat color="transparent"
                  ><h4>{{ pelicula.genero }}</h4></v-card
                >
              </v-col>
              <v-col cols="4">
                <h3>222222</h3>
              </v-col>
              <v-col cols="4">
                <v-card flat color="transparent">
                  <h3>{{ pelicula.duracion }}</h3></v-card
                >
              </v-col>
              <v-col cols="4">
                <h3>44444</h3>
              </v-col>
              <v-col cols="4">
                <h3>222222</h3>
              </v-col>
              <v-col cols="4">
                <h3>33333</h3>
              </v-col>
              <v-col cols="4">
                <h3>44444</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <v-col cols="8">
      <v-row>
        <v-app>
          <h1>Reparto principal</h1>
          <v-carousel class="center">
            <v-carousel-item v-for="(actor, i) in eResultadoG" :key="i">
              <v-img :src="eResultadoG[i]" height="500" width="1000"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-app>
      </v-row>
    </v-col>
  </v-container-fluid>
</template>
<script>
import axios from "axios";

export default {
  name: "PageDetalle",
  data() {
    return {
      actoresi: "",
      pelicula: this.$store.state.peliculas,
      idactores: this.$store.state.peliculas.actores[0].idActor,
      idactores2: this.$store.state.peliculas.actores,
      eResultadoG: [],
    };
  },
  created() {
    this.veractores2();
  },
  methods: {
    veractores2() {
      let header = { headers: { "x-token": this.$store.state.token } };
      const eResultado = [];
      for (let i = 0; i < this.idactores2.length; i++) {
        axios
          .get(
            `http://localhost:5000/api/actores/listarid/${this.idactores2[i].idActor}`,
            header
          )
          .then((response) => {
            console.log(response.data.actor.foto);
            this.ac = response.data.actor.foto;
            eResultado.push(this.ac);

            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setDatos", response.data.persona);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      console.log(eResultado);
      this.eResultadoG = eResultado;
    },

    fechaEntrada(r) {
      let d = new Date(r);
      return d.toLocaleDateString() + " - " + d.toLocaleTimeString();
    },
  },
};
</script>

<style>
</style>