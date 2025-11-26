Archivos semillas para cargar por default valores en tablas que ya poseen registros predefinidos.
Al correr por primera vez el contenedor con docker compose up --build, se crearan las tablas y sus registros iniciales
Entonces al querer volver a correr luego, sera necesario antes eliminar estos registros semillas con docker compose down -v
Ya que sino se intentaran crear nuevamente, se pisaran los ID y tirará error