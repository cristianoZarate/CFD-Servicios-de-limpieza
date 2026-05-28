-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2026 a las 10:35:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cfd_servicios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_servicio`
--

CREATE TABLE `categorias_servicio` (
  `id` int(11) NOT NULL,
  `activo` bit(1) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_servicio`
--

INSERT INTO `categorias_servicio` (`id`, `activo`, `descripcion`, `nombre`) VALUES
(1, NULL, NULL, 'Residencial'),
(2, NULL, NULL, 'Altura'),
(3, NULL, NULL, 'Industrial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad`
--

CREATE TABLE `disponibilidad` (
  `id` int(11) NOT NULL,
  `cupos_ocupados` int(11) DEFAULT NULL,
  `cupos_totales` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_fin` time(6) DEFAULT NULL,
  `hora_inicio` time(6) DEFAULT NULL,
  `servicio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disponibilidad`
--

INSERT INTO `disponibilidad` (`id`, `cupos_ocupados`, `cupos_totales`, `fecha`, `hora_fin`, `hora_inicio`, `servicio_id`) VALUES
(1, 0, 1, '2026-05-27', '12:00:00.000000', '09:00:00.000000', 1),
(2, 0, 1, '2026-05-27', '16:00:00.000000', '13:00:00.000000', 1),
(3, 0, 1, '2026-05-27', '20:00:00.000000', '17:00:00.000000', 1),
(4, 0, 1, '2026-05-30', '12:00:00.000000', '09:00:00.000000', 1),
(5, 1, 1, '2026-05-30', '16:00:00.000000', '13:00:00.000000', 1),
(6, 1, 1, '2026-05-30', '20:00:00.000000', '17:00:00.000000', 1),
(7, 0, 1, '2026-06-01', '12:00:00.000000', '09:00:00.000000', 1),
(8, 0, 1, '2026-06-01', '16:00:00.000000', '13:00:00.000000', 1),
(9, 0, 1, '2026-06-01', '20:00:00.000000', '17:00:00.000000', 1),
(10, 0, 1, '2026-05-28', '11:00:00.000000', '09:00:00.000000', 1),
(11, 0, 1, '2026-05-28', '12:00:00.000000', '10:00:00.000000', 1),
(12, 0, 1, '2026-05-28', '13:00:00.000000', '11:00:00.000000', 1),
(13, 0, 1, '2026-05-28', '14:00:00.000000', '12:00:00.000000', 1),
(14, 0, 1, '2026-05-28', '15:00:00.000000', '13:00:00.000000', 1),
(15, 0, 1, '2026-05-28', '16:00:00.000000', '14:00:00.000000', 1),
(16, 0, 1, '2026-05-28', '17:00:00.000000', '15:00:00.000000', 1),
(17, 0, 1, '2026-05-28', '18:00:00.000000', '16:00:00.000000', 1),
(18, 0, 1, '2026-05-28', '19:00:00.000000', '17:00:00.000000', 1),
(19, 0, 1, '2026-05-28', '20:00:00.000000', '18:00:00.000000', 1),
(20, 0, 1, '2026-05-28', '21:00:00.000000', '19:00:00.000000', 1),
(21, 0, 1, '2026-05-28', '22:00:00.000000', '20:00:00.000000', 1),
(22, 1, 1, '2026-05-29', '11:00:00.000000', '09:00:00.000000', 1),
(23, 0, 1, '2026-05-29', '12:00:00.000000', '10:00:00.000000', 1),
(24, 0, 1, '2026-05-29', '13:00:00.000000', '11:00:00.000000', 1),
(25, 0, 1, '2026-05-29', '14:00:00.000000', '12:00:00.000000', 1),
(26, 0, 1, '2026-05-29', '15:00:00.000000', '13:00:00.000000', 1),
(27, 0, 1, '2026-05-29', '16:00:00.000000', '14:00:00.000000', 1),
(28, 0, 1, '2026-05-29', '17:00:00.000000', '15:00:00.000000', 1),
(29, 0, 1, '2026-05-29', '18:00:00.000000', '16:00:00.000000', 1),
(30, 0, 1, '2026-05-29', '19:00:00.000000', '17:00:00.000000', 1),
(31, 0, 1, '2026-05-29', '20:00:00.000000', '18:00:00.000000', 1),
(32, 0, 1, '2026-05-29', '21:00:00.000000', '19:00:00.000000', 1),
(33, 0, 1, '2026-05-29', '22:00:00.000000', '20:00:00.000000', 1),
(34, 0, 1, '2026-05-31', '11:00:00.000000', '09:00:00.000000', 1),
(35, 0, 1, '2026-05-31', '12:00:00.000000', '10:00:00.000000', 1),
(36, 0, 1, '2026-05-31', '13:00:00.000000', '11:00:00.000000', 1),
(37, 0, 1, '2026-05-31', '14:00:00.000000', '12:00:00.000000', 1),
(38, 0, 1, '2026-05-31', '15:00:00.000000', '13:00:00.000000', 1),
(39, 0, 1, '2026-05-31', '16:00:00.000000', '14:00:00.000000', 1),
(40, 0, 1, '2026-05-31', '17:00:00.000000', '15:00:00.000000', 1),
(41, 0, 1, '2026-05-31', '18:00:00.000000', '16:00:00.000000', 1),
(42, 0, 1, '2026-05-31', '19:00:00.000000', '17:00:00.000000', 1),
(43, 0, 1, '2026-05-31', '20:00:00.000000', '18:00:00.000000', 1),
(44, 0, 1, '2026-05-31', '21:00:00.000000', '19:00:00.000000', 1),
(45, 0, 1, '2026-05-31', '22:00:00.000000', '20:00:00.000000', 1),
(46, 0, 1, '2026-05-30', '11:00:00.000000', '09:00:00.000000', 2),
(47, 0, 1, '2026-05-30', '12:00:00.000000', '10:00:00.000000', 2),
(48, 0, 1, '2026-05-30', '13:00:00.000000', '11:00:00.000000', 2),
(49, 0, 1, '2026-05-30', '14:00:00.000000', '12:00:00.000000', 2),
(50, 0, 1, '2026-05-30', '15:00:00.000000', '13:00:00.000000', 2),
(51, 0, 1, '2026-05-30', '16:00:00.000000', '14:00:00.000000', 2),
(52, 0, 1, '2026-05-30', '17:00:00.000000', '15:00:00.000000', 2),
(53, 0, 1, '2026-05-30', '18:00:00.000000', '16:00:00.000000', 2),
(54, 1, 1, '2026-05-30', '19:00:00.000000', '17:00:00.000000', 2),
(55, 0, 1, '2026-05-30', '20:00:00.000000', '18:00:00.000000', 2),
(56, 0, 1, '2026-05-30', '21:00:00.000000', '19:00:00.000000', 2),
(57, 0, 1, '2026-05-30', '22:00:00.000000', '20:00:00.000000', 2),
(58, 0, 1, '2026-05-30', '11:00:00.000000', '09:00:00.000000', 3),
(59, 0, 1, '2026-05-30', '12:00:00.000000', '10:00:00.000000', 3),
(60, 0, 1, '2026-05-30', '13:00:00.000000', '11:00:00.000000', 3),
(61, 0, 1, '2026-05-30', '14:00:00.000000', '12:00:00.000000', 3),
(62, 0, 1, '2026-05-30', '15:00:00.000000', '13:00:00.000000', 3),
(63, 0, 1, '2026-05-30', '16:00:00.000000', '14:00:00.000000', 3),
(64, 0, 1, '2026-05-30', '17:00:00.000000', '15:00:00.000000', 3),
(65, 0, 1, '2026-05-30', '18:00:00.000000', '16:00:00.000000', 3),
(66, 0, 1, '2026-05-30', '19:00:00.000000', '17:00:00.000000', 3),
(67, 0, 1, '2026-05-30', '20:00:00.000000', '18:00:00.000000', 3),
(68, 0, 1, '2026-05-30', '21:00:00.000000', '19:00:00.000000', 3),
(69, 0, 1, '2026-05-30', '22:00:00.000000', '20:00:00.000000', 3),
(70, 0, 1, '2026-05-29', '11:00:00.000000', '09:00:00.000000', 2),
(71, 0, 1, '2026-05-29', '12:00:00.000000', '10:00:00.000000', 2),
(72, 0, 1, '2026-05-29', '13:00:00.000000', '11:00:00.000000', 2),
(73, 0, 1, '2026-05-29', '14:00:00.000000', '12:00:00.000000', 2),
(74, 0, 1, '2026-05-29', '15:00:00.000000', '13:00:00.000000', 2),
(75, 0, 1, '2026-05-29', '16:00:00.000000', '14:00:00.000000', 2),
(76, 0, 1, '2026-05-29', '17:00:00.000000', '15:00:00.000000', 2),
(77, 0, 1, '2026-05-29', '18:00:00.000000', '16:00:00.000000', 2),
(78, 0, 1, '2026-05-29', '19:00:00.000000', '17:00:00.000000', 2),
(79, 0, 1, '2026-05-29', '20:00:00.000000', '18:00:00.000000', 2),
(80, 0, 1, '2026-05-29', '21:00:00.000000', '19:00:00.000000', 2),
(81, 0, 1, '2026-05-29', '22:00:00.000000', '20:00:00.000000', 2),
(82, 0, 3, '2026-05-28', '11:00:00.000000', '09:00:00.000000', 2),
(83, 0, 3, '2026-05-28', '12:00:00.000000', '10:00:00.000000', 2),
(84, 0, 3, '2026-05-28', '13:00:00.000000', '11:00:00.000000', 2),
(85, 0, 3, '2026-05-28', '14:00:00.000000', '12:00:00.000000', 2),
(86, 0, 3, '2026-05-28', '15:00:00.000000', '13:00:00.000000', 2),
(87, 0, 3, '2026-05-28', '16:00:00.000000', '14:00:00.000000', 2),
(88, 0, 3, '2026-05-28', '17:00:00.000000', '15:00:00.000000', 2),
(89, 0, 3, '2026-05-28', '18:00:00.000000', '16:00:00.000000', 2),
(90, 0, 3, '2026-05-28', '19:00:00.000000', '17:00:00.000000', 2),
(91, 0, 3, '2026-05-28', '20:00:00.000000', '18:00:00.000000', 2),
(92, 0, 3, '2026-05-28', '21:00:00.000000', '19:00:00.000000', 2),
(93, 0, 3, '2026-05-28', '22:00:00.000000', '20:00:00.000000', 2),
(94, 0, 3, '2026-05-31', '11:00:00.000000', '09:00:00.000000', 2),
(95, 0, 3, '2026-05-31', '12:00:00.000000', '10:00:00.000000', 2),
(96, 0, 3, '2026-05-31', '13:00:00.000000', '11:00:00.000000', 2),
(97, 0, 3, '2026-05-31', '14:00:00.000000', '12:00:00.000000', 2),
(98, 0, 3, '2026-05-31', '15:00:00.000000', '13:00:00.000000', 2),
(99, 0, 3, '2026-05-31', '16:00:00.000000', '14:00:00.000000', 2),
(100, 0, 3, '2026-05-31', '17:00:00.000000', '15:00:00.000000', 2),
(101, 0, 3, '2026-05-31', '18:00:00.000000', '16:00:00.000000', 2),
(102, 0, 3, '2026-05-31', '19:00:00.000000', '17:00:00.000000', 2),
(103, 0, 3, '2026-05-31', '20:00:00.000000', '18:00:00.000000', 2),
(104, 0, 3, '2026-05-31', '21:00:00.000000', '19:00:00.000000', 2),
(105, 0, 3, '2026-05-31', '22:00:00.000000', '20:00:00.000000', 2),
(106, 0, 3, '2026-05-31', '11:00:00.000000', '09:00:00.000000', 3),
(107, 0, 3, '2026-05-31', '12:00:00.000000', '10:00:00.000000', 3),
(108, 0, 3, '2026-05-31', '13:00:00.000000', '11:00:00.000000', 3),
(109, 0, 3, '2026-05-31', '14:00:00.000000', '12:00:00.000000', 3),
(110, 0, 3, '2026-05-31', '15:00:00.000000', '13:00:00.000000', 3),
(111, 0, 3, '2026-05-31', '16:00:00.000000', '14:00:00.000000', 3),
(112, 0, 3, '2026-05-31', '17:00:00.000000', '15:00:00.000000', 3),
(113, 0, 3, '2026-05-31', '18:00:00.000000', '16:00:00.000000', 3),
(114, 0, 3, '2026-05-31', '19:00:00.000000', '17:00:00.000000', 3),
(115, 0, 3, '2026-05-31', '20:00:00.000000', '18:00:00.000000', 3),
(116, 0, 3, '2026-05-31', '21:00:00.000000', '19:00:00.000000', 3),
(117, 0, 3, '2026-05-31', '22:00:00.000000', '20:00:00.000000', 3),
(118, 0, 3, '2026-05-28', '11:00:00.000000', '09:00:00.000000', 3),
(119, 0, 3, '2026-05-28', '12:00:00.000000', '10:00:00.000000', 3),
(120, 0, 3, '2026-05-28', '13:00:00.000000', '11:00:00.000000', 3),
(121, 0, 3, '2026-05-28', '14:00:00.000000', '12:00:00.000000', 3),
(122, 0, 3, '2026-05-28', '15:00:00.000000', '13:00:00.000000', 3),
(123, 0, 3, '2026-05-28', '16:00:00.000000', '14:00:00.000000', 3),
(124, 0, 3, '2026-05-28', '17:00:00.000000', '15:00:00.000000', 3),
(125, 0, 3, '2026-05-28', '18:00:00.000000', '16:00:00.000000', 3),
(126, 0, 3, '2026-05-28', '19:00:00.000000', '17:00:00.000000', 3),
(127, 0, 3, '2026-05-28', '20:00:00.000000', '18:00:00.000000', 3),
(128, 0, 3, '2026-05-28', '21:00:00.000000', '19:00:00.000000', 3),
(129, 0, 3, '2026-05-28', '22:00:00.000000', '20:00:00.000000', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `disponibilidad_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `servicio_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `created_at`, `estado`, `disponibilidad_id`, `usuario_id`, `servicio_id`) VALUES
(14, '2026-05-28 06:11:21.000000', 'CANCELADA', 55, 15, 2),
(15, '2026-05-28 06:11:42.000000', 'CANCELADA', 69, 15, 3),
(16, '2026-05-28 06:11:55.000000', 'CANCELADA', 4, 15, 1),
(17, '2026-05-28 06:12:24.000000', 'CANCELADA', 57, 15, 2),
(18, '2026-05-28 07:08:45.000000', 'CONFIRMADA', 22, 15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `activo` bit(1) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `duracion_min` int(11) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `activo`, `descripcion`, `duracion_min`, `imagen_url`, `nombre`, `precio`, `categoria_id`) VALUES
(1, NULL, 'Limpieza estándar para casas y departamentos.', NULL, NULL, 'Aseo Residencial Regular', NULL, 1),
(2, NULL, 'Servicio especializado con arneses y seguridad.', NULL, NULL, 'Limpieza de Vidrios en Altura', NULL, 2),
(3, NULL, 'Limpieza profunda y eliminación de patógenos en empresas.', NULL, NULL, 'Sanitización / Aseo Industrial', NULL, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellido`, `correo`, `telefono`, `direccion`, `created_at`, `estado`, `nombre`, `password_hash`, `rol`) VALUES
(14, NULL, 'fzarate@cfdservicios.cl', '944632207', 'las azaleas 639', '2026-05-28 04:18:29.000000', b'1', 'Fernando Zarate', '$2a$10$jkuRe92BX1glBpL7bAofUuoKpkkK18YqnNfPjMTiHtu.LryNMpgAG', NULL),
(15, NULL, 'gavendano@gmail.com', '988765432', 'lasmasmaks 456', '2026-05-28 04:54:03.000000', b'1', 'gabriel avendaño', '$2a$10$jNaOz9kxkxld6xP/jxdptOte2gI/hzfc15Nq7/.xn4YLfZwzSr.m2', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias_servicio`
--
ALTER TABLE `categorias_servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `disponibilidad`
--
ALTER TABLE `disponibilidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKd77x51kr0nolfiy9n3nwds7v3` (`servicio_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5i68u9qmmiqgj068iuatfcrvq` (`disponibilidad_id`),
  ADD KEY `FKcfh7qcr7oxomqk5hhbxdg2m7p` (`usuario_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKiirjxjuh8jdf3oug6be6w3mhr` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKcdmw5hxlfj78uf4997i3qyyw5` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_servicio`
--
ALTER TABLE `categorias_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `disponibilidad`
--
ALTER TABLE `disponibilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `disponibilidad`
--
ALTER TABLE `disponibilidad`
  ADD CONSTRAINT `FKd77x51kr0nolfiy9n3nwds7v3` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK5i68u9qmmiqgj068iuatfcrvq` FOREIGN KEY (`disponibilidad_id`) REFERENCES `disponibilidad` (`id`),
  ADD CONSTRAINT `FKcfh7qcr7oxomqk5hhbxdg2m7p` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `FKiirjxjuh8jdf3oug6be6w3mhr` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_servicio` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
