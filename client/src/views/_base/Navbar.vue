<script setup>

</script>

<template>
  <nav class="w-full flex items-center justify-between px-8 py-4 bg-surface border-b border-border">
    <!-- Logo -->
    <RouterLink to="/">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-bg font-bold">
        T
      </div>
      <span class="font-semibold text-text-primary text-lg">Short by Twitmund</span>
    </div>
    </RouterLink>

    <ul class="hidden md:flex gap-6 text-text-secondary justify-center flex-1 items-center">
      <li><RouterLink to="/" class="hover:text-accent transition-colors navBtn ">Accueil</RouterLink></li>
<!--      <li><RouterLink to="/features" class="hover:text-accent transition-colors navBtn">Fonctionnalités</RouterLink></li>-->
<!--      <li><RouterLink to="/about" class="hover:text-accent transition-colors navBtn">À propos</RouterLink></li>-->
<!--      <li><RouterLink to="/contact" class="hover:text-accent transition-colors navBtn">Contact</RouterLink></li>-->
    </ul>

    <!-- Bouton CTA -->
    <router-link to="/login" class="px-4 py-2 rounded-md font-medium text-bg bg-primary hover:bg-accent transition-all">
      Se connecter
    </router-link>
  </nav>
</template>

<style scoped>

</style>
