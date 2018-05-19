/*****Registro de Tareas**** */
var config = {
    apiKey: 'AIzaSyBS0K0yMCQO1H3DAkx1jojSpH3spvVMapM',
    authDomain: 'mall-plaza-12cf6.firebaseapp.com',
    databaseURL: 'https://mall-plaza-12cf6.firebaseio.com',
    projectId: 'mall-plaza-12cf6',
    storageBucket: 'mall-plaza-12cf6.appspot.com',
    messagingSenderId: '23083249729'
  };
  firebase.initializeApp(config);
  
  // variables agregar
  const titleNew = $('#title-new');
  const dateNew = $('#date-new');
  const dateEndNew = $('#date-end-new');
  const descriptionNew = $('#description-new');
  const stateNew = $('#state-event-new');
  
  // Firebase
  let database = firebase.database();
  let eventsData = database.ref('Bellavista/2018/Experiencia');
  
  // Varibales de insertar eventos
  // Obteniendo el último evento
  let lastEvent = '';
  
  eventsData.on('value', function (datos) {
    lastEvent = datos.val().length;
    localStorage.lastEventExperience = lastEvent; // guardando 
  })
  
  /* Variables para validar no sea menor a fecha actual */
  let dayA = new Date();
  let yearv = dayA.getFullYear();
  let monthv = dayA.getMonth();
  let dayv = dayA.getDate()-1;
  
  $('.datepicker').pickadate({
    monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
    monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec' ],
    weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
    weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
    labelMonthNext: 'Mes siguiente',
    labelMonthPrev: 'Mes anterior',
    labelMonthSelect: 'Selecciona un mes',
    labelYearSelect: 'Selecciona un año',
    weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    disable: [{
      from: [2010,5,12], to: [yearv,monthv,dayv]
     }
    ],
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'Cerrar',
    closeOnSelect: false, // Close upon selecting a date
    onSelect: function()
    {
      console.log('alllll');
    }
  });
  /*
  $('#date-new').on('change', function() {
    let valorcito = ($('#date-new').pickadate('picker').get('value')).getDate();
    console.log(valorcito);
    $('#date-end-new').pickadate({
      disable: [{
        from: [2010,5,12], to: [valorcito]
      }]
    })
  })
  */
  
  
  // Client ID and API key from the Developer Console
  var CLIENT_ID = '174387043472-mpubc53shtjju2jljruv1cft923md1gt.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyCXWAjrt4YFlbdTbKrSCyGQzaSCwPCBskk';
  
  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  
  // Authorization SCOPES required by the API; multiple SCOPES can be
  // included, separated by spaces.
  var SCOPES = 'https://www.googleapis.com/auth/calendar';
  
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  var addButton = $('#addToCalendar');
  var signoutButton = $('#signout-button');
  
  addButton.on('click', function(event) {
    event.preventDefault();
    var userChoices = getUserInput();
    // 
    
    if (userChoices){
      createEvent(userChoices);
      AddEventBD();
    $(location).attr('href', 'experiencia.html');
    }
  });
  
  function getUserInput() {
    var date = $('#date-new').val();
    var endDate = $('#date-end-new').val();
    var eventTitle = $('#title-new').val();
    var eventDes = $('#description-new').val();
    // check input values, they should not be empty
    if (date === '' || endDate === '' || eventTitle === '') {
      alert('All your input fields should have a meaningful value.');
      return;
    } else return {
      'date': date,
      'endDate': endDate,
      'eventTitle': eventTitle,
      'eventDes': eventDes
    };
  }
  
  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function() {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  
      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      // authorizeButton.onclick = handleAuthClick;
      signoutButton.on('click', function() {
        handleSignoutClick();
      });
    });
  }
  
  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // authorizeButton.style.display = 'none';
      // signoutButton.style.display = 'block';
      listUpcomingEvents();
    } else {
  
    }
  }
  
  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    console.log('cerrar sesión');
    gapi.auth2.getAuthInstance().signOut();
    $(location).attr('href', '../index.html');
  }
  
  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'coagdsh58j833j7gpeipjbmvb8@group.calendar.google.com',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      // appendPre('Upcoming events:');
  
      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          // appendPre(event.summary + ' (' + when + ')');
        }
      } else {
        // appendPre('No upcoming events found.');
      }
    });
  }
  
  function createEvent(eventData) {
    // First create resource that will be send to server.
    var resource = {
      'summary': eventData.eventTitle,
      'description': eventData.eventDes,
      'start': {
        'dateTime': new Date(eventData.date).toISOString(),
        'timeZone': 'America/Lima'
      },
      'end': {
        'dateTime': new Date(eventData.endDate).toISOString() ,
        'timeZone': 'America/Lima'
      },
      'attendees': [
        {'email': 'mpbperu@gmail.com'
        },
        {'email': 'carlacentenor@hotmail.com'}
  
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email',
            'minutes': 34560},
          {'method': 'email',
            'minutes': 14400},
          {'method': 'popup',
            'minutes': 5}
        ]
      }
    };
    console.log(resource.start.dayTime);
    // create the request
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'coagdsh58j833j7gpeipjbmvb8@group.calendar.google.com',
      'resource': resource,
  
    });
  
    // execute the request and do something with response
    request.execute(function(resp) {
      console.log(resp);
      // alert("Your event was added to the calendar.");
    });
  }
  
  /**FUnción Agregar evento**/
  
  let id = parseInt(localStorage.getItem('lastEventExperience'));
  
  function AddEventBD(){
    // obteniendo el valor id siguiente
  
    let eventsDataNew = database.ref('Bellavista/2018/Experiencia/' + id);
  
    let dateStartNew = new Date(dateNew.val()).toISOString().substr(0,10);
    let dateEnd = new Date(dateEndNew.val()).toISOString().substr(0,10);
    eventsDataNew.set({
      title: titleNew.val(),
      start:  dateStartNew,
      end:  dateEnd +' 24:00:00',
      descripcion: descriptionNew.val(),
      state: '7',
      // state: localStorage.stateNew,
      id: id,
      color: '#CCCCCC'
  
    }, function () {
      console.log('Se registro correctamente');
     
    });
    
  }