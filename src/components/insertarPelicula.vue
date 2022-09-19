<template>
    <v-container class="mb-16">
        <v-form v-if="mostrando === 0">
            <div>
                <v-row class="mt-2">
                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                        <h1 class="text-center aling">Agregar Pelicula</h1>
                        <br>
                        <v-text-field v-model="titulo" label="Titulo"></v-text-field>
                        <v-text-field v-model="subtitulo" label="Subtitulo*"></v-text-field>
                        <v-text-field v-model="genero" label="Genero*"></v-text-field>
                        <v-text-field v-model="descripcion" label="Descripcion*"></v-text-field>
                        <v-text-field v-model="duracion" label="Duracion*"></v-text-field>
                        <v-btn class="mr-1 mt-n7" color="success" rounded="lg" @click="guardar()">
                                Guardar Datos
                            </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-form>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PageInsertarPelicula',
    data: () => ({
        titulo: "",
        subtitulo: "",
        genero: "",
        descripcion: "",
        duracion: "",
        idActor: "",
        imagen: "",
        actores: [],
        // actor: [],
        idpelicula: "",
        mostrando: 0,
        dialog: false,
    }),

    methods: {
        guardar() {
            let header = { headers: { "x-token": this.$store.state.token } }
            axios.post("http://localhost:5000/api/peliculas", {
                titulo: this.titulo,
                subtitulo: this.subtitulo,
                genero: this.genero,
                descripcion: this.descripcion,
                duracion: this.duracion,
                actores: this.actores
            }, header)

                .then(response => {
                    this.idpelicula = response.data.pelicula.id
                    this.mostrando = 1
                    console.log("registro exitoso");
                   
                   // console.log(this.actores);
                })
                .catch(error => {
                    console.log(error);
                })
        },


        sacarid(p) {
            console.log(p);
            this.dialog = true
            this.idactor = p.id
            this.nombrea = p.nombre
        }

    },
    created() {
        this.listar()
    }
}
</script>