<script setup></script>
<template>
  <div class="h:100vh d:flex flex:col">
    <header>
      <h1>{{ $t('base.project_name') }}</h1>
    </header>
    <main class="flex:1 overflow-y:auto">
      <TimelineBoard class="h:full" />
    </main>
    <footer>
      <nav>
        <!--  -->
      </nav>
    </footer>
  </div>
</template>
