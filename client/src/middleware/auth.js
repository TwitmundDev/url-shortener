import Cookies from "js-cookie";
import { toast } from 'vue3-toastify';
import router from "@/router/index.js";

export default function authGuard(to, from, next) {
  const token = Cookies.get("jwt"); // synchronously get the cookie
  if (!token) {
    toast.error("Session expirée veuillez vous re connecter !", { autoClose: 3000 });
    return next({ name: "login" }); // redirection via next()
  }
  next();
}
