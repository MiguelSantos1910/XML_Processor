<script setup>
defineProps({
  itens: {
    type: Array,
    default: () => [],
  },
});

function formatarCnpj(cnpj) {
  if (!cnpj) return "—";
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm table-fixed">

      <colgroup>
        <col class="w-2/5" />
        <col class="w-1/4" />
        <col class="w-1/3" />
      </colgroup>

      <thead>
        <tr class="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400">
          <th class="pl-7 pr-7 py-3 text-left text-xs font-medium text-amber-50 uppercase tracking-wide">
            Empresa
          </th>
          <th class="px-7 py-3 text-left text-xs font-medium text-amber-50 uppercase tracking-wide">
            CNPJ
          </th>
          <th class="px-7 py-3 text-left text-xs font-medium text-amber-50 uppercase tracking-wide">
            Motivo
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!itens.length">
          <td colspan="3" class="px-7 py-10 text-center text-sm text-slate-400">
            Nenhum XML pendente. Tudo identificado.
          </td>
        </tr>

        <tr
          v-for="nota in itens"
          :key="nota._id"
          class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
        >
          <td class="pl-7 pr-7 py-3.5 text-slate-700 font-medium truncate">
            {{ nota.emitente }}
          </td>

          <td class="px-7 py-3.5 text-slate-500 font-mono text-xs">
            {{ formatarCnpj(nota.cnpjEmitente) }}
          </td>

          <td class="px-7 py-3.5">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
              {{ nota.motivo || "Sem vínculo com cliente interno" }}
            </span>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>