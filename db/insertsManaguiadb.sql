-- =======================
USE manahuiadb;
-- =======================

-- PRUEBA DE REGISTRO DE LAS TABLAS

-- USUARIO
SELECT * FROM manahuiadb.usuario;

-- registro de admin
INSERT INTO usuario 
(nombre, correo, `password`, confirmpassword, telefono, tipo_usuario)
VALUES 
('Abigail Arizmendi', 'abi.ariz21@gmail.com', 'Paragu4$', 'Paragu4$', 4589231578, 1),
('Diana Fernandez', 'dianapatricia.fernandezmadrigal@gmail.com', 'Paragu4$', 'Paragu4$', 5589551578,1),
('Synthia Bermudez', 'sinthya.cecilia@gmail.com', 'Paragu4$', 'Paragu4$', 7589551579,1),
('Rosario Orozco', 'chayorozco.2@gmail.com', 'Paragu4$', 'Paragu4$', 6589551578, 1),
('José Mendoza', 'jospmdz"gmail.com', 'Paragu4$', 'Paragu4$', 3589551578, 1);

-- registro de viajera
INSERT INTO usuario 
(nombre, correo, `password`, confirmpassword, telefono, tipo_usuario)
VALUES 
('Amy Hernandez', 'amy@gmail.com', 'Paragu4$', 'Paragu4$', 4489231578, 0);

-- ========================================================================================================

-- LOGIN
SELECT * FROM manahuiadb.login;

-- logins de admins
INSERT INTO login 
(correo, `password`, id_usuario, tipo_usuario)
VALUES
('abi.ariz21@gmail.com', 'Paragu4$', 1, 1),
('dianapatricia.fernandezmadrigal@gmail.com', 'Paragu4$', 2, 1),
('sinthya.cecilia@gmail.com','Paragu4$', 3, 1),
('chayorozco.2@gmail.com','Paragu4$', 4, 1),
('jospmdz"gmail.com', 'Paragu4$', 5, 1);

-- logins de viajero
INSERT INTO login 
(correo, `password`, id_usuario, tipo_usuario)
VALUES
('amy@gmail.com', 'Paragu4$', 6, 0);

-- Hace una comparacion de si el correo es administrador
SELECT
    usuario.correo AS registro,login.correo AS login,
    CASE 
    WHEN usuario.tipo_usuario = 1 THEN 'Administrador' 
    ELSE 'Viajera'
    END as resultado
    FROM login
    JOIN
    usuario ON login.id_usuario = usuario.id_usuario
    Where
    login.`password` = usuario.`password`
    AND login.correo = usuario.correo;

-- validacion para verificar si esta registrado en el loguin si no esta logueado aun dira denegado
SELECT
    usuario.tipo_usuario AS Registro, login.tipo_usuario As Login,
    CASE 
    WHEN usuario.tipo_usuario =  1 THEN 'Administrador' 
    ELSE 'Viajera'
    END AS  tipo_usuario
    FROM login
    JOIN
    usuario ON login.tipo_usuario= usuario. tipo_usuario
    Where
    login.tipo_usuario=usuario.tipo_usuario
    
    UNION ALL
    
    SELECT
    usuario.correo AS RegistroAcceso,
    login.correo AS LoginAcceso,
    CASE
        WHEN login.`password` = usuario.`password` 
    AND 
        login.correo = usuario.correo
    THEN  'Aceptado'
        ELSE 'Denegado'
    END AS Acceso
    FROM login
    JOIN
    usuario ON login.id_usuario = usuario.id_usuario;

-- ========================================================================================================

-- VIAJE
SELECT * FROM manahuiadb.viaje;

INSERT INTO viaje (id_viaje, nombre_destino, fecha_inicio, fecha_final, incluye, descripcion, precio, imagenes, stock)
VALUES
(1, 'Aventura Maya en Península Yucateca', '2024-05-06', '2024-05-16', 'Alojamiento en hoteles administrados por manahuia con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el recorrido.Visitas guiadas a los principales destinos arqueológicos de la región.<br>Entradas a los sitios arqueológicos mencionados', 'Embárcate en nuestra "Exploración Natural en la Sierra Madre", un viaje de 4 días que te llevará a descubrir la belleza natural y cultural de Puerto Vallarta, San Sebastián del Oeste y Mascota, el paquete incluye alojamiento en hoteles con desayuno y cena, transporte cómodo y un guía turístico experto para una experiencia inolvidable.', 10000, 'https://res.cloudinary.com/dezqwhec1/image/upload/v1710353766/viajes/o1sacb4yrhsshyze0wo0.jpg', 20),
(2, 'Exploración Natural en la Sierra Madre', '2024-06-08', '2024-06-18', 'Alojamiento en hoteles seleccionados con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el itinerario.<br>Guía turístico experto.', 'Explora las impresionantes playas de Baja California Sur en nuestro tour de 6 días. Desde las encantadoras costas de Loreto hasta las vibrantes playas de San José del Cabo y La Paz, incluye alojamiento en hoteles con desayuno y cena, transporte cómodo y un guía turístico para asegurar una experiencia inolvidable. Reserva ahora y sumérgete en el paraíso de Baja California Sur!', 8560, 'https://res.cloudinary.com/dezqwhec1/image/upload/v1709738380/viajes/cktizz2djqxlbpmy0iat.jpg', 10),
(3, 'Playas en Baja California Sur', '2024-06-10', '2024-06-20', 'Alojamiento en hoteles seleccionados con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el itinerario.<br>Guía turístico experto.', 'Explora las impresionantes playas de Baja California Sur en nuestro tour de 6 días. Desde las encantadoras costas de Loreto hasta las vibrantes playas de San José del Cabo y La Paz, incluye alojamiento en hoteles con desayuno y cena, transporte cómodo y un guía turístico para asegurar una experiencia inolvidable. Reserva ahora y sumérgete en el paraíso de Baja California Sur!', 11000, 'https://res.cloudinary.com/dezqwhec1/image/upload/v1709683260/viajes/mu2h2kdnfcpyb6ynxofp.jpg', 10),
(4, 'Ruta del Café y Naturaleza en Chiapas', '2024-07-12', '2024-07-22', 'Alojamiento en hoteles con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el recorrido.<br>Visitas guiadas a fincas de café para aprender sobre el proceso de producción.<br>Entradas a parques naturales para explorar la exuberante biodiversidad de Chiapas.', 'Descubre la magia de Chiapas en nuestra Ruta del Café y Naturaleza. Este paquete de 7 días te sumerge en la cultura del café, con visitas a fincas para conocer su proceso de producción, y te lleva a explorar la naturaleza de la región con entradas a parques naturales. Incluye alojamiento en hoteles con desayuno y cena!', 12000, 'https://res.cloudinary.com/dezqwhec1/image/upload/v1709713040/viajes/llqzq59t1bpgcadux4zn.jpg', 10),
(5, 'Aventura Marina en la Costa Maya', '2024-08-14', '2024-08-24', 'Alojamiento en hoteles con desayuno incluido (8:00am a 10:00am).<br>Transporte durante todo el recorrido.<br>Diversas actividades acuáticas.<br>Guía turístico experto.', 'Embárcate en nuestra Aventura Marina en la Costa Maya, durante 4 días, explorarás Mahahual,Bacalar y Tulum, disfrutando de actividades acuáticas emocionantes, alojamiento en hoteles condesayuno incluido, transporte cómodo y la guía de un experto turístico. Una experiencia inolvidable en las cristalinas aguas de la Costa Maya te espera!', 9000, 'https://res.cloudinary.com/dezqwhec1/image/upload/v1709681353/viajes/ntyanp8ksdfp9ixxz88p.jpg', 15);

-- consulta de viajes en usuarios
SELECT u.nombre, v.id_viaje, v.nombre_destino,v.fecha_inicio, v.fecha_final
FROM usuario AS u
JOIN viaje AS v ON u.id_usuario = v.id_viaje;

-- ========================================================================================================

-- CONTACTO
SELECT * FROM manahuiadb.contacto;

-- sin USUARIO
INSERT INTO contacto 
(nombre, correo, telefono, mensaje)
VALUES
('Maria Luisa Villa', 'mari@gmail.com', 5467893425, 'tengo duda del viaje para Cancun me podrian proporcionar mas informacion por mi correo'),
('Fernanda Ramirez', 'fer@gmail.com', 5467893425, 'tengo duda del viaje para Baja California Sur me podrian proporcionar mas informacion por mi correo'),
('Daniela Gomez', 'dani@gmail.com', 5467893425, 'tengo duda del viaje para Monterrey me podrian proporcionar mas informacion por mi correo'),
('Alondra Cervantes', 'alo@gmail.com', 5467893425, 'tengo duda del viaje para CDMX me podrian proporcionar mas informacion por mi correo');

-- con USUARIO
INSERT INTO contacto 
(nombre, correo, telefono, mensaje, id_usuario)
VALUES
('Amy Hernandez', 'amy@gmail.com', 4489231578, 'tengo duda del viaje para Rusia me podrian proporcionar mas informacion por mi correo', 6);

-- ========================================================================================================

-- PEDIDO
SELECT * FROM manahuiadb.pedido;

INSERT INTO pedido (fecha_creacion, id_viaje, cantidad_personas, total, id_usuario)
VALUES
('2024-03-16', 1, 1, 10000, 1),
('2024-03-16', 2, 1, 8560, 2),
('2024-03-16', 3, 1, 11000, 3),
('2024-03-16', 4, 1, 12000, 4),
('2024-03-16', 5, 1, 9000, 5);




