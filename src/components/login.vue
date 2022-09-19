<template>
   <v-app id="inspire">
      <v-parallax height="800" src="https://i.blogs.es/4b7486/4k/1366_2000.jpg">
      <v-content class="img" >
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="cyan darken-4">
                        <v-toolbar-title>Login </v-toolbar-title>
                     </v-toolbar>
                     
                     <v-card-text>
                        <v-form>
                           <v-text-field
                           v-model="email"
                              label="Email"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                           v-model="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                           
                        </v-form>
                     </v-card-text>
                     
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="cyan accent-4" @click=login()>Login</v-btn>
                        <v-btn color="cyan accent-4" @click=Registrarse()>registro</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
            
         </v-container>
      </v-content>
      </v-parallax>
   </v-app>
</template>


<script>
import axios from "axios"
  export default {
    name: 'PageLogin',

    data: () => ({
      email:"",
      password:""
    }),
    methods:{
      ver(p){
      this.$store.commit("",{
        nombre: p.nombre,
        precio: p.precio,
        cantidad:1,
        imagen:p.imagen,
      })
    },
      login(){
         axios.post("http://localhost:5000/api/personas/login",{
            email:this.email,
            password:this.password,
            peliculas:[]
            
         })
         
         
         .then(response=>{
            console.log(response.data);
            this.$store.dispatch("setToken",response.data.token)
            this.$store.dispatch("setDatos",response.data.persona)
            //this.$router.push("/articulos")
            this.$router.push("/Home")
            
            this.peliculas=response.data.persona
            
         })
         .catch(error=>{
            console.log(error);
         })

      },
      Registrarse(){
        this.$router.push('/Registrarse') 
      }
    }
  }
</script>
