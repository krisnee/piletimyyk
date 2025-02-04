import { ref } from 'vue';

const isAdmin = ref(false); // Algne olek, et kasutaja ei ole admin

const loginAsAdmin = () => {
  isAdmin.value = true; // Muuda olek adminiks
};

const logout = () => {
  isAdmin.value = false; // Logi välja
};

export { isAdmin, loginAsAdmin, logout };