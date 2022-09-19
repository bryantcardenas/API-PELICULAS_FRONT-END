<template>
  <v-container class="mt-15">
    <v-form v-if="mostrando === 0">
      <div>
        <v-row class="mt-10">
          <v-col cols="12">
            <h1 class="text-center">Agregar Actor</h1>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="nombre" label="Nombres" filled></v-text-field>
            <v-text-field v-model="personajes" label="Personajes" filled></v-text-field>
          </v-col>

          <!-- <v-col cols="12" md="6">
          <v-file-input @change="subir" chips hide-input small-chips truncate-length="1">
          </v-file-input>
          <h4 color="blue-grey lighten-2">Agregar Foto</h4>
        </v-col>
         -->
         
          <v-row>
            <v-col cols="10"></v-col>
            <v-col cols="2">
              <v-btn class="mr-1" color="success" rounded="lg" size="large" @click="guardar()">
                Guardar Datos
              </v-btn>
            </v-col>
          </v-row>
          
        </v-row>
      </div>
    </v-form>

    <!-- <div v-if="mostrando === 1">
      <v-row class="mt-10">
        <v-col cols="12">
          <h1 class="text-center">Agregar Foto Actor</h1>
        </v-col>

        <v-col cols="12" md="6">
          <input type="file" @change="subir">
          <h4 color="blue-grey lighten-2">Agregar Foto</h4>

          <v-row>
            <v-col cols="2" class="mt-16">
              <v-btn class="mt-16" color="error" rounded="lg" size="large" @click="eliminar()">
                Cancelar
              </v-btn>
            </v-col>

            <v-col cols="8"></v-col>

            <v-col cols="2" class="mt-16">
              <v-btn class="mt-16" color="success" rounded="lg" size="large" @click="volver()" >
                Guardar Foto
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div> -->
    <v-alert :value="alert2" type="success" transition="scale-transition">
              {{ mensajep }}

            </v-alert>
            <v-alert :value="alert" type="red darken-4" transition="scale-transition">

              {{ mensajen }}
            </v-alert>
  </v-container>

</template>

<script>
import axios from 'axios'

export default {
  name: 'PageAgregaractor',
  data: () => ({
    nombre: "",
    personajes: "",
    idactor:"",
    mostrando: 0,
    mensajep: "Actor agregado con exito",
    mensajen: "Error en los datos",
    alert: false,
    alert2: false
  }),
  methods: {

    guardar() {
      let header = { headers: { "x-token": this.$store.state.token } }
      axios.post("http://localhost:5000/api/actores", {
        nombre: this.nombre,
        personajes: this.personajes,
      }, header)
        .then(response => {
          this.mostrando = 1
          this.idactor=response.data.actor._id
          console.log("registro exitoso");
          console.log(response);
          this.alert = true
          this.alert2 = false
        })
        .catch(error => {
          console.log(error)
          this.alert2 = true
          this.alert = false;
        })
    },

    // subir(e) {
    //   this.img = e.target.files[0]
    //   console.log(this.img);
    //   let fd = new FormData();
    //   fd.append("archivo", this.img);
    //   console.log(this.idactor);
    //   let header = { headers: { "token": this.$store.state.token } };
    //   console.log(fd);

    //   axios.put(`http://localhost:4500/api/actores/foto/${this.idactor}`,fd,header)
    //     .then(response => {
    //       console.log(response);
    //       this.$store.state.actores.foto = response.data.actor.foto
    //       this.mostrando= 0
    //       this.$swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: "Foto editada con exito",
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
    // },
    eliminar(){
      let header = { headers: { "token": this.$store.state.token } }
      axios.delete(`http://localhost:5000/api/actores/${this.idactor}`, header)
        .then(response => {
          this.mostrando = 0
          this.nombre=""
          this.observacion=""
          console.log("Eliminado exitosamente");
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    volver(){
      this.$router.push("/Agregaractor")
    }
  }
}
</script>