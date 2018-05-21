const security = $('#seguridad');
const mantenimiento = $('#mantenimiento');
const experiencia = $('#experiencia');

var config = {
    apiKey: 'AIzaSyBS0K0yMCQO1H3DAkx1jojSpH3spvVMapM',
    authDomain: 'mall-plaza-12cf6.firebaseapp.com',
    databaseURL: 'https://mall-plaza-12cf6.firebaseio.com',
    projectId: 'mall-plaza-12cf6',
    storageBucket: 'mall-plaza-12cf6.appspot.com',
    messagingSenderId: '23083249729'
};
firebase.initializeApp(config);

let today = new Date();
let thisMonth = today.getMonth() + 1;
let formatDay = new Date(today).toISOString().substr(0, 10);
let database = firebase.database();
let eventsDataSec = database.ref('Bellavista/2018/Seguridad');
let eventsDataMant = database.ref('Bellavista/2018/Mantenimiento');
let eventsDataExp = database.ref('Bellavista/2018/Experiencia');
let resultMonthMant = [];
let resultMonthExp = [];
let resultMonthSecu = [];
let deadLineMant = 0;
let deadLineExp = 0;
let deadLineSecu = 0;





//Verificar si hay tareas fuera de fechas al cargar la página Experiencia
eventsDataExp.on('value', function (datos) {
    let dataResult = datos.val();

    dataResult.forEach(element => {
        if ((element.start).slice(5, 7) == thisMonth) {
            resultMonthExp.push(element);
        }

    });

    resultMonthExp.forEach(element => {
        if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
            deadLineSecu++;

        }
    })
    localStorage.deadLineSecu = deadLineSecu;
})


//Verificar si hay tareas fuera de fechas al cargar la página Mantenimiento
eventsDataMant.on('value', function (datos) {
    let dataResult = datos.val();

    dataResult.forEach(element => {
        if ((element.start).slice(5, 7) == thisMonth) {
            resultMonthMant.push(element);
        }

    });

    resultMonthMant.forEach(element => {
        if ((element.start == formatDay && element.state < 4) || (element.start == formatDay && element.state == 7) || (element.start < formatDay && element.state < 4) || (element.start < formatDay && element.state == 7)) {
            deadLineMant++;

        }
    })
    localStorage.deadLineMant = deadLineMant;
})



//Verificar si hay tareas fuera de fechas al cargar la página Seguridad
eventsDataSec.on('value', function (datos) {
    let dataResult = datos.val();

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





security.on('click', function () {
    localStorage.area = 'Seguridad';

})

mantenimiento.on('click', function () {
    localStorage.area = 'Mantenimiento';

})

experiencia.on('click', function () {
    localStorage.area = 'Experiencia';


})