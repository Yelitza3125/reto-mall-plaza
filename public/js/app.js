var config = {
  apiKey: "AIzaSyAf1k6Z2g_XQhuDeg-s_FanIe5Irjsyjn8",
  authDomain: "bdmall-9832e.firebaseapp.com",
  databaseURL: "https://bdmall-9832e.firebaseio.com",
  projectId: "bdmall-9832e",
  storageBucket: "bdmall-9832e.appspot.com",
  messagingSenderId: "116516962450"
};
firebase.initializeApp(config);


// Login con Google
var provider = new firebase.auth.GoogleAuthProvider();
$('#authorize-button').on('click', function () {
  event.preventDefault();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken;

    var user = result.user;
    // Usuarios de Mall
    if (user.email === 'mpbperu@gmail.com') {
      $(location).attr('href', 'views/area.html');
      localStorage.sede = 'Bellavista';
      localStorage.emailNotification = 'mpbperu@gmail.com';
      localStorage.idCalendarMant = '626c8uffo3v8c4c46l6ctckmlc@group.calendar.google.com';
      localStorage.idCalendarSeg = '1pab32lka5ipkjhmhha9vo1a60@group.calendar.google.com';
      localStorage.idCalendarExp = 'coagdsh58j833j7gpeipjbmvb8@group.calendar.google.com';

    }
    else if (user.email === 'mpperu.arequipa@gmail.com') {
      $(location).attr('href', 'views/area.html');
      localStorage.sede = 'Arequipa';
      localStorage.emailNotification = 'mpperu.arequipa@gmail.com';
      localStorage.idCalendarMant = 'l9224ut6bauond7gkdhp4190t0@group.calendar.google.com';
      localStorage.idCalendarSeg = '2jb9tcrdava3n0vce25nmofj40@group.calendar.google.com';
      localStorage.idCalendarExp = 'knt40u5hkucn932lu8ke4pa734@group.calendar.google.com';
      
    } 
       
    
    else {
      // Alerta 'correo inválido');
      swal({
        text: 'Correo inválido.',
        type: 'warning',
        confirmButtonColor: '#e90049',
      });
    }
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorMessage)
  });
});