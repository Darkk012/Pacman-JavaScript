<?php
   $conn = new mysqli("localhost", "root", "", "pacman");
   if ($conn->connect_error) {
      die("Nem sikerült az adatbázishoz csatlakozni");
   }
   $sql="INSERT INTO ranglista (nev,pont) VALUES ('".$_POST["nev"]."',".$_POST["pont"].")";
   $conn->query($sql);
   $conn->close();
?>