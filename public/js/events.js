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
    `<div>
      <p>${valor.title}</p>
      <p class="opcion">Pendiente</p>
      <select class="list" name="estado">
        <option data-stage='Pendiente' value="Pendiente">Pendiente</option>
        <option data-stage='cotización' value="cotización">cotización</option>
        <option data-stage='OC proceso' value="OC proceso">OC proceso</option>
        <option data-stage='revisión informe' value="revisión informe">revisión informe</option>
        <option data-stage='Hes' value="Hes">Hes</option>
        <option data-stage='correcciones' value="correcciones">correcciones</option>
        <option data-stage='finalizado' value="finalizado">finalizado</option>
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