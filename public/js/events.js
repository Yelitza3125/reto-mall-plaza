var config = {
  apiKey: 'AIzaSyBS0K0yMCQO1H3DAkx1jojSpH3spvVMapM',
  authDomain: 'mall-plaza-12cf6.firebaseapp.com',
  databaseURL: 'https://mall-plaza-12cf6.firebaseio.com',
  projectId: 'mall-plaza-12cf6',
  storageBucket: 'mall-plaza-12cf6.appspot.com',
  messagingSenderId: '23083249729'
};
firebase.initializeApp(config);

var database = firebase.database();
var events = database.ref('tareas');
var box = $('.box-events');
events.on('value', function(datos) {
  data = datos.val();
  $.each(data, function(indice, valor) {
    var template = 
    `<div class="card center-align">
      <p class="center-align titleState">${valor.title}</p>
      <p class="opcion">Estado: <span class="estado">Pendiente</span></p>
      <select class="select list" name="estado">
        <option data-stage='Pendiente' value="Pendiente">Pendiente</option>
        <option data-stage='Cotización' value="Cotización">Cotización</option>
        <option data-stage='OC proceso' value="OC proceso">OC proceso</option>
        <option data-stage='Revisión de informe' value="Revisión de informe">Revisión informe</option>
        <option data-stage='HES' value="Hes">HES</option>
        <option data-stage='Correcciones' value="Correcciones">Correcciones</option>
        <option data-stage='Finalizado' value="Finalizado">Finalizado</option>
      </select>
    </div>`;
    box.append(template);

  });
  $('.list').change(function() {
    // console.log(event.target);
    var stage = $(this).find('option:selected').attr('data-stage');
    $(this).prev().text(stage);
  });  
});