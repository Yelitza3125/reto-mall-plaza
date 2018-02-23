const user = $('#user');
const password = $('#password');

const boxAdd = $('#box-add');
var validateMail = false;
var validatePassword = false;
var btnLogin = $('#btn-login');


function validateUser() {
  let username = user.val();
  let passwordUser = password.val();
  if (username === 'mpbperu@gmail.com' && passwordUser === 'bellavista123') {
    btnLogin.attr('disabled', false);
  } else {
    btnLogin.attr('disabled', 'disabled');
  }
}

user.on('keyup', function(event) {
  if (user.val() === 'mpbperu@gmail.com') {
    validateMail = true;

    validateUser();
  } else {
    validateMail = false;
    inactiveUser();
  }
});

password.on('keyup', function(event) {
  if (password.val() === 'bellavista123') {
    validatePassword = true;

    validateUser();
  } else {
    validatePassword = false;
    inactiveUser();
  }
});


function validateUser() {
  if (validateMail && validatePassword) {
    btnLogin.attr('disabled', false);
  }
}

function inactiveUser() {
  btnLogin.attr('disabled', 'disabled');
}

btnLogin.on('click', function() {
  window.location.href = 'views/area.html';
});

