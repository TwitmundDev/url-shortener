<script setup>
import axios from "axios";
import {API_URL} from "@/main.js";
import Cookies from "js-cookie";
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from "@/router/index.js";
import {ref} from "vue";

const showPasswordCriteria = ref(false);

function verifyPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

function verifyEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function verifyConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

async function sendLoginRequest(event) {
  event.preventDefault();
  // console.log("Form submitted");
  if (event.target.password.value.blankLine)
  if (verifyPassword(event.target.password.value) === false) {
    showPasswordCriteria.value = true;
    toast.error("Le mot de passe ne respecte pas les critères.", {
      autoClose: 2000,
    });
    return;
  } else {
    showPasswordCriteria.value = false;
  }
  if (verifyEmail(event.target.email.value) === false) {
    toast.error("L'email n'est pas valide.", {
      autoClose: 2000,
    });
    return;
  }
  if (verifyConfirmPassword(event.target.password.value, event.target.passwordConfirm.value) === false) {
    toast.error("Les mots de passe ne correspondent pas.", {
      autoClose: 2000,
    });
    return;
  }
  try {
    const res = await axios.post(API_URL + "/register", {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    });

    toast.success("Inscription réussie ! Veuillez vous conncter", {
      autoClose: 1000,
    });
    await router.push({name: 'login'})

    // Redirection ou autre logique ici
  } catch (err) {
    console.log(err)
    toast.error("Échec de la l'inscription. Vérifiez vos identifiants.", {
      autoClose: 1000,
    });
  }
}
</script>

<template>
  <div class="bg-card text-text min-h-screen flex items-center justify-center font-sans">
    <form @submit="sendLoginRequest"
          class="bg-secondary-dark p-8 rounded-lg flex flex-col gap-6 w-full max-w-sm divShadow border-form login-form">
      <label for="username" class="text-muted labelForm mb-1">Nom d'utilisateur</label>
      <input type="text" id="username" name="username"
             class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input"
             placeholder="Nom d'utilisateur"/>
      <label for="email" class="text-muted labelForm mb-1">Email</label>
      <input type="email" id="email" name="email"
             class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input"
             placeholder="Votre email"/>
      <label for="password" class="text-muted labelForm mb-1">Mot de passe</label>
      <input type="password" id="password" name="password"
             class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input"
             placeholder="Votre mot de passe"/>
      <div v-if="showPasswordCriteria">
        <p class="text-sm text-text-tertiary mt-1">Le mot de passe doit contenir :</p>
        <ul class="list-disc list-inside text-sm text-text-tertiary">
          <li>Au moins 8 caractères</li>
          <li>Une lettre majuscule</li>
          <li>Une lettre minuscule</li>
          <li>Un chiffre</li>
          <li>Un caractère spécial (ex : !@#$%^&*)</li>
        </ul>
      </div>

      <label for="passwordConfirm" class="text-muted labelForm mb-1">Confirmation du mot de
        passe</label>
      <input type="password" id="passwordConfirm" name="passwordConfirm"
             class="form-input bg-input-bg text-text px-4 py-2 rounded focus:outline-none border-input"
             placeholder="Confirmation du mot de passe"/>

      <button type="submit"
              class="form-button bg-primary py-2 rounded hover:bg-accent transition-colors form-submit-button top-0.5">
        S'enregistrer
      </button>
    </form>
  </div>
</template>

<style scoped>
.labelForm {
  margin-bottom: -15px;
}

.custom-toast {
  background: #232946;
  color: #eebbc3;
  border-radius: 8px;
  font-family: 'sans-serif';
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
