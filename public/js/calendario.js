/* Iniciar navbar */
var contador = 1;
$('.bt-menu').click(function () {
  if (contador === 1) {
    $('.menu ul').animate({
      left: '0'
    });
    contador = 0;
  } else {
    contador = 1;
    $('.menu ul').animate({
      left: '-100%'
    });
  }
});
var config = {
  apiKey: "AIzaSyAf1k6Z2g_XQhuDeg-s_FanIe5Irjsyjn8",
  authDomain: "bdmall-9832e.firebaseapp.com",
  databaseURL: "https://bdmall-9832e.firebaseio.com",
  projectId: "bdmall-9832e",
  storageBucket: "bdmall-9832e.appspot.com",
  messagingSenderId: "116516962450"
};
firebase.initializeApp(config);

// Obteniendo el mes actual
let today = new Date();
let thisMonth = today.getMonth() + 1;
let formatDay = new Date(today).toISOString().substr(0, 10);
let yearNow = today.getFullYear();

// obteniendo Sede
let sede = localStorage.getItem('sede');
let areaSelect = localStorage.getItem('area');


// variables editar
const titleEdit = $('#title-edit');
const dateEdit = $('#date-edit');
const dateEndEdit = $('#date-end-edit');
const descriptionEdit = $('#description-edit');
const stateEdit = $('#state-event-edit');
let idSelect = '';
const titleCalendar = $('#title-calendar');
// Firebase
let database = firebase.database();
let eventsData = database.ref(`${sede}/${yearNow}/${areaSelect}`);





eventsData.on('value', function (datos) {
  $('#calendar').fullCalendar({
    defaultView: 'month',
    events: datos.val(),
    timezone: 'America/Lima',
    // seleccionando el evento
    eventClick: function (callEvent, jsEvent, view) {
      let fullDay = '';

      if (callEvent.end === null) {
        fullDay = callEvent.start._i
      } else {
        fullDay = callEvent.end._i
      }
      $('#modal-events').modal();
      $('#titleEvent').text(`${callEvent.title}`);
      titleEdit.val(`${callEvent.title}`);
      dateEdit.val(`${callEvent.start._i}`);
      dateEndEdit.val(`${fullDay.substr(0,10)}`);
      descriptionEdit.val(`${callEvent.descripcion}`);
      stateEdit.val(`${callEvent.state}`);
      localStorage.idSelect = `${callEvent.id}`


    }

  });
});





if ($(window).width() <= 600) {
  $('#calendar').fullCalendar('changeView', 'listMonth');
  $('#calendar').fullCalendar('option', 'aspectRatio', 0.7);
} else if ($(window).width() > 600) {
  $('#calendar').fullCalendar('changeView', 'month');
  $('#calendar').fullCalendar('option', 'aspectRatio', 2);
}


// Actualizar evento
$('#update').on('click', function () {
  let idUpdate = localStorage.getItem('idSelect')
  var eventUpdate = firebase.database().ref(`${sede}/${yearNow}/${areaSelect}/${idUpdate}`);
  eventUpdate.update({
    title: titleEdit.val(),
    start: dateEdit.val(),
    end: dateEndEdit.val() + ' 24:00:00',
    descripcion: descriptionEdit.val(),
    state: localStorage.stateEdit,
    color: stateColor(localStorage.stateEdit)

  });
  $('#calendar').fullCalendar('refetchEvents');


  $(location).attr('href', 'calendario.html'); // recargar la pagina
  $('#modal-events').modal('toggle');
});

let resultMonth = [];
let deadLine = 0;

// Optimizando para todas las áreas


//Verificar si hay tareas fuera de fechas al cargar la página
eventsData.on('value', function (datos) {
  let dataResult = datos.val();
if(dataResult){
  dataResult.forEach(element => {
    if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
      resultMonth.push(element);
    }

  });

  resultMonth.forEach(element => {
    if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
      deadLine++;

    }
  });
}
 

  if (areaSelect == 'Mantenimiento') {
    localStorage.deadLineMan = deadLine;
  }
  if (areaSelect == 'Seguridad') {
    localStorage.deadLineSecu = deadLine;
  }
  if (areaSelect == 'Experiencia') {
    localStorage.deadLineExp = deadLine;
  }

})





// Mostrar alerta de tareas fuera de fechas
if(areaSelect == 'Mantenimiento'){
  UpdateDeadLine('deadLineMan');
  titleCalendar.text('Mantenimiento');
}
if(areaSelect == 'Seguridad'){
  UpdateDeadLine('deadLineSecu');
  titleCalendar.text('Seguridad');
}
if(areaSelect == 'Experiencia'){
  UpdateDeadLine('deadLineExp');
  titleCalendar.text('Experiencia');
}


// FUnciones globales
 function UpdateDeadLine(localarea){
  if (localStorage.getItem(`${localarea}`) > 0) {
    $('#alert').empty();
    let templateAlert = `<div class="alert alert-danger" role="alert">
    <i class="fas fa-exclamation-triangle"></i><span> Existen tareas fuera de fecha</span> <button class="btn btn-detail float-right" id="btn-mall"> Mostrar</button>
  </div>`;
    $('#alert').append(templateAlert);
    $('#btn-mall').on('click', function () { // Boton que cambia de estado a fuera de fecha 
      eventsData.on('value', function (datos) {
        let dataResult = datos.val();
  
        dataResult.forEach(element => {
          if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
            resultMonth.push(element);
          }
  
        });
  
        resultMonth.forEach(element => {
          if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
            deadLine++;
            var eventUpdate = firebase.database().ref(`${sede}/${yearNow}/${areaSelect}/${element.id}`);
            eventUpdate.update({
  
              state: "1",
              color: "#FF0045"
  
            });
          }
        })
  
      })
      $(location).attr('href', 'calendario.html');
    })
  }
  if (localStorage.getItem(`${localarea}`) == 0) {
    $('#alert').empty();
    let templateAlert = `<div class="alert alert-success" role="alert">
    <i class="far fa-check-circle"></i><span> Tareas dentro de fecha</span> 
  </div>`;
    $('#alert').append(templateAlert);
  }
 }



// Seleccionando valor de estado por valor 1 :orden de compra  2:cotización


stateEdit.on('change', function () {
  let stateUpdate = stateEdit.val();
  localStorage.stateEdit = stateUpdate;

})



//Limpiar formulario
function clearForm() {
  titleNew.val('');
  dateNew.val('');
  dateEndNew.val('');
  descriptionNew.val('');
  stateNew.val('0');
}

// estados por colores  1 :Fuera de Fecha  2:cotización  3:OC   4: Proceso 5 : revision   6: Finalizado  7:Programado
function stateColor(state) {
  if (state == 1) {
    return '#FF0045'
  }
  if (state == 2) {
    return '#FF9702'
  }
  if (state == 3) {
    return '#FFDB00'
  }
  if (state == 4) {
    return '#00C11A'
  }
  if (state == 5) {
    return '#006400'
  }
  if (state == 6) {
    return '#3399FF'
  }
  if (state == 7) {
    return '#CCCCCC'
  }

}