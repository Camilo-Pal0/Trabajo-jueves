//Variables globales
const d = document;

let tablePro = d.querySelector("#table-pro > tbody");
let searchInput = d.querySelector("#search-input");
//Función para borrar producto de la tabla
let deleteDataTable = (pos) => {
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    let IDProduct = {
        id: singleProduct.id,
    }
    let confirmar = confirm(`¿Deseas eliminar el producto: ${singleProduct.nombre}?`);
    if(confirmar){
        //Llamar a la función para realizar peticion de eliminar
        sendDeleteProduct(IDProduct);
    }
}

//Función para realizar la petición de eliminar producto
let sendDeleteProduct = async (id) => {
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(id)
        });
        if(respuesta.status === 406){
            alert("El ID enviado no fue admitido");
        }else {
            let mensaje = await respuesta.json();
            alert(mensaje.message)
            location.reload();
        }
    }catch (error){
        console.log(error);
    }
}

//Función para limpiar productos de la tabla y limpiar
let clearDataTable = ()=> {
    let rowTable = document.querySelectorAll("#table-pro > tbody > tr");
    rowTable.forEach((row) =>{
        row.remove()
    });
}

//Función para buscar productos de la tabla
let searchProductTable = () => {
    let products = JSON.parse(localStorage.getItem("datosTabla")) || [];  // Asegura que haya datos
    if (products.length === 0) {
        console.log("No hay productos para buscar.");
        return;
    }

    let textSearch = searchInput.value.toLowerCase();
    clearDataTable();

    let i = 0;
    for (let pro of products) {
        if (pro.nombre.toLowerCase().includes(textSearch)) {
            let row = d.createElement("tr");
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${pro.nombre}</td>
                <td>${pro.descripcion}</td>
                <td>${pro.precio}</td>
                <td>${pro.stock}</td>
                <td><img src="${pro.imagen}" width="100"></td>
                <td>
                    <button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning">
                        Editar
                    </button>
                    ${nameUser.textContent === "vendedor" ? "" : 
                    `<button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger">
                        Eliminar
                    </button>`}
                </td>
            `;
            tablePro.appendChild(row);
            i++;
        }
    }
};