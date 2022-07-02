CREATE DATABASE IF NOT EXISTS historia_demografica;
USE historia_demografica;

CREATE TABLE bautizos (siglo VARCHAR(10), anio INT, calidad VARCHAR(100), genero CHAR(1), legitimo INT, ilegitimo INT, total INT);
CREATE TABLE defunciones (siglo VARCHAR(10), anio INT, calidad VARCHAR(100), genero CHAR(1), total INT);
CREATE TABLE matrimonios (siglo VARCHAR(10), anio INT, etnia_m VARCHAR(100), etnia_f VARCHAR(100), total INT);

/*Filtrado por secciones de años*/

/*Testing*/
/*
LOAD DATA INFILE
'S:/temp/PP/SistemaReportes/csv/bau.csv'
INTO TABLE bautizos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 

LOAD DATA INFILE
'S:/temp/PP/SistemaReportes/csv/def.csv'
INTO TABLE defunciones
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 

LOAD DATA INFILE
'S:/temp/PP/SistemaReportes/csv/mat.csv'
INTO TABLE matrimonios
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
*/