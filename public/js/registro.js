// $(document).ready(function () {
// Client ID
// 23083249729-pin2cne0833qrijthhm0vsvut96qh9d8.apps.googleusercontent.com
// Secret
// b32fL6T5cwOdo5A67FsasKOT
// API
// AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0

// Client ID and API key from the Developer Console
var CLIENT_ID = '23083249729-htmk5866j9kth13kueqqnh5uocgp53lu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0';

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
addButton.on('click', function() {
  var userChoices = getUserInput();
  console.log(userChoices);
  if (userChoices)
    createEvent(userChoices);
  $(location).attr('href', 'calendario.html');
});

function getUserInput() {
  var date = $('#date').val();
  var endDate = $('#enddate').val();
  var eventDesc = $('#event').val();

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
    'calendarId': '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com',
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
    'start': {
      'dateTime': new Date(eventData.date).toISOString()
    },
    'end': {
      'dateTime': new Date(eventData.endDate).toISOString()
    },
    'attendees': [
      {'email': 'mpbperu@gmail.com'},
      {'email': 'andrea19_93@hotmail.com'}
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
    'calendarId': '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com',
    'resource': resource
  });

  // execute the request and do something with response
  request.execute(function(resp) {
    console.log(resp);
    // alert("Your event was added to the calendar.");
  });
}