# Plataforma de gestión de proyectos del Centro Comercial Mall Plaza.

La plataforma de gestión de proyectos del área de Mantenimiento del Centro Comercial Mall Plaza Bellavista, permite mantener un seguimiento de los proyectos y tareas pendientes a través de un sistema de notificaciones por correo electrónico. 

![Plataforma Mall Plaza](https://user-images.githubusercontent.com/32287220/36600572-a766f3d0-1880-11e8-890a-84a575c655b1.png)


##  Equipo de trabajo:

+ Rodriguez, Lidia
+ Centeno, Carla
+ Chimioque, Andrea
+ Mamani Flores,Gabriela
+ Cisneros Torre, Yelitza

## Descripción del reto:

Gestionar el plan anual de mantenimiento del centro comercial Mall Plaza Bellavista, implementando la información del excel de manera efectiva. Con el fin de crear un sistema práctico y fácil de usar. 

## Objetivo:

Implementar una plataforma que permita al Jefe de Mantenimiento crear proyectos y recibir notificaciones de las tareas a realizar.

## Desarrollo:

- Para la resolución del reto seguimos las etapas de DCU (Diseño Centrado en el Usuario) y las herramientas de Design Thinking. 

### Etapa DCU (Diseño Centrado en el usuario):

### A. Descubrimiento:

**Actividades**

**1.- Entrevista al cliente**

A través de una reunión con Briana encargada del área de Satisfacción del Cliente, obtuvimos los requerimientos y las dificultades que tiene la empresa con el producto actual. 

**2.- Benchmarking**

Se identificaron plataformas online que ofrecen servicios de creación y seguimiento de tareas para empresas. Las principales que se encontraron fueron:

#### Trello:
Permite organizar las tareas en tableros verticales. Las tareas terminadas se pueden archivar para dejar visible sólo lo más importante. Es posible colocar etiquetas o mover las tarjetas a otro tablero para reorganizarlas.

#### Microsoft Project

Se integra con otras aplicaciones de Microsoft y servicios en la nube. Ofrece variedad de plantillas para personalizar cada proyecto en el que estás trabajando, se pueden crear informes y ofrece conversaciones en tiempo real.

#### Asana 
 Mantiene las conversaciones y tareas en un solo lugar. Asana se integra con otras aplicaciones, permite añadir archivos de Dropbox, Box y Google Drive, permite realizar búsquedas y establecer tiempos para cada tarea.

#### Basecamp

Ayuda a establecer diferentes roles, responsabilidades y objetivos para lograr un objetivo común entre tu equipo de trabajo. Tiene un período de prueba gratuito de 60 días.


### B. Síntesis y definición

**Actividades**

**1.- Definición del problema: Diagrama de afinidad y Lluvia de ideas**

Mediante el diagrama de afinidad se identifió diferentes items de acuerdo a los requerimientos para clasificar los problemas a resolver. Los items fueron:

- Proyectos
- Organización
- Interfaz
- Notificaciones
- Inicio de sesión

**2.- Priorización de los items encontrados**

Mediante una lluvia de ideas entre el cliente y el equipo se priorizaron los siguientes requerimientos:

- Calentario de tareas.
- Trazabilidad y seguimientos de las tareas creadas.
- Notificaciones de acuerdo al proceso de ejecución de la empresa.

![Diagrama de afinidad](public/assets/images/ideacion/ideacion-2.jpg)
![Diagrama de afinidad](public/assets/images/ideacion/ideacion-4.jpg)

**3.- Elección del problema**

La ineficiencia y falta de interactividad del excel donde se organizan los proyectos del área de mantenimiento. 

**4.- Definición del user persona**

Se difinició un user persona principal. Es Romei, el jefe de mantenimiento de Mall Plaza. 

Tiene 40 años y lleva tres años trabajando para el centro comercial. Tiene un trabajo muy demandante y cambiante. Atiende diferentes casos y emergencias. 
Debido al ritmo de trabajo que lleva, no siempre puede estar al día con las tareas pendientes de los proyectos y necesita un sistema que le notifique el vencimiento de las tareas.


### C. Prototipado

**Actividades**

**1.- Realización del Content Prototype**

- Realización del content prototype del flujo del MVP. Se intentó replicar la interacción del usuario con la plataforma de registro de proyectos y como se daría el seguimiento. 

[Content Prototyping](https://docs.google.com/document/d/1MSApPLmywamYdcQXC7fnqwvby4jKLMblIh-WRd12Uaw/edit?usp=sharing)

**Testing con el cliente**
 - No es necesario un input para calificar una tarea de prioridad alta o media.
 - Definir mejor el flujo entre la asignación de la tarea y el seguimiento.


 **2.- Paper Prototype**

 Luego del testeo del content prototype, realizó el prototipo del producto en papel definir mejor el flujo y el número de vistas.

**Inicio de sesión**
![Inicio de sesión](public/assets/images/prototipo/1.jpg)

**Filtro de áreas** 
![Filtro de área](public/assets/images/prototipo/2.jpg)

**Elección de actividad a realizar**
![Elección de tarea](public/assets/images/prototipo/3.jpg)

**Registro de datos de la nueva tarea**
![Registro de nueva tarea](public/assets/images/prototipo/4.jpg)

**Modal de confirmación de registro**
![Calendario](public/assets/images/prototipo/5.jpg)

**Calendario con los proyectos**
![Estado de tareas](public/assets/images/prototipo/6.jpg)

**Seguimiento de las tareas**
![Inicio de sesión](public/assets/images/prototipo/7.jpg)


**Testing con el grupo de trabajo**
- Cambios en los input de llenado de sección de tareas.
- Los botones de selección de actividad en un hover para reducir vistas**

Luego de una iteración y corrección de contenido, se testeo con el cliente.

**Testing con el cliente**
- Cambio en los inputs de registro de tarea. Cambiar por un input de autocompletado y uno manual.
- Cambio de texto de la vista de inicio de sesión y selección de área. 
- Sugerencia de crear una conexión entre el calendario y el seguimiento de tareas.

### D. Iteración y Síntesis:

Luego de una nueva deliberación en el equipo y corrección de errores, se decidió dar prioridad al calendario de tareas y la persistencia de data. Se inició con el maquetado, aplicando el branding de la empresa en el diseño, tipografía y colores. 

### E. Herramientas utilizadas:

- HTML5
- CSS3
- Materialize.
- Adobe Ilustrator
- Javascript.
- jQuery.
- Google Calendar API
- JSON
- AJAX
- Zapier
