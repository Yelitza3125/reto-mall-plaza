var config = {
  apiKey: 'AIzaSyAf1k6Z2g_XQhuDeg-s_FanIe5Irjsyjn8',
  authDomain: 'bdmall-9832e.firebaseapp.com',
  databaseURL: 'https://bdmall-9832e.firebaseio.com',
  projectId: 'bdmall-9832e',
  storageBucket: 'bdmall-9832e.appspot.com',
  messagingSenderId: '116516962450'
};
firebase.initializeApp(config);
// Obteniendo el mes actual
let today = new Date();
let thisMonth = today.getMonth() + 1;
let yearNow = today.getFullYear();

// obteniendo Sede
let sede = localStorage.getItem('sede');


$(document).ready(function() {
  $('select').formSelect();
});

let yearSelect = '';
let monthSelect = '';
let arrayResult = [];

const searchMonthYear = $('#search');
let areaSelect = localStorage.getItem('area') ;
const titleArea = $('#title-area');
titleArea.text(areaSelect);

var database = firebase.database();

var events = database.ref(`${sede}/${yearNow}/${areaSelect}`);
var box = $('.box-events');

events.on('value', function(datos) {
  data = datos.val();
  order = data.sort(function(a, b) {
    return (a.state - b.state);
  });

  $.each(order, function(indice, valor) {
    if (parseInt((valor.start).slice(5, 7)) == thisMonth) {
      renderInfo(valor, indice);
    }
  });
  const selectedStates = []; 
  $('.btn-radio').on('change', function(e) {
    let currentState = e.currentTarget.value;
    selectedStates.indexOf(currentState) < 0 ?
      selectedStates.push(currentState) :
      selectedStates.splice(selectedStates.indexOf(currentState), 1);
    // console.log(selectedStates)
    box.empty();
    var template =
      ` <tr>
          <th>Numero</th>
          <th>Titulo</th>
          <th>Descripción</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Estado</th>
        </tr>`;
    box.append(template);
    events.on('value', function(datos) {
      data = datos.val();
      $.each(data, function(indice, valor) {
        if (selectedStates.indexOf(valor.state) > -1) {
          renderInfo(valor, indice);
        } 
        if (e.currentTarget.value == 8) {
          renderInfo(valor, indice);
        }
      });
    });
  });
});

// Filtro por mes y año
const month = $('#month');
month.on('change', function() {
  monthSelect = month.val();
});

const year = $('#year');
year.on('change', function() {
  yearSelect = year.val();
});

// Filtrado por mes y año
searchMonthYear.on('click', function() {
  arrayResult = [];
  box.empty();
  var template =
  ` <tr>
      <th>Numero</th>
      <th>Titulo</th>
      <th>Descripción</th>
      <th>Inicio</th>
      <th>Fin</th>
      <th>Estado</th>
    </tr>`;
  // box.append(template);
  if (monthSelect && yearSelect) {
    // BD deacuerdo a año y mes
    var eventsSearch = database.ref(`${sede}/${yearSelect}/${areaSelect}`);
    eventsSearch.on('value', function(datos) {
      let data = datos.val();
      if (data) {
        box.append(template);
        let order = data.sort(function(a, b) {
          return (a.state - b.state);
        });
        $.each(order, function(indice, valor) {
          if ((valor.start).slice(5, 7) === monthSelect && (valor.start).slice(0, 4) === yearSelect) {
            arrayResult.push(valor);
            renderInfo(valor, indice);
          }
          if (monthSelect == 13 && (valor.start).slice(0, 4) === yearSelect) {
            arrayResult.push(valor);
            renderInfo(valor, indice);
          }
        });
      } else {
        console.log('No hay eventos');
        box.append('<p class="style-title">No hay eventos.</p>');
      }
     
      // Filtrado por estado dentro de los resultados de mes y año
      $('.btn-radio').on('change', function(e) {
        box.empty();
        var template =
        ` <tr>
            <th>Numero</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
          </tr>`;
        box.append(template);
        $.each(arrayResult, function(indice, valor) {
          if (e.currentTarget.value === valor.state) {
            renderInfo(valor, indice);
          }
          if (e.currentTarget.value === 8) {
            renderInfo(valor, indice);
          }
        });
      });
    });
  } else {
    // alerta seleccionar campos
    swal({
      text: 'Selecciona ambos campos.',
      type: 'warning',
      confirmButtonColor: '#e90049',
    });
  }
});

// Función de tranformación de texto para estados
function nameState(value) {
  switch (value) {
  case '1':
    return 'Fuera de Fecha';
    break;
  case '2':
    return 'Cotización';
    break;
  case '3':
    return 'Orden de Compra';
    break;
  case '4':
    return 'Proceso';
    break;
  case '5':
    return 'Revisión/ HES';
    break;
  case '6':
    return 'Finalizado';
    break;
  case '7':
    return 'Programado';
    break;
  default:
    return 'Programado';
  }
}

function renderInfo(valor, indice) {
  var template =
    `<tr>
          <td>${indice + 1}</td>
          <td>${valor.title}</td>
          <td>${valor.descripcion}</td>
          <td>${valor.start}</td>
          <td>${valor.end}</td>
          <td class="box-state-detail" style="background-color:${valor.color}; margin:0.5rem;">${nameState(valor.state)}</td>
      </tr>`;
  box.append(template);
}

// export to excel
function exportTableToExcel(tableID, filename = '') {
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename ? filename + '.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement('a');
  
  document.body.appendChild(downloadLink);
  
  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  }else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
    // Setting the file name
    downloadLink.download = filename;
      
    // triggering the function
    downloadLink.click();
  }
}
