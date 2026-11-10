# Denkweisen der Informatik — Miniprojekt 2 Dokumentation

| Metadaten | Details |
| :--- | :--- |
| **Projektname** | **Chart-Explorer: Interaktive Sandbox für visuelle Daten-Anti-Patterns** |
| **Gruppenmitglieder** | Oliver Knapp (Matrikelnummer: 12616937)<br>Roman Krebs (Matrikelnummer: 12620369) |
| **Tutor_innen** | Jessica Arabi, Bidha Shrestha |
| **Gewählte Denkweisen** | **Creative Thinking** & **Scientific Thinking** |
| **Lehrveranstaltung** | 187.B12 Denkweisen der Informatik (TU Wien) |

---

## 1. Ideensammlung & Themenfindung

### 1.1 Welche Ideen hatten Sie? (In Summe 6 Einzelideen)
Im Vorfeld haben wir im Team sechs individuelle Projektideen entwickelt, die jeweils versuchen, **Scientific Thinking** (empirische Methodik, formale Korrektheit, statistische Validität) und **Creative Thinking** (innovative Vermittlung, spielerische Brechung von Konventionen, intuitive Interaktion) zu verknüpfen:

1. **Idee 1 (Oliver Knapp): Chart-Explorer (Gewählt)**  
   *Konzept:* Eine interaktive Web-Sandbox, die es erlaubt, wissenschaftliche Datensätze bewusst in methodisch unpassende oder absurde Diagrammtypen zu zwingen. Nutzer_innen erleben durch flüssiges, animiertes Morphing, wie Datenpunkte verzerrt, Information zerstört und Fehlinterpretationen provoziert werden.  
   *Denkweisen-Bezug:* Verbindet empirische Visualisierungstheorie (Scientific) mit dem kreativen Experimentieren und Sichtbarmachen von Fehlern (Creative).

2. **Idee 2 (Oliver Knapp): Generativer Klimadaten-Klang- und Kunst-Generator**  
   *Konzept:* Übersetzung historischer CO₂- und Temperaturdaten in generative audiovisuelle Kunstlandschaften, um die Klimakrise emotional erfahrbar zu machen.  
   *Verworfen, weil:* Hoher künstlerischer Reiz, aber didaktisch zu diffus und schwer in 5 Minuten als Informatik-Gegenstand messbar zu präsentieren.

3. **Idee 3 (Oliver Knapp): Gamifizierter P-Hacking-Simulator**  
   *Konzept:* Ein webbasiertes Spiel, in dem Nutzer_innen durch Selektion von Subgruppen und Variablen bewusst statistisch signifikante Schein-Korrelationen ($p < 0.05$) erzeugen müssen, um das Problem von „Publication Bias“ zu verstehen.  
   *Verworfen, weil:* Didaktisch wertvoll, aber der Implementierungsaufwand für mathematische Signifikanz-Pipelines den Rahmen des Miniprojekts gesprengt hätte.

4. **Idee 4 (Roman Krebs): Visualisierungs-Workbench für Algorithmen-Verhalten**  
   *Konzept:* Vergleichende Animation von Sortier- und Graph-Suchalgorithmen unter extremen Randbedingungen (z. B. Worst-Case-Arrays, zyklische Graphen) mit Sound-Synthese.  
   *Verworfen, weil:* Ähnliche Tools existieren bereits zuhauf im akademischen Web (z. B. Visualgo); der Neuheitswert war zu gering.

5. **Idee 5 (Roman Krebs): Kognitiver Bias-Detektor für Umfragedaten**  
   *Konzept:* Interaktives Tool, das zeigt, wie die visuelle Anordnung von Fragebögen und Multiple-Choice-Antworten das Abstimmungsverhalten nachweislich manipuliert.  
   *Verworfen, weil:* Benötigt umfangreiche empirische Probanden-Studien, die innerhalb des Projektzeitraums nicht valide erhoben werden konnten.

6. **Idee 6 (Roman Krebs): Interaktiver Simulator für evolutionäre Schwarmintelligenz**  
   *Konzept:* Boids-Simulation im Browser, bei der Nutzer_innen durch Verändern von Parametern das Kippen von geordnetem Schwarmverhalten in chaotische Kollisionen beobachten.  
   *Verworfen, weil:* Zwar optisch beeindruckend, jedoch fehlte der direkte Bezug zu einer praxisrelevanten informatischen Fragestellung im Alltag von Studierenden.

### 1.2 Wofür haben Sie sich entschieden und warum? Was ist Ihr geplanter Gegenstand?
- **Entscheidung:** Wir haben uns einstimmig für **Idee 1: Chart-Explorer** entschieden.
- **Begründung:** Visualisierungen sind das zentrale Kommunikationsmittel der Wissenschaft. Gleichzeitig werden Diagramme täglich falsch, irreführend oder manipulativ eingesetzt („Lügen mit Zahlen“). Existierende Lernplattformen zeigen immer nur, wie man es *richtig* macht – aber der Lerneffekt ist nachweislich größer, wenn man den visuellen Absturz selbst provozieren und beobachten kann.
- **Geplanter Gegenstand:** Eine performante, minimalistisch gestaltete Web-Applikation (Next.js/React, TypeScript, Apache ECharts, Tailwind CSS) mit animierten Übergängen zwischen 7 Diagrammtypen, Split-Screen-Vergleich, kuratierten Datensätzen und zuschaltbarer didaktischer Fehleranalyse.

---

## 2. State of the Art & Abgrenzung

### 2.1 Ähnliche Projekte und deren Schwachstellen
Wir haben drei zentrale Referenzprojekte recherchiert:
1. **[The Data Visualisation Catalogue](https://datavizcatalogue.com/):**
   - *Stärken:* Ausgezeichnetes Nachschlagewerk; kategorisiert Diagramme nach Funktion (Vergleich, Verteilung, Zeit etc.).
   - *Schwächen:* Rein statische Beschreibungen mit Musterbeispielen. Es existiert keine Möglichkeit, eigene Daten einzuspeisen oder zu sehen, wie ein Diagramm versagt.
2. **[Data Viz Project (Ferdio)](https://datavizproject.com/):**
   - *Stärken:* Sehr ästhetisches Design, riesige Vielfalt an Diagrammtypen.
   - *Schwächen:* Reine Dummy-Vektorgrafiken; keine interaktive Datenbindung; keine Aufklärung über Anti-Patterns oder Wahrnehmungsfehler.
3. **[Financial Times Visual Vocabulary](https://ft-interactive.github.io/visual-vocabulary/):**
   - *Stärken:* Branchenstandard im Datenjournalismus zur Auswahl der passenden visuellen Kategorie.
   - *Schwächen:* Statisches Poster/Guide; hilft nur bei der Vorab-Planung, visualisiert aber nicht den Kontrast zwischen „gutem“ und „irreführendem“ Diagramm am identischen Datensatz.

### 2.2 Differenzierung von Chart-Explorer
- **Aktives Scheitern lassen (Anti-Pattern Sandbox):** Chart-Explorer blockiert ungeeignete Diagramme nicht, sondern rendert sie absichtlich. Wer 500 kontinuierliche Klimadatenpunkte in ein 3D-Donut-Diagramm oder Radar-Chart zwingt, sieht den optischen Informationskollaps sofort.
- **Animiertes Morphing:** Durch ECharts Universal Transitions transformieren sich die geometrischen Marken (Balken teilen sich in Punkte oder formen Tortensegmente). Die Kontinuität der Datenpunkte bleibt im Übergang mental nachvollziehbar.
- **Side-by-Side Split View:** Erlaubt den direkten Vergleich zwischen der empfohlenen Standard-Visualisierung und der irreführenden Alternative.
- **Wissenschaftliche Diagnose:** Ein zuschaltbares Panel erklärt fundiert anhand von Edward Tufte (Lie Factor, Data-Ink Ratio) und Cleveland & McGill (Wahrnehmungshierarchie), *warum* das menschliche Gehirn die Darstellung fehlinterpretiert.

### 2.3 Anpassungen und Verbesserungen nach der Recherche
Nach der Recherche haben wir unsere ursprüngliche Idee verfeinert:
- Statt einer reinen linearen Liste haben wir eine **Dual-View-Architektur** konzipiert: Ein zentrierter, ablenkungsfreier Hero-Modus für das Morphing, umschaltbar in einen Split-Screen-Modus für gezielte A/B-Gegenüberstellungen.
- Wir haben auf vorgefertigte, bevormundende Bewertungen in der Standardansicht verzichtet: Der User soll primär selbst die visuelle Dissonanz wahrnehmen (Creative Exploration), bevor auf Wunsch das Diagnose-Panel (Scientific Validation) geöffnet wird.

---

## 3. Problem Definition

### 3.1 Wichtige Einflussfaktoren auf das Design
- **Kognitive Wahrnehmungshierarchie (Cleveland & McGill):** Das menschliche Auge kann Positionen auf gemeinsamer Skala (Balken/Punkte) bis zu 10-mal präziser vergleichen als Winkel, Flächen oder Farbintensitäten (Kreise, Treemaps, Heatmaps).
- **Design-Philosophie (Claude-inspiriert, Minimalismus):**
  - Reines Weiß (`#FFFFFF`) für maximalen Kontrast.
  - Mattschwarze Typografie (`#121212`) und feine 1px-Borders (`#E4E4E7`).
  - Eine einzige, neutrale Signalfarbe: **Kühles Kobaltblau (`#0047AB`)** für Fokuselemente.
  - **Strenge Design-Regeln:** Keine Farbverläufe/Gradients, keine Emojis, keine Violetttöne.
  - **Floating Dock / Bottom Pill:** Die Steuerungselemente schweben dezent am unteren Rand, damit der Fokus zu 100 % auf der Datenvisualisierung bleibt.
- **Technische Robustheit:** Automatische Typ-Inferenz und Fallback-Mapping, damit auch bei unpassenden Datenfeldern kein Script-Error auftritt, sondern eine visuell greifbare Darstellung gerendert wird.

### 3.2 Zielgruppe & Nutzungskontext
- **Wer arbeitet mit dem Projekt?** Studierende der Informatik, Naturwissenschaften und Datenwissenschaften, Forschende, Lehrende, Journalist_innen sowie dateninteressierte Laien.
- **Einsatzkontext:**
  - In Universitäts-Vorlesungen und Übungen zu Informationsvisualisierung und Data Science.
  - In Fact-Checking- und Medienkompetenz-Workshops zur Erkennung manipulativer Medien-Grafiken.
  - Als interaktiver Selbsttest beim Erstellen von wissenschaftlichen Abschlussarbeiten.

---

## 4. Erster Prototyp

### 4.1 Erste Lösungsansätze
- Wir haben als ersten Proof-of-Concept eine einfache React-Komponente mit statischer Tabellen-Auswahl und isolierten Chart.js-Diagrammen aufgesetzt.
- Getestet wurde das Erzwingen von 150 Temperaturmesswerten in ein Standard-Tortendiagramm und ein Liniendiagramm.

### 4.2 Inwiefern geht die Lösung gut auf die Problemstellung ein?
- Der Aha-Effekt war sofort vorhanden: Das Tortendiagramm wurde zu einem unleserlichen Farbkreis mit mikroskopischen Segmenten, während das Liniendiagramm den Erwärmungstrend klar vermittelte.

### 4.3 Was war noch nicht zielführend und was wurde verbessert?
- *Problem 1:* Chart.js zerstörte beim Typwechsel die Canvas-Instanz – es gab einen harten, flackernden Sprung ohne Animation.  
  $\rightarrow$ *Verbesserung:* Migration auf **Apache ECharts** mit `universalTransition`, wodurch die Datenpunkte flüssig von einer Form in die andere gleiten.
- *Problem 2:* Zu viel Bildschirmplatz wurde durch Dropdown-Menüs und Einstellungsleisten verschwendet.  
  $\rightarrow$ *Verbesserung:* Neuentwurf der UI als **Floating Dock am unteren Bildschirmrand** und Einklappen von Spezialfunktionen in ein modales Diagnose-Drawer.
- *Problem 3:* Nutzer_innen mussten Spalten mühsam manuell konfigurieren.  
  $\rightarrow$ *Verbesserung:* Implementierung einer **heuristischen Auto-Mapping-Engine**, die Datentypen (Datum, Text, Zahl) automatisch erkennt und sinnvoll oder provokant unpassend vorbelegt.

---

## 5. Konsequenzen- und Folgenabschätzung

### 5.1 Interessen betroffener Gruppen
1. **Wissenschaftliche Community & Reviewer:** Haben ein starkes Interesse an Datenintegrität und Reproduzierbarkeit. Sie profitieren davon, dass Studierende geschult werden, keine irreführenden Charts in Papers zu veröffentlichen.
2. **Medien & Öffentlichkeit:** Benötigen Schutz vor bewusster Desinformation (z. B. abgeschnittene Y-Achsen in Wahlsendungen, falsche 3D-Perspektiven).
3. **Software-Entwickler_innen:** Bevorzugen oft Bibliotheken, die Diagramme „hübsch“ aussehen lassen, vernachlässigen dabei jedoch manchmal die statistische Exaktheit.

### 5.2 Potenzielle Konflikte, Konsequenzen & Risiken
- **Gefahr des Missbrauchs als „Manipulations-Baukasten“:** Böswillige Akteure könnten das Tool theoretisch nutzen, um auszutesten, mit welchem Diagrammtyp sich ein unerwünschter Datentrend am effektivsten verschleiern lässt.
- **Gegenmaßnahme im Design:** Das integrierte **Diagnose-Panel** deckt Manipulationen schonungslos auf, berechnet den Verzerrungsgrad („Lie Factor“) und benennt das Anti-Pattern explizit beim Namen.

---

## 6. Peer Feedback & Evaluation

### 6.1 Eingeholtes Feedback von drei Testpersonen
Wir haben drei Personen befragt, die das Projekt noch nicht kannten:
1. *Person A (Medizinstudentin, 23 Jahre):* Fand den animierten Übergang faszinierend. Feedback: „Ich wusste nicht, wie stark ein Spider-Chart die Relationen verzerrt, nur weil man die Reihenfolge der Achsen vertauscht.“
2. *Person B (Informatikstudent, 21 Jahre):* Lobte das flüssige Morphing, wünschte sich aber die Möglichkeit, eigene CSV-Dateien direkt per Drag-and-Drop hochzuladen.
3. *Person C (Journalismus-Praktikantin, 26 Jahre):* Kritisierte, dass ohne das Diagnose-Panel manchen Laien nicht sofort klar ist, *warum* ein bestimmtes Diagramm methodisch falsch ist.

### 6.2 Einbindung des Feedbacks in den Gegenstand
- Integration eines prominenten **CSV-Dropzones** im Floating Dock.
- Einbau eines dezenten **Alert-Pills ("Anti-Pattern erkannt")** direkt am Diagramm, das neugierig macht und das Diagnose-Panel mit einem Klick öffnet.

### 6.3 Limitationen des Feedbacks
- Alle drei Testpersonen stammten aus dem direkten universitären Umfeld (jung, akademisch, hohe Grundbildung, ohne Seh- oder Mobilitätseinschränkungen).

### 6.4 Vier zusätzliche Gruppen, deren Feedback wichtig wäre
1. **Menschen mit Seh- und Farbfehlsichtigkeiten (z. B. Rot-Grün-Schwäche):** Um die Lesbarkeit von Graustufen und Kobaltblau-Kontrasten unabhängig von Farben zu testen.
2. **Schüler_innen der Sekundarstufe 1 (12–14 Jahre):** Um zu evaluieren, ob das Tool die visuelle Medienkompetenz bereits im frühen Alter nachhaltig stärken kann.
3. **Professionelle Data Scientists / Statistiker_innen:** Um die mathematische Korrektheit der Diagnose-Kriterien und Skalenverzerrungen auf Peer-Review-Niveau zu prüfen.
4. **Senior_innen mit geringer digitaler Vorerfahrung:** Um die intuitive Bedienbarkeit des Floating Docks und der interaktiven Gesten auf Touchscreens zu validieren.

---

## 7. Finaler Gegenstand

Der finale Gegenstand ist die voll funktionsfähige Web-Applikation **Chart-Explorer**:
- **Hosting & Technologie:** Next.js mit TypeScript, Apache ECharts, Tailwind CSS.
- **Kern-Features:**
  1. *Universal Transition Engine:* Reibungslose Animation von Datenmarken beim Wechsel zwischen Balken-, Linien-, Scatter-, Pie-, Radar-, Treemap- und Heatmap-Diagrammen.
  2. *Dual-Modus:* Umschaltbar zwischen fokussiertem Hero-Canvas und Side-by-Side Split-View.
  3. *Wissenschaftliche Datensätze:* 7 vorkonfigurierte Studien inklusive zentraler Informatik- und KI-Datensätze (LLM-Skalierung/MMLU-Benchmark, Laufzeitkomplexität von Sortieralgorithmen, Modulgröße & Code-Komplexität von Browser-Engines sowie Klimatologie, Sozioökonomie, Medizin und Biodiversität) + CSV-Uploader.
  4. *Anti-Pattern Diagnostic Drawer:* Wissenschaftliche Aufschlüsselung nach Tufte & Cleveland-McGill.
  5. *Claude-inspiriertes Design:* Weißer Hintergrund, mattschwarze Strukturen, kobaltblaue Akzente, barrierefreie Typografie, Floating Pill-Dock.

---

## 8. Richtlinien & Gesetzliche Rahmenbedingungen

Sollte Chart-Explorer als offizielles Tool an Universitäten oder im öffentlichen Bildungssektor ausgerollt werden, müssen folgende Richtlinien etabliert werden:
1. **Barrierefreiheit (Web Accessibility Directive / BITV 2.0 / WCAG 2.2 AA):**
   - Pflicht zur Bereitstellung alternativer Textbeschreibungen und tabellarischer Rohdaten (Screenreader-Kompatibilität).
   - Mindestkontrastverhältnis von 4.5:1 für alle Text- und UI-Elemente.
2. **Datenschutz & DSGVO-Konformität:**
   - Eigene CSV-Uploads müssen zu 100 % clientseitig im Browser-Speicher verarbeitet werden; es dürfen keine Forschungsdaten auf externe Server übertragen werden.
3. **Open Educational Resources (OER) & Open Science:**
   - Der Quellcode und die kuratierten Datensätze werden unter der MIT-Lizenz bzw. Creative Commons (CC-BY 4.0) veröffentlicht, um Reproduzierbarkeit im Sinne guter wissenschaftlicher Praxis sicherzustellen.

---

## 9. Reflexion & Denkweisen

### 9.1 Bedeutung von Creative Thinking & Scientific Thinking im Studium und Beruf
- **Scientific Thinking** lehrte uns in diesem Projekt, Annahmen niemals ungeprüft zu übernehmen. Eine Visualisierung ist keine neutrale Abbildung der Realität, sondern eine mathematische Transformation, die systematischen Verzerrungen unterliegt. Die formale Präzision von Datentypen, Skalenniveaus und empirischen Wahrnehmungsgesetzen bildet das unverzichtbare Fundament jeglicher Informatikarbeit.
- **Creative Thinking** war der Schlüssel, um diese trockene Theorie in eine greifbare Erfahrung zu verwandeln. Erst durch das bewusste, subversive Brechen von Gestaltungsregeln und das Designen von absichtlich fehlerhaften Darstellungen („Anti-Patterns“) entstand ein nachhaltiger Lerneffekt. Die kreative Konzeption des animierten Morphings überbrückt die mentale Kluft zwischen abstrakten Zahlen und visueller Kognition.
- Im zukünftigen Berufsleben als Informatiker_innen werden wir komplexe Systeme nicht nur technisch fehlerfrei bauen (Scientific), sondern Schnittstellen so gestalten müssen, dass Menschen sie intuitiv verstehen und vor Fehlentscheidungen geschützt werden (Creative).

### 9.2 Zufriedenheit mit der Arbeit
Wir sind mit dem Ergebnis des Miniprojekts 2 außerordentlich zufrieden. Die Symbiose aus didaktisch-theoretischem Fundament und einer ästhetisch hochwertigen, interaktiven Web-Anwendung demonstriert eindrucksvoll die Kernziele der Lehrveranstaltung *Denkweisen der Informatik*.
