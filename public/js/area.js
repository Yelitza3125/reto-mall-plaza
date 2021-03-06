const security = $('#seguridad');
const mantenimiento = $('#mantenimiento');
const experiencia = $('#experiencia');
const registerMan = $('#register-man');
const registerSeg = $('#register-seg');
const registerExp = $('#register-exp');

var config = {
  apiKey: "AIzaSyA70IZ4pYA_LbtDTusPsEIUsqnlZEUkQyw",
  authDomain: "mallplaza-dbe0c.firebaseapp.com",
  databaseURL: "https://mallplaza-dbe0c.firebaseio.com",
  projectId: "mallplaza-dbe0c",
  storageBucket: "mallplaza-dbe0c.appspot.com",
  messagingSenderId: "832805829105"
};
firebase.initializeApp(config);

// Obteniendo fechas : Mes y Año
let today = new Date();
let thisMonth = today.getMonth() + 1;
let formatDay = new Date(today).toISOString().substr(0, 10);
let yearNow = today.getFullYear();

// obteniendo Sede
let sede = localStorage.getItem('sede');


let database = firebase.database();
let eventsDataSec = database.ref(`${sede}/${yearNow}/Seguridad`);
let eventsDataMant = database.ref(`${sede}/${yearNow}/Mantenimiento`);
let eventsDataExp = database.ref(`${sede}/${yearNow}/Experiencia`);
let resultMonthMant = [];
let resultMonthExp = [];
let resultMonthSecu = [];
let deadLineMan = 0;
let deadLineExp = 0;
let deadLineSecu = 0;




// Verificar si hay tareas fuera de fechas al cargar la página Seguridad
eventsDataSec.on('value', function(datos) {
  let dataResult = datos.val();
  if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      console.log((element.start).slice(5, 7))
      console.log(thisMonth -1)
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
       
        resultMonthSecu.push(element);
    }
      
    });
  
    resultMonthSecu.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineSecu++;
      }
    });
    localStorage.deadLineSecu = deadLineSecu;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineSecu = 0;
  }
 
});
eventsDataMant.on('value', function(datos) {
  let dataResult = datos.val();
  if(dataResult!== null){
  lastEvent = datos.val().length;

  localStorage.lastEvent = lastEvent; // guardando 
  dataResult.forEach(element => {
    if ((element.start).slice(5, 7) == thisMonth|| (element.start).slice(5, 7) == thisMonth-1) {
      resultMonthMant.push(element);
    }
  });

  resultMonthMant.forEach(element => {
    if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
      deadLineMan++;
    }
  });
  localStorage.deadLineMan = deadLineMan;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineSecu = 0;
  }

});
eventsDataExp.on('value', function(datos) {
  let dataResult = datos.val();
  if(dataResult!== null){
  lastEvent = datos.val().length;

  localStorage.lastEvent = lastEvent; // guardando 
  dataResult.forEach(element => {
    if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
      resultMonthExp.push(element);
    }
  });

  resultMonthExp.forEach(element => {
    if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
      deadLineExp++;
    }
  });
  localStorage.deadLineExp = deadLineExp;
}
if(dataResult== null){
  localStorage.lastEvent = 0; // guardando 
  localStorage.deadLineExp = 0;
}

});


security.on('click', function() {
  localStorage.area = 'Seguridad';
  // Verificar si hay tareas fuera de fechas al cargar la página Seguridad
  eventsDataSec.on('value', function(datos) {
    let dataResult = datos.val();
    if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
        resultMonthSecu.push(element);
      }
    });

    resultMonthSecu.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineSecu++;
      }
    });
    localStorage.deadLineSecu = deadLineSecu;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineSecu = 0;
  }

  });
  $(location).attr('href', 'calendario.html');
});

mantenimiento.on('click', function() {
  localStorage.area = 'Mantenimiento';
  // Verificar si hay tareas fuera de fechas al cargar la página Mantenimiento
  eventsDataMant.on('value', function(datos) {
    let dataResult = datos.val();
    if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
        resultMonthMant.push(element);
      }
    });

    resultMonthMant.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineMan++;
      }
    });
    localStorage.deadLineMan = deadLineMan;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineMan = 0;
  }

  });
  $(location).attr('href', 'calendario.html');
});

experiencia.on('click', function() {
  
  localStorage.area = 'Experiencia';
  // Verificar si hay tareas fuera de fechas al cargar la página Experiencia
  eventsDataExp.on('value', function(datos) {
    let dataResult = datos.val();
    if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
        resultMonthExp.push(element);
      }
    });

    resultMonthExp.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineExp++;
      }
    });
    localStorage.deadLineExp = deadLineExp;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineExp = 0;
  }
  });
  $(location).attr('href', 'calendario.html');
});

registerSeg.on('click', function() {
  localStorage.area = 'Seguridad';
  // Verificar si hay tareas fuera de fechas al cargar la página Seguridad
  eventsDataSec.on('value', function(datos) {
    let dataResult = datos.val();
    if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
        resultMonthSecu.push(element);
      }
    });

    resultMonthSecu.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineSecu++;
      }
    });
    localStorage.deadLineSecu = deadLineSecu;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineSecu = 0;
  }
    $(location).attr('href', 'registro.html');
  });
});

registerMan.on('click', function() {
  localStorage.area = 'Mantenimiento';
  // Verificar si hay tareas fuera de fechas al cargar la página Mantenimiento
  eventsDataMant.on('value', function(datos) {
    let dataResult = datos.val();
    if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
        resultMonthMant.push(element);
      }
    });

    resultMonthMant.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineMan++;
      }
    });
    localStorage.deadLineMan = deadLineMan;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineMan = 0;
  }
    $(location).attr('href', 'registro.html');
  });
});

registerExp.on('click', function() {
  localStorage.area = 'Experiencia';
  // Verificar si hay tareas fuera de fechas al cargar la página Experiencia
  eventsDataExp.on('value', function(datos) {
    let dataResult = datos.val();
    if(dataResult!== null){
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
      if ((element.start).slice(5, 7) == thisMonth || (element.start).slice(5, 7) == thisMonth-1) {
        resultMonthExp.push(element);
      }
    });

    resultMonthExp.forEach(element => {
      if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
        deadLineExp++;
      }
    });
    localStorage.deadLineExp = deadLineExp;
  }
  if(dataResult== null){
    localStorage.lastEvent = 0; // guardando 
    localStorage.deadLineExp = 0;
  }
    $(location).attr('href', 'registro.html');
  });
});


