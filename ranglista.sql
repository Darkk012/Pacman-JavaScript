-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Ápr 17. 17:38
-- Kiszolgáló verziója: 10.4.17-MariaDB
-- PHP verzió: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `pacman`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ranglista`
--

CREATE TABLE `ranglista` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `pont` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `ranglista`
--

INSERT INTO `ranglista` (`id`, `nev`, `pont`) VALUES
(1, 'Benedek', 4),
(2, 'Benedek', 15),
(3, 'Benedek', 6),
(4, 'Sándor', 9),
(5, 'Sándor', 4),
(6, 'Kovács', 6),
(7, 'Kovács', 6),
(8, 'Viktor', 27),
(9, 'Viktor', 34),
(10, 'Benedek', 10),
(11, 'Benedek', 22),
(12, 'Benedek', 17),
(13, 'Benedek', 57),
(14, 'Benedek', 3),
(15, 'Benedek', 0),
(16, 'József', 2),
(17, 'Sándor', 3),
(18, 'Sándor', 8),
(19, 'Sándor', 8),
(20, 'Lajos', 9);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ranglista`
--
ALTER TABLE `ranglista`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ranglista`
--
ALTER TABLE `ranglista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
