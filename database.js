//FIREBASE//
// Importar Firebase y Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYcB5PT59GE_zro3TpnR0-fWBRkPGYGyE",
  authDomain: "boda-marroquincarias.firebaseapp.com",
  projectId: "boda-marroquincarias",
  storageBucket: "boda-marroquincarias.firebasestorage.app",
  messagingSenderId: "634413030263",
  appId: "1:634413030263:web:257abe7fc54cd9ab545f72"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("✅ Firebase conectado correctamente!");

// Función para enviar un buen deseo a Firebase
window.submitWish = function () {
  const name = document.getElementById("wish-name").value.trim();
  const message = document.getElementById("wish-message").value.trim();

  if (name !== "" && message !== "") {
    push(ref(db, "buenos-deseos/"), {
      nombre: name,
      mensaje: message
    });

    // Limpiar el formulario después de enviar
    document.getElementById("wish-name").value = "";
    document.getElementById("wish-message").value = "";

    alert("¡Tu buen deseo ha sido enviado! 🌟");
  } else {
    alert("Por favor, completa ambos campos antes de enviar.");
  }
};

// Función para mostrar los buenos deseos en pantalla
window.toggleWishes = function () {
  const wishesDiv = document.getElementById("wishes");

  // Si la sección ya está visible, la oculta
  if (!wishesDiv.classList.contains("hidden")) {
    wishesDiv.classList.add("hidden");
    return;
  }

  // Mostrar deseos en tiempo real
  onValue(ref(db, "buenos-deseos/"), (snapshot) => {
    wishesDiv.innerHTML = ""; // Limpiar antes de actualizar
    snapshot.forEach((childSnapshot) => {
      const wish = childSnapshot.val();
      const wishElement = document.createElement("p");
      wishElement.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
      wishesDiv.appendChild(wishElement);
    });

    wishesDiv.classList.remove("hidden"); // Mostrar la sección
  });
};

// Función para mostrar/ocultar el formulario
window.toggleWishForm = function () {
  document.getElementById("wish-form").classList.toggle("hidden");
};
