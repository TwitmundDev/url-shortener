<script setup>
import axios from "axios";
import { API_URL } from "@/main.js";
import Cookies from "js-cookie";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from "@/router/index.js";


function verifyPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}


async function sendLoginRequest(event) {
  event.preventDefault();
  // console.log("Form submitted");
  if (verifyPassword(event.target.password.value) === false) {
    showPasswordCriteria.value = true;
    toast.error("Le mot de passe ne respecte pas les critères.", {
      autoClose: 2000,
    });
    return;
  } else {
    await router.push({name: 'dashboard'})
  }
  try {
    const res = await axios.post(API_URL + "/login", {
      email: event.target.email.value,
      password: event.target.password.value
    });

    Cookies.set("jwt", res.data.token, { expires: 1, secure: true });
    toast.success("Connexion réussie !", {
      autoClose: 1000,
    });
    await router.push({name: 'home'})


    // Redirection ou autre logique ici
  } catch (err) {
    toast.error("Échec de la connexion. Vérifiez vos identifiants.", {
      autoClose: 1000,
    });
  }
}
</script>

<template>
  <div class="bg-card text-text min-h-screen flex items-center justify-center font-sans">
    <form @submit="sendLoginRequest" class="bg-secondary-dark p-8 rounded-lg flex flex-col gap-6 w-full max-w-sm divShadow border-form login-form">
      <label for="email" class="text-muted labelForm mb-1">Email</label>
      <input type="email" id="email" name="email" class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input" placeholder="Votre email" />
      <label for="password" class="text-muted labelForm mb-1">Mot de passe</label>
      <input type="password" id="password" name="password" class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input" placeholder="Votre mot de passe" />
      <button type="submit"  class="form-button bg-primary py-2 rounded hover:bg-accent transition-colors form-submit-button">Se connecter</button>
      <router-link to="/register" class="text-text-tertiary text-sm text-center hover:underline mt-4">Pas encore de compte ? Inscrivez-vous</router-link>

    </form>
  </div>
</template>

<style scoped>
.labelForm{
  margin-bottom: -15px;
}


.custom-toast {
  background: #232946;
  color: #eebbc3;
  border-radius: 8px;
  font-family: 'sans-serif';
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
