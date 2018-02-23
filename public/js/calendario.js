// $(document).ready(function () {
// Client ID
// 23083249729-pin2cne0833qrijthhm0vsvut96qh9d8.apps.googleusercontent.com
// Secret
// b32fL6T5cwOdo5A67FsasKOT
// API
// AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0

// FullCalendar
$('#calendar').fullCalendar({
  googleCalendarApiKey: 'AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0',
  events: {
    googleCalendarId: '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com'
  }
});

// Client ID and API key from the Developer Console
var CLIENT_ID = '23083249729-htmk5866j9kth13kueqqnh5uocgp53lu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization SCOPES required by the API; multiple SCOPES can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar';

var authorizeButton = document.getElementById('authorize-button');
// var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);

  console.log('Inside handleClientLoad ...');
  gapi.client.setApiKey(API_KEY);
  window.setTimeout(checkAuth, 100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
  console.log('Inside checkAuth ...');
  gapi.auth.authorize({ client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: true },
  handleAuthResult);
}

/* Invoked by different functions to handle the result of authentication checks.*/
var authData;

function handleAuthResult(authResult) {
  console.log('Inside handleAuthResult ...');
  authData = authResult;
  var authorizeButton = document.getElementById('authorize-button');
  var addButton = document.getElementById('addToCalendar');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    addButton.style.visibility = 'visible';
    // load the calendar client library
    gapi.client.load('calendar', 'v3', function() {
      console.log('Calendar library loaded.');
    });
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}


/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
  console.log('click');
  gapi.auth.authorize({
    client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: false },
  handleAuthResult);
  return false;
}

var addButton = $('#addToCalendar');
addButton.onclick = function() {
  var userChoices = getUserInput();
  console.log(userChoices);
  if (userChoices)
    createEvent(userChoices);
};

function getUserInput() {
  var date = document.querySelector('#date').value;
  // var startTime = document.querySelector("#start").value;
  var endDate = document.querySelector('#enddate').value;
  // var endTime = document.querySelector("#end").value;
  var eventDesc = document.querySelector('#event').value;

  // check input values, they should not be empty
  if (date === '' || endDate === '' || eventDesc === '') {
    alert('All your input fields should have a meaningful value.');
    return;
  } else return {
    'date': date,
    'endDate': endDate,
    'eventTitle': eventDesc
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
    authorizeButton.onclick = handleAuthClick;
    // signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')');
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}

function createEvent(eventData) {
  // First create resource that will be send to server.
  var resource = {
    'summary': eventData.eventTitle,
    'start': {
      'dateTime': new Date(eventData.date).toISOString()
    },
    'end': {
      'dateTime': new Date(eventData.endDate).toISOString()
    },
    'attendees': [
      {'email': 'mpbperu@gmail.com',
        'days': 24},
      {'email': 'andrea19_93@hotmail.com',
        'days': 24}
    ]
  };
  // create the request
  var request = gapi.client.calendar.events.insert({
    'calendarId': '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com',
    'resource': resource
  });

  // execute the request and do something with response
  request.execute(function(resp) {
    console.log(resp);
    alert('Your event was added to the calendar.');
  });
}
// });