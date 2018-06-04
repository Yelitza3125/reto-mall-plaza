/* Iniciar datedropper */
$('#date-new').dateDropper();
$('#date-end-new').dateDropper();

/* Iniciar navbar */
var contador = 1;
$('.bt-menu').click(function () {
  if (contador === 1) {
    $('nav').animate({
      left: '0'
    });
    contador = 0;
  } else {
    contador = 1;
    $('nav').animate({
      left: '-100%'
    });
  }
});

/*****Registro de Tareas**** */
var config = {
  apiKey: "AIzaSyAf1k6Z2g_XQhuDeg-s_FanIe5Irjsyjn8",
  authDomain: "bdmall-9832e.firebaseapp.com",
  databaseURL: "https://bdmall-9832e.firebaseio.com",
  projectId: "bdmall-9832e",
  storageBucket: "bdmall-9832e.appspot.com",
  messagingSenderId: "116516962450"
};
firebase.initializeApp(config);

// variables agregar
const titleNew = $('#title-new');
const dateNew = $('#date-new');
const dateEndNew = $('#date-end-new');
const descriptionNew = $('#description-new');
const stateNew = $('#state-event-new');
let today = new Date();
let thisMonth = today.getMonth() + 1;
let formatDay = new Date(today).toISOString().substr(0, 10);
let yearNow = today.getFullYear();
let calendarId = '';
// obteniendo Sede
let sede = localStorage.getItem('sede');
let areaSelect = localStorage.getItem('area');
let emailNotification = localStorage.getItem('emailNotification');

// Firebase
let database = firebase.database();
if (areaSelect == 'Mantenimiento') {
  calendarId = localStorage.getItem('idCalendarMant');
}
if (areaSelect == 'Seguridad') {
  calendarId = localStorage.getItem('idCalendarSeg');
}
if (areaSelect == 'Experiencia') {
  calendarId = localStorage.getItem('idCalendarExp');
}

let yearAddBd =new Date(dateNew.val()).toISOString().substr(0, 4);
localStorage.yearAddBd = yearAddBd;
dateNew.on('change' , function(){
  yearAddBd =new Date(dateNew.val()).toISOString().substr(0, 4);
  localStorage.yearAddBd = yearAddBd;
  let eventsData = database.ref(`${sede}/${yearAddBd}/${areaSelect}`);
  eventsData.on('value', function (datos) {
    lastEvent = datos.val();
    if(lastEvent== null){
      localStorage.lastEvent = 0; // guardando 
    }
    if(lastEvent!==null){
      localStorage.lastEvent = lastEvent.length; // guardando 
    }
    
  })
})


let eventsData = database.ref(`${sede}/${yearAddBd}/${areaSelect}`);

// Varibales de insertar eventos


// Obteniendo el último evento
let lastEvent = '';

eventsData.on('value', function (datos) {
  lastEvent = datos.val();
  if(lastEvent!==null){
    localStorage.lastEvent = lastEvent.length; // guardando 
  }
  if(lastEvent==null){
    localStorage.lastEvent = 0; // guardando 
  }
  
})



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

function validateDate() {

}
var addButton = $('#addToCalendar');
var signoutButton = $('#signout-button');

addButton.on('click', function (event) {
  event.preventDefault();
  var userChoices = getUserInput();
  // 
  validateDate();
  if (userChoices) {
    createEvent(userChoices);
    AddEventBD();
    swal({
      text: 'Evento agregado al calendario.',
      type: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(function() {
      $(location).attr('href', 'calendario.html');
    }, 3000);
  }
});

/*  
dateNew.on('change', function() {
  console.log(dateNew.val());
  dateEndNew.attr('data-disabled-days','05/30/2018');
})
*/

function getUserInput() {
  var date = $('#date-new').val();
  var endDate = $('#date-end-new').val();
  var eventTitle = $('#title-new').val();
  var eventDes = $('#description-new').val();
  // check input values, they should not be empty
  if (date === '' || endDate === '' || eventTitle === '') {
    // Alerta para llenar todos los campos
    swal({
      text: 'Debes llenar todos los campos.',
      type: 'warning',
      confirmButtonColor: '#e90049',
    });
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
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    // authorizeButton.onclick = handleAuthClick;
    signoutButton.on('click', function () {
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
    // listUpcomingEvents();
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
//  */
// function listUpcomingEvents() {
//   gapi.client.calendar.events.list({
//     'calendarId': '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com',
//     'timeMin': (new Date()).toISOString(),
//     'showDeleted': false,
//     'singleEvents': true,
//     'maxResults': 10,
//     'orderBy': 'startTime'
//   }).then(function (response) {
//     var events = response.result.items;
//     // appendPre('Upcoming events:');

//     if (events.length > 0) {
//       for (i = 0; i < events.length; i++) {
//         var event = events[i];
//         var when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         // appendPre(event.summary + ' (' + when + ')');
//       }
//     } else {
//       // appendPre('No upcoming events found.');
//     }
//   });
// }

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
      'dateTime': new Date(eventData.endDate).toISOString(),
      'timeZone': 'America/Lima'
    },
    'attendees': [{
      'email': emailNotification
      }
      

    ],
    'reminders': {
      'useDefault': false,
      'overrides': [{
          'method': 'email',
          'minutes': 34560
        },
        {
          'method': 'email',
          'minutes': 14400
        },
        {
          'method': 'popup',
          'minutes': 5
        }
      ]
    }
  };
  console.log(resource.start.dayTime);
  // create the request
  var request = gapi.client.calendar.events.insert({
    'calendarId': calendarId,
    'resource': resource,

  });

  // execute the request and do something with response
  request.execute(function (resp) {
    console.log(resp);
    // alert("Your event was added to the calendar.");
  });
}

/**FUnción Agregar evento**/

let id = parseInt(localStorage.getItem('lastEvent'));

function AddEventBD() {
  // obteniendo el valor id siguiente

  let eventsDataNew = database.ref(`${sede}/${yearAddBd}/${areaSelect}/${id}`);

  let dateStartNew = new Date(dateNew.val()).toISOString().substr(0, 10);
  let dateEnd = new Date(dateEndNew.val()).toISOString().substr(0, 10);
  eventsDataNew.set({
    title: titleNew.val(),
    start: dateStartNew,
    end: dateEnd + ' 24:00:00',
    descripcion: descriptionNew.val(),
    state: '7',
    // state: localStorage.stateNew,
    id: id,
    color: '#CCCCCC'

  }, function () {
    console.log('Se registro correctamente');
  });

}