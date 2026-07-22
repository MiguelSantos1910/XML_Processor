<script setup>
import { ref } from "vue";
import { useXmlStore } from "@/stores/xmlStore";

const store = useXmlStore();

const arquivos = ref([]);
const carregando = ref(false);
const arrastando = ref(false);
const inputFile = ref(null);

function selecionarArquivos(event) {
    adicionarArquivos(Array.from(event.target.files));
}

function onDrop(event) {
    arrastando.value = false;
    const arquivosXml = Array.from(event.dataTransfer.files).filter((a) =>
        a.name.toLowerCase().endsWith(".xml")
    );
    adicionarArquivos(arquivosXml);
}

function adicionarArquivos(novos) {
    const existentes = new Set(arquivos.value.map((a) => a.name));
    novos.forEach((arquivo) => {
        if (!existentes.has(arquivo.name)) arquivos.value.push(arquivo);
    });
}

function removerArquivo(nome) {
    arquivos.value = arquivos.value.filter((a) => a.name !== nome);
}

async function enviarArquivos() {
    if (!arquivos.value.length) return;
    const formData = new FormData();
    arquivos.value.forEach((arquivo) => {
        formData.append("xml", arquivo);
    });
    try {
        carregando.value = true;
        await store.upload(formData);
        arquivos.value = [];
    } catch (error) {
        console.error("Erro no upload:", error);
    } finally {
        carregando.value = false;
    }
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 p-7">

    <h2 class="text-base font-semibold text-slate-900">
      Upload de XML
    </h2>
    <p class="text-xs text-slate-400 mt-0.5 mb-6">
      Selecione um ou mais arquivos XML para processamento.
    </p>

    <div
      @dragover.prevent="arrastando = true"
      @dragleave.prevent="arrastando = false"
      @drop.prevent="onDrop"
      :class="[
        'rounded-xl p-10 text-center border-2 border-dashed transition-colors',
        arrastando
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      ]"
    >
      <input
        type="file"
        multiple
        accept=".xml"
        @change="selecionarArquivos"
        class="hidden"
        ref="inputFile"
      />

      <button
        @click="inputFile.click()"
        class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        Selecionar XML
      </button>

      <p class="mt-4 text-sm text-slate-500">
        ou arraste os arquivos para esta área
      </p>
    </div>

    <div v-if="arquivos.length" class="mt-6">
      <h3 class="text-xs font-medium text-slate-500 mb-2">
        {{ arquivos.length }} {{ arquivos.length === 1 ? 'arquivo selecionado' : 'arquivos selecionados' }}
      </h3>

      <ul class="space-y-1.5">
        <li
          v-for="arquivo in arquivos"
          :key="arquivo.name"
          class="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 flex items-center justify-between text-sm"
        >
          <span class="text-slate-700 truncate">{{ arquivo.name }}</span>

          <div class="flex items-center gap-3 shrink-0">
            <span class="text-xs text-slate-400">
              {{ (arquivo.size / 1024).toFixed(1) }} KB
            </span>
            <button
              @click="removerArquivo(arquivo.name)"
              class="text-slate-400 hover:text-red-600 transition-colors"
              aria-label="Remover arquivo"
            >
              ✕
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-7 flex justify-end">
      <button
        @click="enviarArquivos"
        :disabled="!arquivos.length || carregando"
        class="bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
      >
        {{ carregando ? "Enviando..." : "Enviar XML" }}
      </button>
    </div>

  </div>
</template>