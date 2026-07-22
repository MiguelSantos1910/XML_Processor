import { defineStore } from "pinia";
import { ref } from "vue";

import {
    uploadXML,
    buscarResumo,
    buscarNaoIdentificados
} from "@/services/xmlService";

export const useXmlStore = defineStore("xml", () => {
    const resumo = ref([]);
    const naoIdentificados = ref([]);
    const loading = ref(false);
    async function upload(formData){
        try{
            loading.value = true;
            await uploadXML(formData);
            await carregarResumo();
            await carregarNaoIdentificados();
        }finally{
            loading.value = false;
        }
    }

    async function carregarResumo(){
        const response = await buscarResumo();
        resumo.value = response.data;
    }

    async function carregarNaoIdentificados(){
        const response = await buscarNaoIdentificados();
        naoIdentificados.value = response.data;
    }

    return{
        resumo,
        naoIdentificados,
        loading,
        upload,
        carregarResumo,
        carregarNaoIdentificados
    };
});