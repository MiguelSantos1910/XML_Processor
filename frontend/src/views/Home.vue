<script setup>
import { computed, onMounted } from "vue";

import DashboardCards from "@/components/cardsDashboard.vue";
import UploadCard from "@/components/uploadCard.vue";
import Navbar from "@/components/navbar.vue";

import { useXmlStore } from "@/stores/xmlStore";

const store = useXmlStore();

onMounted(async () => {
    await store.carregarResumo();
});

const compras = computed(() =>
    store.resumo.reduce((total, item) => total + (item.compraValor || 0), 0)
);

const vendas = computed(() =>
    store.resumo.reduce((total, item) => total + (item.vendaValor || 0), 0)
);

const total = computed(() => compras.value + vendas.value);
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
                Processamento de NF-e
            </h1>
            <p class="text-sm text-slate-500 mt-1.5">
                Gerencie uploads, processamento e classificação das notas fiscais.
            </p>
        </div>

        <!-- Cards -->
        <DashboardCards
            :total="total"
            :compras="compras"
            :vendas="vendas"
        />

        <!-- Upload -->
        <div class="mt-10">
            <UploadCard />
        </div>
    </main>
</div>
</template>