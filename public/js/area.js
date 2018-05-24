const security = $('#seguridad');
const mantenimiento = $('#mantenimiento');
const experiencia = $('#experiencia');
const registerMan = $('#register-man');
const registerSeg = $('#register-seg');
const registerExp = $('#register-exp');

var config = {
    apiKey: "AIzaSyAf1k6Z2g_XQhuDeg-s_FanIe5Irjsyjn8",
    authDomain: "bdmall-9832e.firebaseapp.com",
    databaseURL: "https://bdmall-9832e.firebaseio.com",
    projectId: "bdmall-9832e",
    storageBucket: "bdmall-9832e.appspot.com",
    messagingSenderId: "116516962450"
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


 //Verificar si hay tareas fuera de fechas al cargar la página Seguridad
 eventsDataSec.on('value', function (datos) {
    let dataResult = datos.val();
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
        if ((element.start).slice(5, 7) == thisMonth) {
            resultMonthSecu.push(element);
        }

    });

    resultMonthSecu.forEach(element => {
        if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
            deadLineSecu++;
           
        }
    })
    localStorage.deadLineSecu = deadLineSecu;
});
eventsDataMant.on('value', function (datos) {
    let dataResult = datos.val();
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
        if ((element.start).slice(5, 7) == thisMonth) {
            resultMonthMant.push(element);
        }

    });

    resultMonthMant.forEach(element => {
        if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
            deadLineMan++;
            
        }
    })
    localStorage.deadLineMan = deadLineMan;
});
eventsDataExp.on('value', function (datos) {
    let dataResult = datos.val();
    lastEvent = datos.val().length;

    localStorage.lastEvent = lastEvent; // guardando 
    dataResult.forEach(element => {
        if ((element.start).slice(5, 7) == thisMonth) {
            resultMonthExp.push(element);
        }

    });

    resultMonthExp.forEach(element => {
        if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
            deadLineExp++;
           
        }
    })
    localStorage.deadLineExp = deadLineExp;
})




security.on('click', function () {
    localStorage.area = 'Seguridad';
    //Verificar si hay tareas fuera de fechas al cargar la página Seguridad
    eventsDataSec.on('value', function (datos) {
        let dataResult = datos.val();
        lastEvent = datos.val().length;

        localStorage.lastEvent = lastEvent; // guardando 
        dataResult.forEach(element => {
            if ((element.start).slice(5, 7) == thisMonth) {
                resultMonthSecu.push(element);
            }

        });

        resultMonthSecu.forEach(element => {
            if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
                deadLineSecu++;

            }
        })
        localStorage.deadLineSecu = deadLineSecu;
    })
    $(location).attr('href', 'registro.html');
})

mantenimiento.on('click', function () {
    localStorage.area = 'Mantenimiento';
    //Verificar si hay tareas fuera de fechas al cargar la página Mantenimiento
    eventsDataMant.on('value', function (datos) {
        let dataResult = datos.val();
        lastEvent = datos.val().length;

        localStorage.lastEvent = lastEvent; // guardando 
        dataResult.forEach(element => {
            if ((element.start).slice(5, 7) == thisMonth) {
                resultMonthMant.push(element);
            }

        });

        resultMonthMant.forEach(element => {
            if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
                deadLineMan++;

            }
        })
        localStorage.deadLineMan = deadLineMan;
    })
    $(location).attr('href', 'registro.html');
})

experiencia.on('click', function () {
    localStorage.area = 'Experiencia';
    //Verificar si hay tareas fuera de fechas al cargar la página Experiencia
    eventsDataExp.on('value', function (datos) {
        let dataResult = datos.val();
        lastEvent = datos.val().length;

        localStorage.lastEvent = lastEvent; // guardando 
        dataResult.forEach(element => {
            if ((element.start).slice(5, 7) == thisMonth) {
                resultMonthExp.push(element);
            }

        });

        resultMonthExp.forEach(element => {
            if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
                deadLineExp++;

            }
        })
        localStorage.deadLineExp = deadLineExp;
    })
    $(location).attr('href', 'registro.html');
})

registerSeg.on('click', function () {
    localStorage.area = 'Seguridad';
    //Verificar si hay tareas fuera de fechas al cargar la página Seguridad
    eventsDataSec.on('value', function (datos) {
        let dataResult = datos.val();
        lastEvent = datos.val().length;

        localStorage.lastEvent = lastEvent; // guardando 
        dataResult.forEach(element => {
            if ((element.start).slice(5, 7) == thisMonth) {
                resultMonthSecu.push(element);
            }

        });

        resultMonthSecu.forEach(element => {
            if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
                deadLineSecu++;

            }
        })
        localStorage.deadLineSecu = deadLineSecu;
        $(location).attr('href', 'registro.html');
    })
    

})

registerMan.on('click', function () {
    localStorage.area = 'Mantenimiento';
    //Verificar si hay tareas fuera de fechas al cargar la página Mantenimiento
    eventsDataMant.on('value', function (datos) {
        let dataResult = datos.val();
        lastEvent = datos.val().length;

        localStorage.lastEvent = lastEvent; // guardando 
        dataResult.forEach(element => {
            if ((element.start).slice(5, 7) == thisMonth) {
                resultMonthMant.push(element);
            }

        });

        resultMonthMant.forEach(element => {
            if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
                deadLineMan++;

            }
        })
        localStorage.deadLineMan = deadLineMan;
        $(location).attr('href', 'registro.html');
    })
   
})

registerExp.on('click', function () {
    localStorage.area = 'Experiencia';
    //Verificar si hay tareas fuera de fechas al cargar la página Experiencia
    eventsDataExp.on('value', function (datos) {
        let dataResult = datos.val();
        lastEvent = datos.val().length;

        localStorage.lastEvent = lastEvent; // guardando 
        dataResult.forEach(element => {
            if ((element.start).slice(5, 7) == thisMonth) {
                resultMonthExp.push(element);
            }

        });

        resultMonthExp.forEach(element => {
            if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
                deadLineExp++;
               
            }
        })
        localStorage.deadLineExp = deadLineExp;
        $(location).attr('href', 'registro.html');

    })
    
})