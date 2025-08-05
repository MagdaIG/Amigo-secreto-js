const listaDeAmigos = [];

const input = document.getElementById('amigo');
const ul = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const botonSortear = document.getElementById('botonSortear');
const modal = document.getElementById('modal');
const modalTexto = document.getElementById('modal-text');

// Agregar amigo
function agregarAmigo() {
  const nombre = input.value.trim();

  if (nombre === "") {
    mostrarModal("Por favor, ingresa un nombre válido.");
    return;
  }

  // Verificar si ya existe en la lista (sin importar mayúsculas)
  const nombreExiste = listaDeAmigos.some(
    amigo => amigo.toLowerCase() === nombre.toLowerCase()
  );

  if (nombreExiste) {
    mostrarModal("Este nombre ya fue agregado.");
    input.value = "";
    return;
  }

  listaDeAmigos.push(nombre);
  input.value = "";
  mostrarLista();

  if (listaDeAmigos.length >= 2) {
    botonSortear.disabled = false;
  }
}

// Mostrar la lista
function mostrarLista() {
  ul.innerHTML = "";

  listaDeAmigos.forEach(nombre => {
    const li = document.createElement('li');
    li.textContent = nombre;
    ul.appendChild(li);
  });
}

// Sorteo
function sortearAmigo() {
  if (listaDeAmigos.length < 2) {
    mostrarModal("Debes agregar al menos dos nombres para realizar el sorteo.");
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * listaDeAmigos.length);
  const nombreSorteado = listaDeAmigos[indiceAleatorio];

  resultado.innerHTML = `<li>El amigo secreto sorteado es: <strong>${nombreSorteado}</strong></li>`;
}

// Enter para añadir
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    agregarAmigo();
  }
});

// Modal personalizado
function mostrarModal(mensaje) {
  modalTexto.textContent = mensaje;
  modal.classList.remove("hidden");
}

function cerrarModal() {
  modal.classList.add("hidden");
}

// Cerrar con Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});

// Cerrar haciendo clic fuera del contenido
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    cerrarModal();
  }
});

// Limpiar la lista, el resultado y desactivar el botón
function limpiarTodo() {
  listaDeAmigos.length = 0; // Vacía el array
  ul.innerHTML = "";
  resultado.innerHTML = "";
  botonSortear.disabled = true;
  input.focus(); // Devuelve el foco al input
}
