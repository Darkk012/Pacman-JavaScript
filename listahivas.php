<?php
$conn = new mysqli("localhost", "root", "", "pacman");
if ($conn->connect_error) {
   die("Nem sikerült az adatbázishoz csatlakozni");
}
$sql="SELECT * FROM ranglista ORDER BY pont DESC LIMIT 10";
$result=$conn->query($sql);
echo '<tr> <th>Hely</th> <th>Név</th> <th>Pont</th> </tr>';
$hely=1;
while ($row = $result->fetch_assoc()) {
   echo '<tr><td>'.$hely.'</td>';
   echo '<td>'.$row["nev"].'</td>';
   echo '<td>'.$row["pont"].'</td></tr>';
   $hely++;
}
$conn->close();
?>