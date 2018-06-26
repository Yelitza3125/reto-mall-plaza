var config = {
  apiKey: "AIzaSyA70IZ4pYA_LbtDTusPsEIUsqnlZEUkQyw",
  authDomain: "mallplaza-dbe0c.firebaseapp.com",
  databaseURL: "https://mallplaza-dbe0c.firebaseio.com",
  projectId: "mallplaza-dbe0c",
  storageBucket: "mallplaza-dbe0c.appspot.com",
  messagingSenderId: "832805829105"
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
    let database = firebase.database();
    let dataUsers = database.ref(`Users`);
    dataUsers.on('value', function (datos) {
      let userResult = datos.val();
      let verify = 0;
      for (let i = 0; i < userResult.length; i++) {
        if (user.email == userResult[i].email) {
          verify++;
          localStorage.sede = userResult[i].sede;
          localStorage.emailNotification = userResult[i].email;
          localStorage.idCalendarMant = userResult[i].idCalendarMant;
          localStorage.idCalendarSeg = userResult[i].idCalendarSeg;
          localStorage.idCalendarExp = userResult[i].idCalendarExp;
          $(location).attr('href', 'views/area.html');
          break;
        }
      }
      if (verify == 0) {
        // Alerta 'correo inválido');
        swal({
          text: 'Correo inválido.',
          type: 'warning',
          confirmButtonColor: '#e90049',
        });

      }

    });

  }).catch(function (error) {
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