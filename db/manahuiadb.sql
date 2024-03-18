-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema manahuiadb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema manahuiadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `manahuiadb` DEFAULT CHARACTER SET utf8 ;
USE `manahuiadb` ;

-- -----------------------------------------------------
-- Table `manahuiadb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `manahuiadb`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `confirmpassword` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `tipo_usuario` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `tipo_usuario`),
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `manahuiadb`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `manahuiadb`.`login` (
  `id_login` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `id_usuario` INT NOT NULL,
  `tipo_usuario` INT NOT NULL,
  PRIMARY KEY (`id_login`, `id_usuario`, `tipo_usuario`),
  UNIQUE INDEX `id_login_UNIQUE` (`id_login` ASC) VISIBLE,
  INDEX `fk_login_usuario1_idx` (`id_usuario` ASC, `tipo_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_login_usuario1`
    FOREIGN KEY (`id_usuario` , `tipo_usuario`)
    REFERENCES `manahuiadb`.`usuario` (`id_usuario` , `tipo_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `manahuiadb`.`viaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `manahuiadb`.`viaje` (
  `id_viaje` INT NOT NULL AUTO_INCREMENT,
  `nombre_destino` VARCHAR(50) NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_final` DATE NOT NULL,
  `duracion_dias` INT NULL,
  `incluye` VARCHAR(300) NOT NULL,
  `descripcion` VARCHAR(400) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `imagenes` VARCHAR(400) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id_viaje`),
  UNIQUE INDEX `id_viaje_UNIQUE` (`id_viaje` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `manahuiadb`.`contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `manahuiadb`.`contacto` (
  `id_contacto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `mensaje` VARCHAR(500) NOT NULL,
  `id_usuario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_contacto`),
  INDEX `fk_contacto_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `id_contacto_UNIQUE` (`id_contacto` ASC) VISIBLE,
  CONSTRAINT `fk_contacto_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `manahuiadb`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `manahuiadb`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `manahuiadb`.`pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `fecha_creacion` DATE NOT NULL,
  `cantidad_personas` INT NOT NULL,
  `total` DOUBLE NOT NULL,
  `id_viaje` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_pedido`, `id_viaje`, `id_usuario`),
  UNIQUE INDEX `id_pedido_UNIQUE` (`id_pedido` ASC) VISIBLE,
  INDEX `fk_pedido_viaje1_idx` (`id_viaje` ASC) VISIBLE,
  INDEX `fk_pedido_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_viaje1`
    FOREIGN KEY (`id_viaje`)
    REFERENCES `manahuiadb`.`viaje` (`id_viaje`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `manahuiadb`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
