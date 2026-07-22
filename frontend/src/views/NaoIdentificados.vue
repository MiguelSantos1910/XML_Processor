<script setup>
import { computed, onMounted } from "vue";

import NaoIdentificadosTable from "@/components/naoIdentificadosTable.vue";
import Navbar from "@/components/navbar.vue";

import { useXmlStore } from "@/stores/xmlStore";

const store = useXmlStore();

onMounted(async () => {
    await store.carregarNaoIdentificados();
});

const naoIdentificados = computed(() => store.naoIdentificados);
</script>

<template>
<div class="min-h-screen bg-slate-50">
    <Navbar />
    <main class="max-w-7xl mx-auto px-6 py-12">

        <!-- Título -->
        <div class="mb-12">
            <div class="flex items-center gap-2 mb-2">
                <span class="w-6 h-px bg-amber-500"></span>
                <p class="text-xs font-medium tracking-widest text-amber-600 uppercase">
                    Fiscal · NF-e
                </p>
            </div>
            <h1 class="text-3xl font-semibold text-slate-900 tracking-tight">
                Não identificados
            </h1>
            <p class="text-sm text-slate-500 mt-1.5">
                XMLs processados sem vínculo com cliente interno. Requerem revisão manual.
            </p>
        </div>

       <!-- Tabela -->
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 overflow-hidden">
            <div class="text-center px-7 pt-7 pb-6">
                <span
                    v-if="naoIdentificados.length"
                    class="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full mb-3"
                >
                    {{ naoIdentificados.length }} pendente{{ naoIdentificados.length === 1 ? '' : 's' }}
                </span>
                <h2 class="text-base font-semibold text-slate-900">
                    Arquivos pendentes
                </h2>
                <p class="text-xs text-slate-400 mt-0.5">
                    Verifique manualmente e reprocesse ou associe o cliente
                </p>
            </div>
            <NaoIdentificadosTable :itens="naoIdentificados" />
        </div>
    </main>
</div>
</template>