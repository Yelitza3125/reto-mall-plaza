$('#calendar').fullCalendar({
  googleCalendarApiKey: 'AIzaSyD3UdXv-AuAkuoe8JIBawuDVQxqPxkkyT0',
  events: {
    googleCalendarId: '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com'
  },
  eventColor: '#fbc02d ',
  aspectRatio: 2,
  fixedWeekCount: true
});

if ($(window).width() <= 600) {
  $('#calendar').fullCalendar('changeView', 'listMonth');
  $('#calendar').fullCalendar('option', 'aspectRatio', 0.7);
} else if ($(window).width() > 600) {
  $('#calendar').fullCalendar('changeView', 'month');
  $('#calendar').fullCalendar('option', 'aspectRatio', 2);
}
