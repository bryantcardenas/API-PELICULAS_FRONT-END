<template>

  <v-container>
   
   
  
    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    
   
    <v-row>
      
      <v-col cols="3" v-for="(p, i) in busqueda" :key="i">
       <v-hover
  v-slot="{hover}"
  open-delay="300"
  >
  
        <v-card :elevation="hover ? 16:2"  :loading="loading" class="mx-auto my-20 " max-width="400">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="20"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="400"  :src="p.imagen"></v-img>

          <v-card-title>{{ p.titulo }}</v-card-title>

          <v-card-title>{{ p.subtitulo }}</v-card-title>

          <v-card-text>{{ p.descripcion }}</v-card-text >
           
         

          <v-divider class="mx-4 black"></v-divider>

          
          <v-card-actions class="pa-4 ">
            <v-spacer></v-spacer>
            <span class="grey--text text--lighten-2 text-caption mr-2">
              {{rating}}
            </span>
            <v-rating
              v-model="rating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="20"
            ></v-rating>
          </v-card-actions> 

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="ver(p)">
              ver
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-hover>
      </v-col>
    </v-row>
    
  </v-container>
 
  
</template>



<script>

import axios from "axios";
export default {
  name: "PageHome",
  data() {
    return {
      token: this.$store.state.token,
      datos: this.$store.state.datos,
      peliculas: [],
      rating: 4.5,
    };
  },
  created() {
    this.peliculasGet();
  },
  computed:{
    busqueda(){
      console.log(this.$store.state.busqueda);
      return this.peliculas.filter(e =>{
        return e.titulo.includes(this.$store.state.busqueda.toLowerCase()) || e.subtitulo.includes(this.$store.state.busqueda.toLowerCase())
       
      }
          
      )
    }
  },
  methods: {
    peliculasGet() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get("http://localhost:5000/api/peliculas", header)
        .then((response) => {
          console.log(response);
          this.peliculas = response.data.peliculas;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ver(p) {
      this.$store.commit("setPeliculas", p);
      console.log(this.$store.state.peliculas);
      this.$router.replace("/detalle");
    },
  
  },
};
</script>
