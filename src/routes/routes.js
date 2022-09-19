

import Home from "../components/Home.vue"
import login from '../components/login.vue'
import Registrarse from "../components/Registrarse.vue"
import detalle from "../components/Detalle.vue"
import Perfil from "../components/Perfil.vue"
import insertarPelicula from "../components/insertarPelicula.vue"
import AgregarActor from "../components/AgregarActor.vue"


export const routes =[
  
    
    {path:"/",component:login},
    {path:"/Home",component:Home},
    {path:"/login",component:login},
    {path:"/Registrarse",component:Registrarse},
    {path:"/detalle",component:detalle},
    {path:"/Perfil",component:Perfil},
    {path:"/insertarPelicula",component:insertarPelicula},
    {path:"/AgregarActor",component:AgregarActor}
    


]

