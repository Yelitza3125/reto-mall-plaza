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
    var template = `<div><p>${valor.title}</p></div>`;
    box.append(template);
  });
});