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
* **Datenbank**: Bei Stichproben zur Vollständigkeit unserer Song-Datenbank stellten wir fest, dass insbesondere bei SRF Radio 1 Lücken in der Erfassung auftraten. Die Ursachenforschung ergab folgende technische und redaktionelle Gründe:

- ⁠Wartungsintervalle: Aufgrund von Systemwartungen im Zeitraum vom 5. bis 13. Dezember konnte der Datenfluss in die Datenbank zeitweise unterbrochen worden sein.

- ⁠Inkonsistente Metadaten: Abweichungen in der Schreibweise auf der Quellseite (z. B. „Wham“ statt „Wham!“) führten zu Fehlern bei der automatisierten Zuordnung. In der $allowed_songs-Liste steht 'wham!' (mit Ausrufezeichen). Wenn SRF Radio 1 den Song in ihrer API aber als "Wham" (ohne Ausrufezeichen) sendet, schlägt der Vergleich fehl und der Song wird aussortiert, obwohl er eigentlich in die Datenbank sollte. Hätten wir dies früher gesehen, hätten wir es korrigieren können.

## 🚀 Unser Fazit
Daten sammeln klingt einfacher, als es ist! Auch wenn unsere Datenbank am Ende ein paar Lücken hatte, sieht man deutlich, dass die Weihnachtssongs im Privatradio viel öfter wiederholt werden als bei SRF.