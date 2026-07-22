<template>
  <nav class="bg-emerald-700 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-md bg-white flex items-center justify-center">
            <span class="text-emerald-700 text-xs font-bold">NF</span>
          </div>

          <h1 class="text-white text-sm font-semibold">
            XML Processor
          </h1>
        </div>

        <!-- Menu -->
        <ul class="flex items-center gap-1 text-sm font-medium">
          <li>
            <RouterLink
              to="/"
              class="px-3 py-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-600 transition-colors"
              active-class="!text-white !bg-emerald-600"
            >
              Upload
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/resumo"
              class="px-3 py-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-600 transition-colors"
              active-class="!text-white !bg-emerald-600"
            >
              Resumo
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/nao-identificados"
              class="px-3 py-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-600 transition-colors"
              active-class="!text-white !bg-emerald-600"
            >
              Não identificados
            </RouterLink>
          </li>

          <li>
            <a
              href="http://localhost:3001/api-docs"
              target="_blank"
              class="px-3 py-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-600 transition-colors"
            >
              API Docs
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>