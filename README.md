# Biblioteca Campus

## Descripción

se desarrollo la prueba del filtro.

## Funcionamiento

## Requisitos previos

- Node.js instalado en tu máquina.

## Instalación

1. Clona este repositorio o descarga los archivos en tu máquina local.
2. Abre una terminal en el directorio raíz de la aplicación.
3. Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```

## Configuración

1. Asegurarse de tener creada la base de datos con sus respectivos registros. en la ruta **db/db_camper_impact** se encuentran los comandos para la creacion de la base de datos y la inserción de algunos registros de prueba.
2. Crea un archivo `.env` en el directorio raíz de la aplicación, teniendo como base el archivo `.env.example`
3. Dentro del archivo `.env` , define las siguientes variables de entorno:

```
MY_CONFIG={"hostname":"", "port":}
MY_CONNECT={"host":"", "user":"", "password":"", "database":"", "port":3306}
JWT_PRIVATE_KEY = ""
```

1. abrir 2 terminales, en una correr el comando `npm run dev` y en la otra el comando `npm run tsc`, para que todo funcione a la perfeccion.

## Uso

### Importante

Antes de empezar a utilizar las diferentes rutas y endPoints debemosos generar un token de acceso, que debemos colocar en nuestro **header/Autorization**, este token tiene un limite de **4h**, en ese rango de tiempo podremos acceder a las rutas y endPoints de nuestra Api.

- para generar nuestro token, debemos acceder a nuestra extencion de visual estudio llamada **Thunder-Client**, colocar la siguiente ruta:
- `GET: http://"hostname":"port"/token/`

y en body, lo siguiente:

```
{
    "tel": 325412451,
    "password": "Villafrades"
}
```

## ENDPOINTS

### GET

 GET: `http://"hostname":"port"/autores/`

este endpoint nos permite btener todos los autores y su nacionalidad.

 

GET: `http://"hostname":"port"/categorias/`

este endpoint nos permite Listar todas las categorías disponibles.



GET: `http://"hostname":"port"/editoriales/`

Mostrar todas las editoriales y sus direcciones



GET: `http://"hostname":"port"/estadoLibro/`

 Obtener los estados de los libros y sus descripciones.



GET: `http://"hostname":"port"/libros/`

Mostrar todos los libros con su título, autor y editorial



GET: `http://"hostname":"port"/prestamos/`

Listar los préstamos realizados con fecha de préstamo, fecha de devolución y estado. 



GET: `http://"hostname":"port"/reservas/`

Obtener todas las reservas realizadas con su fecha de reserva y estado. 



GET: `http://"hostname":"port"/libros/disponibles`

Mostrar los libros disponibles para préstamo con su título y autor.



GET: `http://"hostname":"port"/libros/prestados`

Obtener los libros prestados y su fecha de devolución



GET: `http://"hostname":"port"/usuarios/`

Listar los usuarios y sus correos electrónicos.



GET: `http://"hostname":"port"/libros/autor/"nombre"`

Mostrar los libros escritos por un autor específico (ejemplo: Gabriel)



GET: `http://"hostname":"port"/libros/categoria/"id"`

Obtener los libros de cierta categoría (ejemplo: 1). 



GET: `http://"hostname":"port"/prestamos/usuario/"nombre"`

Listar los préstamos realizados por un usuario (ejemplo: Juan ).



GET: `http://"hostname":"port"/libros/paginas`

Mostrar los libros con más de 500 páginas y su autor.



### IMPORTANTE

no se alcanzo a realizar el DTO, no me sentia bien mentalmente :)



## Contacto

Nombre: Carlos Villafrades Pinilla

Email: [cavillafrades@gmail.com](mailto:cavillafrades@gmail.com)