<script setup>
import axios from "axios";
import { API_URL } from "@/main.js";
import Cookies from "js-cookie";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

async function sendLoginRequest(event) {
  event.preventDefault();
  console.log("Form submitted");
  toast("Wow so easy !", {
    autoClose: 1000,
  });  // try {
  //   const res = await axios.post(API_URL + "/login", {
  //     email: event.target.email.value,
  //     password: event.target.password.value
  //   });
  //   Cookies.set("jwt", res.data.token, { expires: 7, secure: true });
  //   window.$toast.success("Connexion réussie !", {
  //     icon: "✅",
  //     className: "custom-toast"
  //   });
  //   // Redirection ou autre logique ici
  // } catch (err) {
  //   window.$toast.error("Échec de la connexion. Vérifiez vos identifiants.", {
  //     icon: "❌",
  //     className: "custom-toast"
  //   });
  // }
}
</script>

<template>
  <div class="bg-card text-text min-h-screen flex items-center justify-center font-sans">
    <form @submit="sendLoginRequest" class="bg-secondary-dark p-8 rounded-lg flex flex-col gap-6 w-full max-w-sm divShadow border-form login-form">
      <label for="email" class="text-muted mb-1">Email</label>
      <input type="email" id="email" name="email" class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input" placeholder="Votre email" />
      <label for="password" class="text-muted mb-1">Mot de passe</label>
      <input type="password" id="password" name="password" class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input" placeholder="Votre mot de passe" />
      <button type="submit"  class="form-button bg-primary py-2 rounded hover:bg-accent transition-colors form-submit-button">Se connecter</button>
    </form>
  </div>
</template>

<style scoped>
.custom-toast {
  background: #232946;
  color: #eebbc3;
  border-radius: 8px;
  font-family: 'sans-serif';
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
