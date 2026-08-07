let contenido = '';
btnAgregarPlatillo = document.getElementById("btnAgregarPlatillo")
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

btnAgregarPlatillo.addEventListener('click', function(){
alert('Platillo agregado');
});

function mostrarPlatillo(platillo, id) {
    contenido += `<div class="card-panel recipe white row" id="${id}">
    <div class="recipe-details">
      <div class="recipe-title">
          nombre: ${platillo.nombre}
      </div>
      <div class="recipe-ingredients">
         ingredintes:  ${platillo.ingredientes}
      </div>
      <div class="recipe-price">
         precio $ ${platillo.precio}
      </div>
        </div>
        <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
        </div>`;
        

    document.querySelector('.recipes').innerHTML = contenido;
}

function actualizarPlatillo(platillo, id) {
  let tarjeta = document.getElementById(`${id}`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
  tarjeta.querySelector(".recipe-price").innerHTML = `Precio: $${platillo.precio}`;

}


document.addEventListener("click", function(e){
    if(e.target.classList.contains("material-icons")){
        const id = e.target.getAttribute("data-id");
        if(id){
            db.collection("platillos")
            .doc(id)
            .delete()
            .then(() => {
                alert("Platillo eliminado");
                document.getElementById(id).remove();
            })
            .catch((error)=>{
                console.log("Error al eliminar:", error);
            });
        }
    }
});

let streaming = false;
const width = 320;
let height = 0;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const foto = document.getElementById("foto");
const btnfoto = document.getElementById("btnFoto"); // F mayúscula

btnfoto.addEventListener("click", function () {
  if (!streaming) {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.log(error);
    });

    video.addEventListener("canplay", function () {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute("width", width);
        video.setAttribute("height", height);

        streaming = true;
      }
    }, { once: true });

  } else {
    tomarFoto();
  }
});

function tomarFoto() {
  const contexto = canvas.getContext("2d");

  if (width && height) {
    canvas.width = width;
    canvas.height = height;

    contexto.drawImage(video, 0, 0, width, height);

    const fotoFinal = canvas.toDataURL("image/png");
    foto.setAttribute("src", fotoFinal);
  }
}