// Arreglo para almacenar los nombres de los amigos
const friends = [];

// Referencias a los elementos del DOM
const inputFriends = document.getElementById('amigo');
const friendsList = document.getElementById('listaAmigos');
const result= document.getElementById('resultado');

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const name = inputFriends.value.trim();

    if (name === "") {
        alert("Por favor, escribe un nombre válido.");
        return;
    }

    if (friends.includes(name)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    friends.push(name);
    inputFriends.value = "";
    actualizarListaAmigos();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    friendsList.innerHTML = "";
    friends.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.className = 'name-item';

        // Botón para eliminar un amigo
        const btnDelete = document.createElement('button');
        btnDelete.textContent = "Eliminar";
        btnDelete.className = 'button-remove';
        btnDelete.onclick = () => eliminarAmigo(index);

        li.appendChild(btnDelete);
        friendsList.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    friends.splice(index, 1);
    actualizarListaAmigos();
}

// Función para sortear el amigo secreto
function sortearAmigo() {
    if (friends.length < 2) {
        alert("Debe haber al menos dos personas para realizar el sorteo.");
        return;
    }

    // Crear una copia de la lista para realizar el sorteo
    const asignations = [...friends];
    const lotteryResult = [];

    friends.forEach((friend) => {
        let indice;
        // Asegurar que una persona no se asigne a sí misma
        do {
            indice = Math.floor(Math.random() * asignations.length);
        } while (asignations[indice] === friend);

        lotteryResult.push(`${friend} tiene a ${asignations[indice]}`);
        asignations.splice(indice, 1);
    });

    mostrarResultado(lotteryResult);
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(lotteryResult) {
    result.innerHTML = "";
    lotteryResult.forEach((texto) => {
        const li = document.createElement('li');
        li.textContent = texto;
        li.className = 'result-item';
        result.appendChild(li);
    });
}

function resetear() {
    friends.length = 0; // Vaciar el arreglo de amigos
    inputFriends.value = ""; // Limpiar el input
    friendsList.innerHTML = ""; // Limpiar la lista de amigos
    result.innerHTML = ""; // Limpiar los resultados
}