// Variables globales login
const d = document;
const userInput = d.querySelector("#usuarioForm");
const passInput = d.querySelector("#contraForm");
const btnLogin = d.querySelector(".btnLogin");

// Evento al botón del formulario
btnLogin.addEventListener("click", async () => {
    let dataForm = getData();
    if (dataForm) {
        await sendData(dataForm);
    }
});

let getData = () => {
    if (userInput.value && passInput.value) {
        return {
            usuario: userInput.value,
            contrasena: passInput.value
        };
    } else {
        alert("Debes llenar los campos");
        return null; // Evita retornar `undefined`
    }
};

// Función para enviar los datos
let sendData = async (data) => {
    let url = "http://localhost/backend-apiCrud/login";
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(respuesta.status == 401) {
            alert("El usuario y/o la contraseña es incorrecta")
        } else {
            let userLogin = await respuesta.json();
            //console.log("El usuario es:", userLogin);
            alert(`Bienvenido: ${userLogin.nombre}`)
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            location.href="../index.html";
        }
    }

         catch (error) {
        console.error("Error en la solicitud:", error);
    }
}






