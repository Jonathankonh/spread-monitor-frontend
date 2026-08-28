# Spread Monitor

Ein Analyse-Dashboard für Preisunterschiede von Aktien und ETFs zwischen vier
deutschen und europäischen Handelsplätzen: gettex, Xetra, LS Exchange und EIX.

Da Neobroker wie Trade Republic oder Scalable Capital unterschiedliche
Ausführungsplätze nutzen, können für dasselbe Wertpapier zur selben Zeit
unterschiedliche Preise gelten. Spread Monitor macht diese Marktineffizienz
sichtbar und quantifizierbar - auf Basis echter, live erfasster Marktdaten,
nicht simulierter Beispieldaten.

Live-Demo: https://spread-monitor.onrender.com

## Kernfunktionen

- Ranking der größten aktuellen Preisunterschiede zwischen Handelsplätzen
- Preisverlaufsvergleich einzelner Wertpapiere über alle vier Handelsplätze
- Liquiditäts- und Handelsaktivitätskennzahlen je Handelsplatz
- Handelsplatzübersicht mit Gebührenstruktur und Handelszeiten

## Daten

Die zugrunde liegenden Marktdaten stammen aus den öffentlichen,
MiFID-II-konformen Delayed-Data-Feeds der jeweiligen Börsen und werden
automatisiert im Minutentakt erfasst.

## Technischer Kontext

Dieses Frontend ist Teil eines mehrschichtigen Systems (Datenerfassung,
PostgreSQL-Datenbank, Java/Spring-Boot-Backend, Vue.js-Frontend). Details zur
Datenpipeline finden sich im Backend-Repository:
https://github.com/Jonathankonh/spread-monitor
