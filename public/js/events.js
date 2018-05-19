var config = {
  apiKey: 'AIzaSyBS0K0yMCQO1H3DAkx1jojSpH3spvVMapM',
  authDomain: 'mall-plaza-12cf6.firebaseapp.com',
  databaseURL: 'https://mall-plaza-12cf6.firebaseio.com',
  projectId: 'mall-plaza-12cf6',
  storageBucket: 'mall-plaza-12cf6.appspot.com',
  messagingSenderId: '23083249729'
};
firebase.initializeApp(config);

$(document).ready(function () {
  $('select').formSelect();
});


var database = firebase.database();
var events = database.ref('Bellavista/2018/Mantenimiento');
var box = $('.box-events');
events.on('value', function (datos) {
  data = datos.val();
  $.each(data, function (indice, valor) {
    var template =
      `<div class="row card #eeeeee grey lighten-3">
    <div class="col s1 center-align number-detail" >
    <p> ${indice+1}.</p>
    </div>
    <div class="col s2">

      <p><span class="center-align title-state">Título :</span></p>
      <p><span class="center-align title-state">Descripción :</span></p>
      <p><span class="center-align title-state">Inicio :</span></p>
      
    </div>
    <div class="col s6">
    <p><span>${valor.title}</span></p>
    <p><span>${valor.descripcion}</span></p>
    <p><span>${valor.start}</span><span class="center-align title-state end">Fin :</span><span>${valor.end}</span></p>
    </div>
    <div class="col s3" >
    <div class="box-state-detail" style="background-color:${valor.color};">${nameState(valor.state)}</di>

    </div> 
    </div>`;
    box.append(template);

  });
  $('.list').change(function () {
    // console.log(event.target);
    var stage = $(this).find('option:selected').attr('data-stage');
    $(this).prev().text(stage);
  });
});

function nameState(value) {
  switch (value) {
    case '1':
      return 'Fuera de Fecha'
      break;
    case '2':
      return 'Cotización'
      break;
    case '3':
      return 'Orden de Compra'
      break;
    case '4':
      return 'Proceso'
      break;
    case '5':
      return 'Revisión/ HES'
      break;
    case '6':
      return 'Finalizado'
      break;
    case '7':
      return 'Programado'
      break;
    default:
      return 'Programado'
  }
}