const security = $('#seguridad');
const mantenimiento = $('#mantenimiento');
const experiencia = $('#experiencia');

security.on('click',function(){
    localStorage.area = 'Seguridad';
})

mantenimiento.on('click',function(){
    localStorage.area = 'Mantenimiento';
})

experiencia.on('click',function(){
    localStorage.area = 'Experiencia';
})