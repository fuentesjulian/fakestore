# Fake Store
Este repo contiene un fake store que permite la creación, edición y eliminación de productos desde la vista admin.
También tiene la funcionalidad de almacenar carts con los pedidos generados.
En una variable **.env** se puede settear el método de persistencia en memoria:

 - **json** permite almacenar en un archivo JSON
 - **firebase** permite almacenar en la base de datos de Firebase
 - **mongodb** permite almacenar localmente en una base de datos de MongoDB (Mongo tiene que estar instalado para estos fines).

El servidor está armado en un formato de capas, para separar el servidor, las rutas, los controladores, los servicios y el método de persistencia de los datos. Esto permite una fácil escalabilidad y separación de funciones.