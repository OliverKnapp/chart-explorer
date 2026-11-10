# 📊 Chart-Explorer

> **TU Wien — 187.B12 Denkweisen der Informatik (Miniprojekt 2)**  
> **Team:** Oliver Knapp (12616937) & Roman Krebs (12620369)  
> **Tutor_innen:** Jessica Arabi, Bidha Shrestha  
> **Denkweisen:** Creative Thinking & Scientific Thinking  
> **Live Demo:** [https://oliverknapp.github.io/chart-explorer/](https://oliverknapp.github.io/chart-explorer/)  
> **Repository:** [https://github.com/OliverKnapp/chart-explorer](https://github.com/OliverKnapp/chart-explorer)  

---

## Über das Projekt

**Chart-Explorer** ist eine interaktive Web-Applikation zur vergleichenden Erkundung von Datenvisualisierungen und Daten-Anti-Patterns. Während klassische Kataloge wie *The Data Visualisation Catalogue*, *Data Viz Project* oder das *Financial Times Visual Vocabulary* ausschließlich Musterbeispiele für passende Diagramme zeigen, macht Chart-Explorer das **Scheitern unpassender Diagramme** interaktiv erfahrbar.

### Kern-Features
- **Universal Transition Morphing:** Butterweiche Animationen beim Wechsel zwischen Diagrammtypen (Balken, Linien, Streupunkte, Tortendiagramme, Radar-Charts, Treemaps, Heatmaps) dank Apache ECharts.
- **Hero- & Split-Screen-Modus:** Umschalten zwischen einer fokussierten Hauptansicht und einer Side-by-Side A/B-Vergleichsansicht.
- **Kuratierte Forschungsdaten:** Vorkonfigurierte Datensätze aus Klimaforschung, Sozioökonomie, Ökologie und Pharmakologie.
- **CSV-Uploader:** Drag-and-Drop eigener Datensätze mit clientseitiger Typ-Inferenz.
- **Wissenschaftliches Diagnose-Panel:** Detaillierte Evaluation nach Tufte (Lie Factor) und Cleveland & McGill (Wahrnehmungshierarchie).
- **Claude-inspiriertes Design:** Reinweißes Layout, mattschwarze Typografie, kobaltblaue Akzente (`#0047AB`), schwebendes Pill-Dock am unteren Rand.

---

## Lokale Ausführung

```bash
# Abhängigkeiten installieren (falls noch nicht geschehen)
npm install

# Lokalen Entwicklungsserver starten
npm run dev

# Produktions-Build testen
npm run build
```

---

## Dokumentation & Abgabe

Die vollständige schriftliche Ausarbeitung für die TU-Wien-Abgabe befindet sich in:
- [DOKUMENTATION.md](file:///Users/mac-chan/Documents/antigravity/Mp2/DOKUMENTATION.md) (Markdown)
- Direkt in der Web-Applikation über den Button **„Dokumentation“** in der oberen Navigationsleiste einsehbar.
