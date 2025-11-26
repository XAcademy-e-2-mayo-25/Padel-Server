Dto´s del modulo usuarios con las estructuras esperadas de una peticion HTTP, seran utilizados en los endpoint
Contienen las formas y validaciones que deberan hacer con los datos que vengan del front, como pidio el profe separamos todos los atributos de una clase de su comportamiento.
Para esto se utilizan las clases validator y transformer para validar los datos provenientes del front antes de procesarlos.
class-validator provee decoradores para validar tipos de datos como isString, isInt, Length, isBoolean, etc
class-transformer permite castear valores antes de validarlos.
Estos dos paquetes estan activados en el main.ts con validationPipe, por ende serviran para todos los dto que esten dentro de la carpeta modules