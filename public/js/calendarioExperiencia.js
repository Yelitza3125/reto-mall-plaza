var config = {
    apiKey: 'AIzaSyBS0K0yMCQO1H3DAkx1jojSpH3spvVMapM',
    authDomain: 'mall-plaza-12cf6.firebaseapp.com',
    databaseURL: 'https://mall-plaza-12cf6.firebaseio.com',
    projectId: 'mall-plaza-12cf6',
    storageBucket: 'mall-plaza-12cf6.appspot.com',
    messagingSenderId: '23083249729'
  };
  firebase.initializeApp(config);
  
  
  
  // variables editar
  const titleEdit = $('#title-edit');
  const dateEdit = $('#date-edit');
  const dateEndEdit = $('#date-end-edit');
  const descriptionEdit = $('#description-edit');
  const stateEdit = $('#state-event-edit');
  let idSelect = '';
  // Firebase
  let database = firebase.database();
  let eventsData = database.ref('Bellavista/2018/Experiencia');
  
  
  
  
  
  eventsData.on('value', function (datos) {
    $('#calendar-experience').fullCalendar({
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
        localStorage.idSelectExperience = `${callEvent.id}`
  
  
      }
      
    });
  });
  
  
  
  
  // $('#calendar').fullCalendar({
  //   googleCalendarApiKey: 'AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0',
  //   events: {
  //     googleCalendarId: '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com'
  //   },
  //   eventColor: '#fbc02d ',
  //   aspectRatio: 2,
  //   fixedWeekCount: true
  // });
  
  if ($(window).width() <= 600) {
    $('#calendar-experience').fullCalendar('changeView', 'listMonth');
    $('#calendar-experience').fullCalendar('option', 'aspectRatio', 0.7);
  } else if ($(window).width() > 600) {
    $('#calendar-experience').fullCalendar('changeView', 'month');
    $('#calendar-experience').fullCalendar('option', 'aspectRatio', 2);
  }
  
  
  // Actualizar evento
  $('#update').on('click', function () {
    let idUpdate = localStorage.getItem('idSelectExperience')
    var eventUpdate = firebase.database().ref(`Bellavista/2018/Experiencia/${idUpdate}`);
    eventUpdate.update({
      title: titleEdit.val(),
      start: dateEdit.val(),
      end: dateEndEdit.val() +' 24:00:00',
      descripcion: descriptionEdit.val(),
      state: localStorage.stateEdit,
      color: stateColor(localStorage.stateEdit)
  
    });
    $('#calendar-experience').fullCalendar('refetchEvents');
  
  
    $(location).attr('href', 'experiencia.html'); // recargar la pagina
    $('#modal-events').modal('toggle');
  });
  
  // FUnciones globales
  
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
   
  // estados por colores  1 :orden de compra  2:cotización
  function stateColor(state) {
    if (state == 1) {
      return '#FF6A80'
    }
    if (state == 2) {
      return '#A0DB8E'
    }
  }
  
  