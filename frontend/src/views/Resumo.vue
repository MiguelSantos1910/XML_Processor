<script setup>
import { computed, onMounted } from "vue";

import ResumoTable from "@/components/resumoTable.vue";
import Navbar from "@/components/navbar.vue";

import { useXmlStore } from "@/stores/xmlStore";

const store = useXmlStore();

onMounted(async () => {
    await store.carregarResumo();
});

const resumo = computed(() => store.resumo);
</script>

<template>
<div class="min-h-screen bg-slate-50">
    <Navbar />
    <main class="max-w-7xl mx-auto px-6 py-12">

        <!-- Título -->
        <div class="mb-12">
            <div class="flex items-center gap-2 mb-2">
                <span class="w-6 h-px bg-emerald-600"></span>
                <p class="text-xs font-medium tracking-widest text-emerald-700 uppercase">
                    Fiscal · NF-e
                </p>
            </div>
            <h1 class="text-3xl font-semibold text-slate-900 tracking-tight">
                Resumo por cliente
            </h1>
            <p class="text-sm text-slate-500 mt-1.5">
                Consolidado de compras e vendas processadas por cliente.
            </p>
        </div>

        <!-- Tabela -->
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 overflow-hidden">
            <div class="text-center px-7 pt-7 pb-6">
                <span class="inline-block text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full mb-3">
                    {{ resumo.length }} {{ resumo.length === 1 ? 'cliente' : 'clientes' }}
                </span>
                <h2 class="text-base font-semibold text-slate-900">
                    Clientes processados
                </h2>
                <p class="text-xs text-slate-400 mt-0.5">
                    Ordenado conforme retorno do processamento
                </p>
            </div>
            <ResumoTable :resumo="resumo" />
        </div>
    </main>
</div>
</template>