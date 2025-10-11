<script setup>
import { ref } from "vue";
import Navbar from "@/views/_base/Navbar.vue";

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
</template>
