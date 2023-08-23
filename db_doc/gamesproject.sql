﻿CREATE DATABASE gamesproject
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_hungarian_ci;

CREATE TABLE gamesproject.games (
  id INT(11) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) DEFAULT NULL,
  typeID INT(11) DEFAULT NULL,
  CategoryID INT(11) DEFAULT NULL,
  Title VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE gamesproject.types (
  id INT(11) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE gamesproject.categories (
  id INT(11) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

INSERT types
  (id, Name)
  VALUES
  (1, 'Action'), (2, 'Fighting'), (3, 'Sports'), (4, 'Shooter'), (5, 'Sandbox/Open world'), (6, 'Simulation');

INSERT categories
  (id, Name)
  VALUES
  (1, 'Singleplayer'), (2, 'Multiplayer'), (3, 'Singleplayer/Multiplayer');

INSERT games
  (id, Name, typeID, CategoryID, Title)
  VALUES
  (1, 'Two Point Hospital', 6, 1, 'Angolról fordítva-A Two Point Hospital egy 2018-as üzleti szimulációs játék, amelyet a Two Point Studios fejlesztett ki és a Sega adott ki Linuxra, macOS-re és Windowsra. A Nintendo Switch, PlayStation 4 és Xbox One konzolos verziói 2020 februárjában jelentek meg. 2020 novemberében megjelent az Amazon Luna verziója is.'),
  (2, 'Metal Gear Solid 5: The Phantom Pain', 1, 3, 'A The Phantom Pain egy fejlesztés alatt álló videójáték, amelyet a svéd Moby Dick Studio fejleszt PlayStation 3 és Xbox 360 platformokra. A játékos egy amputált kezű középkorú férfit irányít, aki miután felébredt a kómából megpróbál kiszabadulni a kórházból, miközben természetfeletti víziók gyötrik és ismeretlen katonák törnek az életére.'), 
  (3, 'Mortal Kombat 11', 2, 3, 'A Mortal Kombat 11 verekedős játék, melyet a NetherRealm Studios fejlesztett és a Warner Bros. Interactive Entertainment jelentetett meg. Unreal 3 Engine-t használ, ez a játék a tizenegyedik fő játék a Mortal Kombat sorozatban és a 2015-ben kiadott Mortal Kombat X folytatása.'),
  (4, 'Apex Legends', 4, 2, 'Az Apex Legends ingyenesen játszható battle royale játék, melyet a Respawn Entertainment fejlesztett és az Electronic Arts dobott piacra. A Titanfall című játékkal azonos univerzumban játszódik. A játékot a Microsoft Windows, a PlayStation 4 és az Xbox One platformjaira adta ki a játékfejlesztő 2019. február 4-én.'), 
  (5, 'Fifa Series', 3, 3, 'Angolról fordítva-Az EA Sports FC, amelyet 2023-ig FIFA-nak neveztek, egy futball-videojáték-franchise, amelyet az EA Vancouver és az EA Romania fejlesztett ki, és az EA Sports adott ki. 2011-ig az EA Sports FC franchise-t 18 nyelvre lokalizálták, és 51 országban érhető el.'), 
  (6, 'Minecraft', 5, 3, 'A Minecraft nyílt világú sandbox videójáték, melyet a svéd Markus Persson indított útjára 2009-ben, és a Mojang adott ki 2011-ben.[24] 2014-ben a Microsoft felvásárolta a játék fejlesztésével és kiadásával foglalkozó céget, ezzel együtt birtokukba került a Minecraft tulajdonjoga is. A Minecraft minden idők legkelendőbb játéka. 2020 májusára 200 millió példányt adtak el belőle valamennyi platformon, továbbá havi szinten 126 millió aktív játékossal rendelkezik.'), 
  (7, 'Forma 1 Series', 3, 3, 'A Formula 1 egy olyan videojáték , amelynek játék alapja a kontroll egy jármű a Forma-1 (F1), az F1 játékok jelentik a jó része a családnak racing videojátékok . A cél általában a lehető leggyorsabb előrehaladás egyik pontról a másikra annak érdekében, hogy mások fölött vagy az idő múlásával nyerjünk. Ez a játéktípus hangsúlyozza a verseny fogalmát, és érdeklődését a gyorsaság és az általa nyújtott kísérletek érzik. Nagyon népszerű, a műfajt a Forma-1-es nagydíj , a versenypályák és az egyszemélyes versenyzők ihlették .');

SELECT games.id, games.Name, types.Name Type, categories.Name Category, games.Title FROM games
INNER JOIN types on games.typeID = types.id
INNER JOIN categories on games.CategoryID = categories.id
ORDER by games.id;

SELECT games.id, games.Name, types.Name Type, types.id typeID, categories.Name Category, categories.id categoryID, games.Title FROM games
INNER JOIN types on games.typeID = types.id
INNER JOIN categories on games.CategoryID = categories.id
WHERE games.id = 1;