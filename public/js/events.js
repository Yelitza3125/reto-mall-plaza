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
var events = database.ref('Bellavista/2018/Mantenimiento');
var box = $('.box-events');
events.on('value', function(datos) {
  data = datos.val();
  $.each(data, function(indice, valor) {
    var template = 
    `<div class="card center-align">
      <p class="center-align titleState">${valor.title}</p>
      <p class="opcion">Estado: <span class="estado">Pendiente</span></p>
     
    </div>`;
    box.append(template);

  });
  $('.list').change(function() {
    // console.log(event.target);
    var stage = $(this).find('option:selected').attr('data-stage');
    $(this).prev().text(stage);
  });  
});