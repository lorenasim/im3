# 🎄 Projekt: HOE! HOE! HOE! HITS
### Laufen im Radio wirklich immer die gleichen Weihnachtssongs?

## 📝 Infos zum Projekt
Jeder kennt es: Sobald die Weihnachtszeit anfängt, hat man das Gefühl, im Radio laufen nur noch fünf verschiedene Lieder in Dauerschleife. Wir wollten wissen, ob das wirklich stimmt. 

Dafür haben wir die Sender **SRF1** und **Energy (NRJ)** verglichen. Wir haben die Daten über eine API gezogen und gecheckt, wie oft diese 5 Songs bei beiden Sendern tatsächlich gelaufen sind:

1. **Wham!** – *Last Christmas*
2. **Mariah Carey** – *All I Want for Christmas Is You*
3. **Sia** – *Snowman*
4. **Justin Bieber** – *Mistletoe*
5. **Dean Martin** – *Let It Snow! Let It Snow! Let It Snow!*

## 💡 Learnings
* **Umgang mit APIs:** Wir haben gelernt, wie man überhaupt Daten von einer Website/API anfragt und diese dann speichert.
* **Daten-Chaos bändigen:** Wir haben gemerkt, dass die Daten von den Sendern oft unterschiedlich benannt sind (mal mit Ausrufezeichen, mal ohne) und man sie erst mal "putzen" muss, bevor man sie vergleichen kann.

## ⚠️ Schwierigkeiten
* **API-Probleme:** Die API hat nicht alle Songs direkt in unsere Datenbank übernommen. Das lag an der sogenannten "Pagination" – die API hat die Songs in Häppchen geliefert und wir haben am Anfang nicht alle Seiten erwischt.

## 🚀 Unser Fazit
Daten sammeln klingt einfacher, als es ist! Auch wenn unsere Datenbank am Ende ein paar Lücken hatte, sieht man deutlich, dass die Weihnachtssongs im Privatradio viel öfter wiederholt werden als bei SRF.