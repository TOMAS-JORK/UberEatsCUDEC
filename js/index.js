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
    contenido += `<div class="card-panel recipe white row" data-id=${id}">
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
        <i class="material-icons" data-id="{id}">delete_outline </i>
        </div>
        </div>`;
        

    document.querySelector('.recipes').innerHTML = contenido;
}