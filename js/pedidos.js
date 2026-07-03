document.addEventListener('DOMContentLoaded', function(){
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
});

let contenidoLista = `
<option value="" disabled selected>
Seleccione un platillo
</option>`;

db.collection("platillos").onSnapshot((datos) => {
    datos.docChanges().forEach((registro) => {
        if (registro.type === "added") {
            agregarALista(registro.doc.data(), registro.doc.id);
        }
    });
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);   // <- aquí estaba el error
});

function agregarALista(platillo, id) {
    const lista = document.getElementById("listarPlatillos");
    if (!lista) return;
    contenidoLista += `
    <option value="${id}">
        ${platillo.nombre}
    </option>`;
    lista.innerHTML = contenidoLista;
}

M.AutoInit();


const btnGuardar = document.getElementById("btnGuardarPlatillo");

if (btnGuardar) {
    btnGuardar.addEventListener("click", function (e) {
        e.preventDefault();
        const lista = document.getElementById("listarPlatillos");
        const platillo = lista.options[lista.selectedIndex].text;
        const ubicacion = document.getElementById("ubicacion").value;
        const nombre = document.getElementById("nombre").value;
        db.collection("pedidos").add({
            platillo: platillo,
            ubicacion: ubicacion,
            nombre: nombre
        })

        .then(() => {
            alert("Pedido guardado");
            document.getElementById("ubicacion").value = "";
            lista.selectedIndex = 0;
            M.FormSelect.init(document.querySelectorAll("select"));
        })

        .catch((error) => {
            console.log(error);
        });
    });
}