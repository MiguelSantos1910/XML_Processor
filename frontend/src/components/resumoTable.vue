<script setup>
import { computed } from "vue";

const props = defineProps({
  resumo: {
    type: Array,
    default: () => [],
  },
});

function formatar(valor) {
  return (valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function iniciais(nome) {
  if (!nome) return "??";
  return nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

const totalCompraValor = computed(() =>
  props.resumo.reduce((total, item) => total + (item.compraValor || 0), 0)
);
const totalCompraQtd = computed(() =>
  props.resumo.reduce((total, item) => total + (item.compraQtd || 0), 0)
);
const totalVendaValor = computed(() =>
  props.resumo.reduce((total, item) => total + (item.vendaValor || 0), 0)
);
const totalVendaQtd = computed(() =>
  props.resumo.reduce((total, item) => total + (item.vendaQtd || 0), 0)
);
</script>

<template>
  <div v-if="!resumo.length" class="px-7 py-10 text-center text-sm text-slate-400">
    Nenhum cliente processado ainda.
  </div>

  <template v-else>
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full text-sm table-fixed">

        <colgroup>
          <col class="w-1/2" />
          <col class="w-1/4" />
          <col class="w-1/4" />
        </colgroup>

        <thead>
          <tr class="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500">
            <th class="px-7 py-3 text-left text-xs font-medium text-emerald-50 uppercase tracking-wide whitespace-nowrap">
              Cliente
            </th>
            <th class="px-7 py-3 text-right text-xs font-medium text-emerald-50 uppercase tracking-wide whitespace-nowrap">
              Compras
            </th>
            <th class="px-7 py-3 text-right text-xs font-medium text-emerald-50 uppercase tracking-wide whitespace-nowrap">
              Vendas
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(cliente, index) in resumo"
            :key="cliente.cliente || `sem-cliente-${index}`"
            class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
          >
            <td class="px-7 py-3.5">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <span class="text-xs font-semibold text-emerald-700">
                    {{ iniciais(cliente.cliente) }}
                  </span>
                </div>
                <span class="text-slate-700 font-medium truncate">
                  {{ cliente.cliente || "Cliente não identificado" }}
                </span>
              </div>
            </td>

            <td class="px-7 py-3.5 text-right">
              <span class="text-emerald-700 font-medium tabular-nums">
                {{ formatar(cliente.compraValor) }}
              </span>
              <span class="block text-xs text-slate-400 tabular-nums">
                {{ cliente.compraQtd }} {{ cliente.compraQtd === 1 ? 'XML' : 'XMLs' }}
              </span>
            </td>

            <td class="px-7 py-3.5 text-right">
              <span class="text-blue-700 font-medium tabular-nums">
                {{ formatar(cliente.vendaValor) }}
              </span>
              <span class="block text-xs text-slate-400 tabular-nums">
                {{ cliente.vendaQtd }} {{ cliente.vendaQtd === 1 ? 'XML' : 'XMLs' }}
              </span>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr class="border-t-2 border-slate-200 bg-slate-50">
            <td class="px-7 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total
            </td>
            <td class="px-7 py-3 text-right">
              <span class="text-emerald-800 font-semibold tabular-nums">
                {{ formatar(totalCompraValor) }}
              </span>
              <span class="block text-xs text-slate-400 font-normal tabular-nums">
                {{ totalCompraQtd }} {{ totalCompraQtd === 1 ? 'XML' : 'XMLs' }}
              </span>
            </td>
            <td class="px-7 py-3 text-right">
              <span class="text-blue-800 font-semibold tabular-nums">
                {{ formatar(totalVendaValor) }}
              </span>
              <span class="block text-xs text-slate-400 font-normal tabular-nums">
                {{ totalVendaQtd }} {{ totalVendaQtd === 1 ? 'XML' : 'XMLs' }}
              </span>
            </td>
          </tr>
        </tfoot>

      </table>
    </div>

    <div class="md:hidden divide-y divide-slate-100">
      <div
        v-for="(cliente, index) in resumo"
        :key="cliente.cliente || `sem-cliente-${index}`"
        class="px-5 py-4 flex items-center gap-3"
      >
        <div class="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
          <span class="text-xs font-semibold text-emerald-700">
            {{ iniciais(cliente.cliente) }}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-slate-700 font-medium truncate">
            {{ cliente.cliente || "Cliente não identificado" }}
          </p>
          <div class="flex items-center gap-4 mt-0.5 text-xs">
            <span class="text-emerald-700 font-medium tabular-nums">
              Compras: {{ formatar(cliente.compraValor) }} ({{ cliente.compraQtd }})
            </span>
            <span class="text-blue-700 font-medium tabular-nums">
              Vendas: {{ formatar(cliente.vendaValor) }} ({{ cliente.vendaQtd }})
            </span>
          </div>
        </div>
      </div>

      <div class="px-5 py-4 bg-slate-50 flex items-center justify-between">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Total
        </span>
        <div class="flex items-center gap-4 text-xs">
          <span class="text-emerald-800 font-semibold tabular-nums">
            {{ formatar(totalCompraValor) }} ({{ totalCompraQtd }})
          </span>
          <span class="text-blue-800 font-semibold tabular-nums">
            {{ formatar(totalVendaValor) }} ({{ totalVendaQtd }})
          </span>
        </div>
      </div>
    </div>
  </template>
</template>