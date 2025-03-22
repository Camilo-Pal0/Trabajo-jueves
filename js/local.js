//Variables globales de admin
let nombreUsuario = document.querySelector('#nombreUsuario')
let btnLogout = document.querySelector('#btnLogout')

//Funciónm para poner el nombre del usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem('userLogin'))
    nameUser.textContent = user.nombre;
}

//Evento para el botón del logout
btnLogout.addEventListener('click', ()=>{
    localStorage.removeItem('userLogin');
    location.href = "../login.html";
})

//Función k se ejecuta al reiniciar la página
document.addEventListener('DOMContentLoaded', ()=>{
    getUser()
})