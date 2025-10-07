<script setup>
import { ref } from "vue";

const longUrl = ref("");
const shortUrl = ref("");

async function shorten() {
  const res = await fetch("http://localhost:3000/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: longUrl.value }),
  });
  const data = await res.json();
  shortUrl.value = data.shortUrl;
}
</script>

<template>
  <main>
    <h1>Raccourcisseur d’URL</h1>
    <input v-model="longUrl" placeholder="Colle ton URL ici" />
    <button @click="shorten">Raccourcir</button>

    <p v-if="shortUrl">👉 Lien court : <a :href="shortUrl">{{ shortUrl }}</a></p>
  </main>
</template>
