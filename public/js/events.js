var config = {
  apiKey: 'AIzaSyBS0K0yMCQO1H3DAkx1jojSpH3spvVMapM',
  authDomain: 'mall-plaza-12cf6.firebaseapp.com',
  databaseURL: 'https://mall-plaza-12cf6.firebaseio.com',
  projectId: 'mall-plaza-12cf6',
  storageBucket: 'mall-plaza-12cf6.appspot.com',
  messagingSenderId: '23083249729'
};
firebase.initializeApp(config);
// Obteniendo el mes actual
let today = new Date();
let thisMonth = today.getMonth()+1;
console.log(today.getDay())

$(document).ready(function () {
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

var events = database.ref(`Bellavista/2018/${areaSelect}`);
var box = $('.box-events');
events.on('value', function (datos) {
  data = datos.val();
  order = data.sort(function (a, b) {
    return (a.state - b.state)
  })

  $.each(order, function (indice, valor) {
   
    if (parseInt((valor.start).slice(5, 7)) === thisMonth) {
      renderInfo(valor, indice);
    }


  });

  $('.btn-radio').on('change', function (e) {
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
    events.on('value', function (datos) {
      data = datos.val();
      $.each(data, function (indice, valor) {
        if (e.currentTarget.value === valor.state) {
          renderInfo(valor, indice);
        } 
        if (e.currentTarget.value == 8) {
  
          renderInfo(valor, indice);
        }
  
  
      })
    })
  })

});

// Filtro por mes y año


const month = $('#month')
month.on('change', function () {
  monthSelect = month.val();

})

const year = $('#year')
year.on('change', function () {
  yearSelect = year.val();

})

// Filtrado por mes y año
searchMonthYear.on('click', function () {
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
  box.append(template);
  if (monthSelect && yearSelect) {
    events.on('value', function (datos) {
      data = datos.val();
      order = data.sort(function (a, b) {
        return (a.state - b.state)
      })
      $.each(order, function (indice, valor) {
        if ((valor.start).slice(5, 7) === monthSelect && (valor.start).slice(0, 4) === yearSelect) {
          arrayResult.push(valor);
          renderInfo(valor, indice);
        }
        if (monthSelect == 13 && (valor.start).slice(0, 4) === yearSelect) {
          arrayResult.push(valor);
          renderInfo(valor, indice);
        }




      })
      // Filtrado por estado dentro de los resultados de mes y año
      $('.btn-radio').on('change', function (e) {

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
        $.each(arrayResult, function (indice, valor) {
          if (e.currentTarget.value === valor.state) {
            renderInfo(valor, indice);
          }
          if (e.currentTarget.value == 8) {

            renderInfo(valor, indice);
          }


        })

      })
    })
  } else {
    alert('Selecciona Ambos campos')
  }

})







// Función de tranformación de texto para estados
function nameState(value) {
  switch (value) {
    case '1':
      return 'Fuera de Fecha'
      break;
    case '2':
      return 'Cotización'
      break;
    case '3':
      return 'Orden de Compra'
      break;
    case '4':
      return 'Proceso'
      break;
    case '5':
      return 'Revisión/ HES'
      break;
    case '6':
      return 'Finalizado'
      break;
    case '7':
      return 'Programado'
      break;
    default:
      return 'Programado'
  }
}

function renderInfo(valor, indice) {
  var template =
    `<tr>
          <td>${indice+1}</td>
          <td>${valor.title}</td>
          <td>${valor.descripcion}</td>
          <td>${valor.start}</td>
          <td>${valor.end}</td>
          <td class="box-state-detail" style="background-color:${valor.color}; margin:0.5rem;">${nameState(valor.state)}</td>
      </tr>`;
  box.append(template);
}

// export to excel
function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}
