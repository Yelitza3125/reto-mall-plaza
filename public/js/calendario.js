// FullCalendar
var $fc = $('#calendar');
var options = {
  googleCalendarApiKey: 'AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0',
  events: {
    googleCalendarId: '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com'
  },
  eventColor: '#fbc02d ',
  locale: 'es',
  editable: false, // Don't allow editing of events
  handleWindowResize: true,
  weekends: true, // Hide weekends
  header: true, // Hide buttons/titles
  displayEventTime: false,
  defaultView: 'month'
};

$fc.fullCalendar(options);

if ($(window).width() <= 600) {
  $fc.fullCalendar('changeView', 'agendaDay');
} else if ($(window).width() > 600) {
  $fc.fullCalendar('changeView', 'month');
}