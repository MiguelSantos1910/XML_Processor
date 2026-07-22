<script setup>
defineProps({
    total: { type: Number, default: 0 },
    compras: { type: Number, default: 0 },
    vendas: { type: Number, default: 0 }
});

function formatar(valor) {
  return (valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <!-- Total -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 p-6">
      <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Total processado
      </p>
      <h2 class="text-3xl font-semibold text-slate-900 mt-2 tabular-nums">
        {{ formatar(total) }}
      </h2>
    </div>

    <!-- Compras -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 p-6">
      <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Compras
      </p>
      <h2 class="text-3xl font-semibold text-blue-700 mt-2 tabular-nums">
        {{ formatar(compras) }}
      </h2>
    </div>

    <!-- Vendas -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 p-6">
      <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Vendas
      </p>
      <h2 class="text-3xl font-semibold text-emerald-700 mt-2 tabular-nums">
        {{ formatar(vendas) }}
      </h2>
    </div>

  </div>
</template>