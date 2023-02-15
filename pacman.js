var pont = 0;
var nev = "";

var sz1x, sz1y, sz2x, sz2y, px, py;
var sz1pnvan, sz2pnvan;
var szsebb = [2000, 1000, 750, 500], szsidx = 1;
var pf, sz1, sz2;

var maxp = 10, maxut = 67;
var pW = 12, pH = 12;

var cW = 660, cH = 660;
var fW = 55, fH = 55;
var pontr = 5;
var pk = 28, pr = 24, pszr = 4;
var szr = 5, szszr = 2, szbsz = 20, szjsz = 36, szszk = 24;
var c = document.getElementById("pacman");
var pc = c.getContext("2d");

var palya = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function help() {
   var str = 'Irányítás:\n';
   str += 'W=Fel, S=Le, A=Balra,D=Jobbra\n';
   str += 'E=Szellem gyorsabban, Q=Szellem lassaban\n';
   str += 'H=Segítség, T=Ranglista';
   alert(str);
}

function menu() {
   clearInterval(pf);
   clearInterval(sz1);
   clearInterval(sz2);
   document.addEventListener("keypress", gombok);
   document.removeEventListener("keypress", iranyitas);
   document.getElementById("menu").hidden = false;
   document.getElementById("jatek").hidden = true;
   document.getElementById("jatekveg").hidden = true;
   document.getElementById("ranglista").hidden = true;
}

function start() {
   nev = document.getElementById("nev").value;
   pont = 0;
   document.removeEventListener("keypress", gombok);
   document.getElementById("menu").hidden = true;
   document.getElementById("jatek").hidden = false;
   jatek();
}

function ujjatek() {
   clearInterval(pf);
   clearInterval(sz1);
   clearInterval(sz2);
   jatek();
}

function jatek() {
   palyanullaz();
   palyagen();
   document.addEventListener("keypress", iranyitas);
   pf = setInterval(palyafeltolt, 1000 / 30);
   sz1 = setInterval(szellem1mozgas, szsebb[szsidx]);
   sz2 = setInterval(szellem2mozgas, szsebb[szsidx]);
}

function jatektovabb() {
   document.getElementById("jatekveg").hidden = true;
   document.getElementById("jatek").hidden = false;
   pont = 0;
   jatek();
}

function jatekvege() {
   clearInterval(pf);
   clearInterval(sz1);
   clearInterval(sz2);
   palyanullaz();
   listabakuld();
   document.getElementById("jatekveg").hidden = false;
   document.getElementById("jatek").hidden = true;
}

function listabakuld() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

      }
   };
   xhttp.open("POST", "listabakuld.php", true);
   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhttp.send("nev=" + nev + "&pont=" + pont);
}

function ranglista() {
   document.getElementById("ranglista").hidden = false;
   document.getElementById("menu").hidden = true;
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("rlista").innerHTML = this.responseText;
      }
   };
   xhttp.open("POST", "listahivas.php", true);
   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhttp.send();
}

function gombokel() {
   document.removeEventListener("keypress", gombok);
}

function gombokvissza() {
   document.addEventListener("keypress", gombok);
}

//A játék futtatásához való dolgok
function getrndszam(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function palyanullaz() {
   for (var i = 0; i < pW; i++) {
      for (var j = 0; j < pH; j++) {
         palya[i][j] = 0;
      }
   }
}

function palyagen() {
   var szstart = getrndszam(0, 1);
   if (szstart == 0) {
      palya[1][1] = 3;
      sz1x = 1, sz1y = 1;
      palya[10][10] = 3
      sz2x = 10, sz2y = 10;
   } else if (szstart == 1) {
      palya[1][10] = 3;
      sz1x = 1, sz1y = 10;
      palya[10][1] = 3
      sz2x = 10, sz2y = 1;
   }

   var jstart = getrndszam(0, 3);
   if (jstart == 0) palya[5][5] = 4, px = 5, py = 5;
   else if (jstart == 1) palya[5][6] = 4, px = 5, py = 6;
   else if (jstart == 2) palya[6][5] = 4, px = 6, py = 5;
   else if (jstart == 3) palya[6][6] = 4, px = 6, py = 6;

   for (var i = 0; i < maxut; i++) {
      do {
         var x = getrndszam(1, 10);
         var y = getrndszam(1, 10);
      } while (palya[x][y] != 0);
      palya[x][y] = 1
   }

   for (var i = 0; i < maxp; i++) {
      do {
         var x = getrndszam(1, 10);
         var y = getrndszam(1, 10);
      } while (palya[x][y] != 1);
      palya[x][y] = 2
   }
   sz1pnvan = 0, sz2pnvan = 0;
}

function palyafeltolt() {
   pc.fillStyle = "black";
   pc.fillRect(0, 0, cW, cH);
   var vanp = 0;
   for (var i = 0; i < pW; i++) {
      for (var j = 0; j < pH; j++) {
         var title = palya[i][j];
         if (title == 0) {
            pc.fillStyle = "#1919A6";
            pc.fillRect(j * fW, i * fH, fW, fH);
         }
         if (title == 2) {
            pc.beginPath();
            pc.arc(j * fW + pk, i * fH + pk, pontr, 2 * Math.PI, false);
            pc.fillStyle = "#DEA185";
            pc.fill();
         }
         if (title == 3) {
            pc.beginPath();
            pc.moveTo(j * fW + 5, i * fH + 50);
            pc.bezierCurveTo(j * fW + 5, i * fH - 5, j * fW + 50, i * fH + 5, j * fW + 50, i * fH + 50);
            pc.fillStyle = "#FD0000";
            pc.fill();
            pc.beginPath();
            pc.arc(j * fW + szbsz, i * fH + szszk, szr, 2 * Math.PI, false);
            pc.fillStyle = "#FFFFFF";
            pc.fill();
            pc.beginPath();
            pc.arc(j * fW + szjsz, i * fH + szszk, szr, 2 * Math.PI, false);
            pc.fill();
            pc.beginPath();
            pc.arc(j * fW + szbsz, i * fH + szszk, szszr, 2 * Math.PI, false);
            pc.fillStyle = "#000000";
            pc.fill();
            pc.beginPath();
            pc.arc(j * fW + szjsz, i * fH + szszk, szszr, 2 * Math.PI, false);
            pc.fill();
         }
         if (title == 4) {
            pc.beginPath();
            pc.arc(j * fW + pk, i * fH + pk, pr, 0.25 * Math.PI, 1.25 * Math.PI, false);
            pc.fillStyle = "#FFFF00";
            pc.fill();
            pc.beginPath();
            pc.arc(j * fW + pk, i * fH + pk, pr, 0.75 * Math.PI, 1.75 * Math.PI, false);
            pc.fill();
            pc.beginPath();
            pc.arc(j * fW + pk, i * fH + (pk / 2), pszr, 2 * Math.PI, false);
            pc.fillStyle = "#000000";
            pc.fill();
            vanp++;
         }
      }
   }
   if (vanp == 0) {
      px = -1;
      py = -1;
      jatekvege();
   }
}

function gombok(e) {
   switch (key = e.code) {
      case "KeyH":
         help();
         break;
      case "KeyT":
         ranglista();
         break;
      case "KeyE":
         if (szsidx != 3) {
            szsidx++;
         } else {
            alert("Nincs nagyobb nehézség!");
         }
         if (szsidx == 1) alert("Nehézség: Normál");
         if (szsidx == 2) alert("Nehézség: Közepes");
         if (szsidx == 3) alert("Nehézség: Nehéz");
         break;
      case "KeyQ":
         if (szsidx != 0) {
            szsidx--;
         } else {
            alert("Nincs kisebb nehézség!");
         }
         if (szsidx == 0) alert("Nehézség: Könnyű");
         if (szsidx == 1) alert("Nehézség: Normál");
         if (szsidx == 2) alert("Nehézség: Közepes");
         break;
   }
}

function iranyitas(e) {
   switch (key = e.code) {
      case "KeyW":
         fel();
         break;
      case "KeyA":
         bal();
         break;
      case "KeyS":
         le();
         break;
      case "KeyD":
         jobb();
         break;
      case "KeyH":
         help();
         break;
      case "KeyT":
         if (window.getComputedStyle(document.getElementById("ranglista")).display === "none") ranglista();
         else document.getElementById("ranglista").hidden = true;
         break;
      case "KeyE":
         if (szsidx != 3) {
            szsidx++;
         } else {
            alert("Nincs nagyobb nehézség!");
         }
         if (szsidx == 1) alert("Nehézség: Normál");
         if (szsidx == 2) alert("Nehézség: Közepes");
         if (szsidx == 3) alert("Nehézség: Nehéz");
         break;
      case "KeyQ":
         if (szsidx != 0) {
            szsidx--;
         } else {
            alert("Nincs kisebb nehézség!");
         }
         if (szsidx == 0) alert("Nehézség: Könnyű");
         if (szsidx == 1) alert("Nehézség: Normál");
         if (szsidx == 2) alert("Nehézség: Közepes");
         break;
   }
}

function fel() {
   if (palya[px - 1][py] == 1) {
      palya[px][py] = 1;
      palya[px - 1][py] = 4;
      px--;
   } else if (palya[px - 1][py] == 2) {
      palya[px][py] = 1;
      palya[px - 1][py] = 4;
      px--;
      pont++;
   }

}

function le() {
   if (palya[px + 1][py] == 1) {
      palya[px][py] = 1;
      palya[px + 1][py] = 4;
      px++;
   } else if (palya[px + 1][py] == 2) {
      palya[px][py] = 1;
      palya[px + 1][py] = 4;
      px++;
      pont++;
   }

}

function bal() {
   if (palya[px][py - 1] == 1) {
      palya[px][py] = 1;
      palya[px][py - 1] = 4;
      py--;
   } else if (palya[px][py - 1] == 2) {
      palya[px][py] = 1;
      palya[px][py - 1] = 4;
      py--;
      pont++;
   }

}

function jobb() {
   if (palya[px][py + 1] == 1) {
      palya[px][py] = 1;
      palya[px][py + 1] = 4;
      py++;
   } else if (palya[px][py + 1] == 2) {
      palya[px][py] = 1;
      palya[px][py + 1] = 4;
      py++;
      pont++;
   }

}

function szellem1mozgas() {
   // mozgas=[fel,le,jobb,bal]
   var mozgas = [0, 0, 0, 0]
   //fel
   if (palya[sz1x - 1][sz1y] != 0 && palya[sz1x - 1][sz1y] != 3) {
      var regtav = Math.abs(px - sz1x);
      var ujtav = Math.abs(px - (sz1x - 1));
      if (regtav > ujtav) mozgas[0] = 1;
      else mozgas[0] = -1;
   }
   //le
   if (palya[sz1x + 1][sz1y] != 0 && palya[sz1x + 1][sz1y] != 3) {
      var regtav = Math.abs(px - sz1x);
      var ujtav = Math.abs(px - (sz1x + 1));
      if (regtav > ujtav) mozgas[1] = 1;
      else mozgas[1] = -1;
   }
   //jobb
   if (palya[sz1x][sz1y + 1] != 0 && palya[sz1x][sz1y + 1] != 3) {
      var regtav = Math.abs(py - sz1y);
      var ujtav = Math.abs(py - (sz1y + 1));
      if (regtav > ujtav) mozgas[2] = 1;
      else mozgas[2] = -1;
   }
   //bal
   if (palya[sz1x][sz1y - 1] != 0 && palya[sz1x][sz1y - 1] != 3) {
      var regtav = Math.abs(py - sz1y);
      var ujtav = Math.abs(py - (sz1y - 1));
      if (regtav > ujtav) mozgas[3] = 1;
      else mozgas[3] = -1;
   }

   var egyesek = 0;
   var minuszegyesek = 0;
   for (var i = 0; i < 4; i++) {
      if (mozgas[i] == 1) egyesek++;
      if (mozgas[i] == -1) minuszegyesek++;
   }

   var melyiklepes = -1;
   if (egyesek != 0) {
      if (egyesek == 1) {
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == 1) melyiklepes = i;
         }
      }
      if (egyesek == 2) {
         var hanyadik = getrndszam(1, 2);
         var hseg = 1;
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == 1 && hanyadik == hseg) {
               melyiklepes = i;
               hseg++;
            } else if (mozgas[i] == 1) {
               hseg++;
            }
         }
      }
   } else if (minuszegyesek != 0) {
      if (minuszegyesek == 1) {
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == -1) melyiklepes = i;
         }
      }
      if (minuszegyesek == 2) {
         var hanyadik = getrndszam(1, 2);
         var hseg = 1;
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == -1 && hanyadik == hseg) {
               melyiklepes = i;
               hseg++;
            } else if (mozgas[i] == -1) {
               hseg++;
            }
         }
      }
      if (minuszegyesek == 3) {
         var hanyadik = getrndszam(1, 3);
         var hseg = 1;
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == -1 && hanyadik == hseg) {
               melyiklepes = i;
               hseg++;
            } else if (mozgas[i] == -1) {
               hseg++;
            }
         }
      }
   }

   switch (melyiklepes) {
      case 0:
         if (sz1pnvan == 1) {
            if (palya[sz1x - 1][sz1y] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 2;
               palya[sz1x - 1][sz1y] = 3;
            } else {
               sz1pnvan = 0;
               palya[sz1x][sz1y] = 2;
               palya[sz1x - 1][sz1y] = 3;
            }
         } else {
            if (palya[sz1x - 1][sz1y] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 1;
               palya[sz1x - 1][sz1y] = 3;
            } else {
               palya[sz1x][sz1y] = 1;
               palya[sz1x - 1][sz1y] = 3;
            }
         }
         sz1x--;
         break;
      case 1:
         if (sz1pnvan == 1) {
            if (palya[sz1x + 1][sz1y] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 2;
               palya[sz1x + 1][sz1y] = 3;
            } else {
               sz1pnvan = 0;
               palya[sz1x][sz1y] = 2;
               palya[sz1x + 1][sz1y] = 3;
            }
         } else {
            if (palya[sz1x + 1][sz1y] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 1;
               palya[sz1x + 1][sz1y] = 3;
            } else {
               palya[sz1x][sz1y] = 1;
               palya[sz1x + 1][sz1y] = 3;
            }
         }
         sz1x++;
         break;
      case 2:
         if (sz1pnvan == 1) {
            if (palya[sz1x][sz1y + 1] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 2;
               palya[sz1x][sz1y + 1] = 3;
            } else {
               sz1pnvan = 0;
               palya[sz1x][sz1y] = 2;
               palya[sz1x][sz1y + 1] = 3;
            }
         } else {
            if (palya[sz1x][sz1y + 1] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 1;
               palya[sz1x][sz1y + 1] = 3;
            } else {
               palya[sz1x][sz1y] = 1;
               palya[sz1x][sz1y + 1] = 3;
            }
         }
         sz1y++;
         break;
      case 3:
         if (sz1pnvan == 1) {
            if (palya[sz1x][sz1y - 1] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 2;
               palya[sz1x][sz1y - 1] = 3;
            } else {
               sz1pnvan = 0;
               palya[sz1x][sz1y] = 2;
               palya[sz1x][sz1y - 1] = 3;
            }
         } else {
            if (palya[sz1x][sz1y - 1] == 2) {
               sz1pnvan = 1;
               palya[sz1x][sz1y] = 1;
               palya[sz1x][sz1y - 1] = 3;
            } else {
               palya[sz1x][sz1y] = 1;
               palya[sz1x][sz1y - 1] = 3;
            }
         }
         sz1y--;
         break;
   }
}

function szellem2mozgas() {
   // mozgas=[fel,le,jobb,bal]
   var mozgas = [0, 0, 0, 0]
   //fel
   if (palya[sz2x - 1][sz2y] != 0 && palya[sz2x - 1][sz2y] != 3) {
      var regtav = Math.abs(px - sz2x);
      var ujtav = Math.abs(px - (sz2x - 1));
      if (regtav > ujtav) mozgas[0] = 1;
      else mozgas[0] = -1;
   }
   //le
   if (palya[sz2x + 1][sz2y] != 0 && palya[sz2x + 1][sz2y] != 3) {
      var regtav = Math.abs(px - sz2x);
      var ujtav = Math.abs(px - (sz2x + 1));
      if (regtav > ujtav) mozgas[1] = 1;
      else mozgas[1] = -1;
   }
   //jobb
   if (palya[sz2x][sz2y + 1] != 0 && palya[sz2x][sz2y + 1] != 3) {
      var regtav = Math.abs(py - sz2y);
      var ujtav = Math.abs(py - (sz2y + 1));
      if (regtav > ujtav) mozgas[2] = 1;
      else mozgas[2] = -1;
   }
   //bal
   if (palya[sz2x][sz2y - 1] != 0 && palya[sz2x][sz2y - 1] != 3) {
      var regtav = Math.abs(py - sz2y);
      var ujtav = Math.abs(py - (sz2y - 1));
      if (regtav > ujtav) mozgas[3] = 1;
      else mozgas[3] = -1;
   }

   var egyesek = 0;
   var minuszegyesek = 0;
   for (var i = 0; i < 4; i++) {
      if (mozgas[i] == 1) egyesek++;
      if (mozgas[i] == -1) minuszegyesek++;
   }

   var melyiklepes = -1;
   if (egyesek != 0) {
      if (egyesek == 1) {
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == 1) melyiklepes = i;
         }
      }
      if (egyesek == 2) {
         var hanyadik = getrndszam(1, 2);
         var hseg = 1;
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == 1 && hanyadik == hseg) {
               melyiklepes = i;
               hseg++;
            } else if (mozgas[i] == 1) {
               hseg++;
            }
         }
      }
   } else if (minuszegyesek != 0) {
      if (minuszegyesek == 1) {
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == -1) melyiklepes = i;
         }
      }
      if (minuszegyesek == 2) {
         var hanyadik = getrndszam(1, 2);
         var hseg = 1;
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == -1 && hanyadik == hseg) {
               melyiklepes = i;
               hseg++;
            } else if (mozgas[i] == -1) {
               hseg++;
            }
         }
      }
      if (minuszegyesek == 3) {
         var hanyadik = getrndszam(1, 3);
         var hseg = 1;
         for (var i = 0; i < 4; i++) {
            if (mozgas[i] == -1 && hanyadik == hseg) {
               melyiklepes = i;
               hseg++;
            } else if (mozgas[i] == -1) {
               hseg++;
            }
         }
      }
   }

   switch (melyiklepes) {
      case 0:
         if (sz2pnvan == 1) {
            if (palya[sz2x - 1][sz2y] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 2;
               palya[sz2x - 1][sz2y] = 3;
            } else {
               sz2pnvan = 0;
               palya[sz2x][sz2y] = 2;
               palya[sz2x - 1][sz2y] = 3;
            }
         } else {
            if (palya[sz2x - 1][sz2y] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 1;
               palya[sz2x - 1][sz2y] = 3;
            } else {
               palya[sz2x][sz2y] = 1;
               palya[sz2x - 1][sz2y] = 3;
            }
         }
         sz2x--;
         break;
      case 1:
         if (sz2pnvan == 1) {
            if (palya[sz2x + 1][sz2y] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 2;
               palya[sz2x + 1][sz2y] = 3;
            } else {
               sz2pnvan = 0;
               palya[sz2x][sz2y] = 2;
               palya[sz2x + 1][sz2y] = 3;
            }
         } else {
            if (palya[sz2x + 1][sz2y] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 1;
               palya[sz2x + 1][sz2y] = 3;
            } else {
               palya[sz2x][sz2y] = 1;
               palya[sz2x + 1][sz2y] = 3;
            }
         }
         sz2x++;
         break;
      case 2:
         if (sz2pnvan == 1) {
            if (palya[sz2x][sz2y + 1] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 2;
               palya[sz2x][sz2y + 1] = 3;
            } else {
               sz2pnvan = 0;
               palya[sz2x][sz2y] = 2;
               palya[sz2x][sz2y + 1] = 3;
            }
         } else {
            if (palya[sz2x][sz2y + 1] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 1;
               palya[sz2x][sz2y + 1] = 3;
            } else {
               palya[sz2x][sz2y] = 1;
               palya[sz2x][sz2y + 1] = 3;
            }
         }
         sz2y++;
         break;
      case 3:
         if (sz2pnvan == 1) {
            if (palya[sz2x][sz2y - 1] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 2;
               palya[sz2x][sz2y - 1] = 3;
            } else {
               sz2pnvan = 0;
               palya[sz2x][sz2y] = 2;
               palya[sz2x][sz2y - 1] = 3;
            }
         } else {
            if (palya[sz2x][sz2y - 1] == 2) {
               sz2pnvan = 1;
               palya[sz2x][sz2y] = 1;
               palya[sz2x][sz2y - 1] = 3;
            } else {
               palya[sz2x][sz2y] = 1;
               palya[sz2x][sz2y - 1] = 3;
            }
         }
         sz2y--;
         break;
   }
}