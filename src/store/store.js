import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        token:"",
        datos:{},
        peliculas:{},
        foto:"",
        resultado:{},
        busqueda:""
    },

    mutations:{
        setToken(state, value){
            state.token=value
        },
        setDatos(state, value){
            state.datos=value
        },
        setPeliculas(state,value){
            state.peliculas=value
        },
        setActores(state,value){
            state.actore=value
        }
    },

    actions:{
        setToken(context,value){
            context.commit("setToken", value)
        },
        setDatos(context,value){
            context.commit("setDatos", value)
        },
        setPeliculas(context,value){
            context.commit("setPeliculas",value)
        },
        setActores(context,value){
            context.commit("setActores",value)
        }
    }

})