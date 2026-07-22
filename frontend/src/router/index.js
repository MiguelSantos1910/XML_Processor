import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Resumo from "../views/Resumo.vue";
import NaoIdentificados from "../views/NaoIdentificados.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/resumo",
        name: "Resumo",
        component: Resumo
    },
    {
        path: "/nao-identificados",
        name: "NaoIdentificados",
        component: NaoIdentificados
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;