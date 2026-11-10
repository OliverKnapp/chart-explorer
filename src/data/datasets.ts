import { Dataset } from '../types';

export const CURATED_DATASETS: Dataset[] = [
  {
    id: 'climate-anomaly',
    title: 'Globale Temperaturanomalie (1880–2024)',
    field: 'Klimatologie & Atmosphärenphysik',
    description: 'Jährliche Abweichung der globalen kombinierten Land- und Ozeantemperaturen im Vergleich zum Mittelwert 1951–1980 in °C.',
    source: 'NASA GISS Surface Temperature Analysis (GISTEMP v4)',
    recommendedType: 'line',
    columns: [
      { key: 'year', label: 'Jahr', type: 'temporal' },
      { key: 'anomaly', label: 'Anomalie (°C)', type: 'numeric', unit: '°C' },
      { key: 'co2', label: 'CO₂-Konzentration (ppm)', type: 'numeric', unit: 'ppm' }
    ],
    data: [
      { year: '1880', anomaly: -0.16, co2: 290 },
      { year: '1890', anomaly: -0.35, co2: 294 },
      { year: '1900', anomaly: -0.08, co2: 296 },
      { year: '1910', anomaly: -0.43, co2: 300 },
      { year: '1920', anomaly: -0.27, co2: 303 },
      { year: '1930', anomaly: -0.15, co2: 307 },
      { year: '1940', anomaly: 0.12, co2: 311 },
      { year: '1950', anomaly: -0.17, co2: 311 },
      { year: '1960', anomaly: 0.03, co2: 317 },
      { year: '1970', anomaly: 0.03, co2: 325 },
      { year: '1980', anomaly: 0.26, co2: 338 },
      { year: '1990', anomaly: 0.45, co2: 354 },
      { year: '2000', anomaly: 0.39, co2: 369 },
      { year: '2010', anomaly: 0.73, co2: 389 },
      { year: '2020', anomaly: 1.02, co2: 414 },
      { year: '2024', anomaly: 1.28, co2: 424 }
    ],
    diagnostics: {
      line: {
        status: 'optimal',
        headline: 'Optimal: Kontinuierliche zeitliche Dynamik präzise abgebildet',
        critique: 'Die fortlaufende x-Achse vermittelt die zeitliche Kontinuität und Richtungsänderung intuitiv. Steigungen spiegeln reale Raten der Erwärmung wider.',
        scientificReference: 'Cleveland & McGill (1984): Position entlang einer gemeinsamen Skala bietet die höchste Dekodierungsgenauigkeit.',
        lieFactorEstimate: '1.00 (Verzerrungsfrei)',
        cognitiveIssues: ['Minimale visuelle Artefakte', 'Keine kognitive Fehlzuweisung']
      },
      bar: {
        status: 'acceptable',
        headline: 'Akzeptabel: Diskrete Jahresvergleiche, jedoch schwächere Trend-Kognition',
        critique: 'Balken eignen sich für diskrete Vergleiche. Bei kontinuierlichen Zeitreihen lenken jedoch die einzelnen Balkenkörper und Abstände von der Gesamttrendlinie ab.',
        scientificReference: 'Edward Tufte: Höhere Daten-Tinte-Dichte bei Linien gegenüber unnötiger Balkenfüllfläche.',
        lieFactorEstimate: '1.05 (Leichte Verzerrung durch Nullpunktfixierung)',
        cognitiveIssues: ['Segmentierung kontinuierlicher Prozesse', 'Erhöhter visueller Ballast (Data-Ink Ratio sinkt)']
      },
      scatter: {
        status: 'acceptable',
        headline: 'Akzeptabel: Reine Messwertverteilung ohne implizierte Interpolation',
        critique: 'Zeigt die Messpunkte exakt, erfordert jedoch im Kopf des Betrachters das selbstständige Ziehen einer mentalen Trendlinie.',
        scientificReference: 'Bertin (1983): Punktmarken ohne Verbindungslinien betonen Einzelereignisse vor Serienmustern.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Fehlende optische Führung für Trends']
      },
      pie: {
        status: 'absurd',
        headline: 'Katastrophal / Absurd: Zeitreihe im Kreis diagrammiert',
        critique: 'Kreisdiagramme codieren relative Anteile an einem festen 100%-Ganzen. Jahrestemperaturen und negative Anomalien besitzen keine additive Gesamtsumme! Ein Winkel von 25° für das Jahr 1910 ist semantischer Unsinn.',
        scientificReference: 'Cairo (2019): "How Charts Lie" — Falsche Metapher (Teil-Ganzes statt Zeitdynamik).',
        lieFactorEstimate: '> 3.50 (Extrem irreführend)',
        cognitiveIssues: [
          'Negative Werte können geometrisch nicht als Kuchenstück dargestellt werden',
          'Winkelwahrnehmung ist kognitiv ungenau',
          'Zyklische Form impliziert fälschlicherweise eine Jahreszeiten-Wiederholung'
        ]
      },
      radar: {
        status: 'misleading',
        headline: 'Irreführend: Scheinbare zyklische Abhängigkeit & Flächenverzerrung',
        critique: 'Ein Spinnendiagramm verbindet Jahreswerte zu einem Vieleck. Die umschlossene Fläche wächst quadratisch mit dem Radius, wodurch jüngere Werte massiv überproportional dramatisiert werden.',
        scientificReference: 'Tufte (1983): Täuschung durch Flächenskalierung statt Längenskalierung (Lie Factor = Bereichsgleichung).',
        lieFactorEstimate: '2.40 (Starke optische Übertreibung)',
        cognitiveIssues: [
          'Verbinden des letzten Jahres (2024) mit dem ersten (1880) erzeugt einen fiktiven Ringschluss',
          'Fläche suggeriert ein Gesamtvolumen, das physikalisch nicht existiert'
        ]
      },
      treemap: {
        status: 'misleading',
        headline: 'Fehlgeleitet: Zeitreihe als verschachtelte Flächenkacheln',
        critique: 'Treemaps sind für hierarchische Mengendaten (z. B. Ordnerstrukturen oder Budgets) gedacht. Zeitreihen verlieren hier jegliche chronologische Ordnung.',
        scientificReference: 'Shneiderman (1992): Treemap Layouts eliminieren lineare Orientierung zugunsten von Packungsdichte.',
        lieFactorEstimate: '2.10',
        cognitiveIssues: ['Vollständiger Verlust der Zeitachse', 'Rechteckflächen sind schwer vergleichend ablesbar']
      },
      heatmap: {
        status: 'acceptable',
        headline: 'Bedingt nutzbar: Temperatur-Farbkodierung ("Warming Stripes")',
        critique: 'Farben können Temperaturerhöhungen intuitiv verdeutlichen, quantitative Zahlenwerte lassen sich aus Farbtönen aber nur mit hoher Fehlerrate ablesen.',
        scientificReference: 'Cleveland & McGill: Farbsättigung rangiert auf dem niedrigsten Rang menschlicher Schätzgenauigkeit.',
        lieFactorEstimate: '1.20',
        cognitiveIssues: ['Farbinterpretation variiert subjektiv und ist anfällig für Sehschwächen']
      }
    }
  },
  {
    id: 'income-education',
    title: 'Bildungsabschluss & Medianeinkommen (EU/DACH)',
    field: 'Wirtschafts- & Sozialwissenschaften',
    description: 'Medianes monatliches Nettoeinkommen in EUR nach höchstem formalen Bildungsabschluss.',
    source: 'Statistik Austria & Eurostat Survey on Income and Living Conditions (EU-SILC)',
    recommendedType: 'bar',
    columns: [
      { key: 'education', label: 'Bildungsabschluss', type: 'categorical' },
      { key: 'income', label: 'Nettoeinkommen (€)', type: 'numeric', unit: '€' },
      { key: 'share', label: 'Bevölkerungsanteil (%)', type: 'numeric', unit: '%' }
    ],
    data: [
      { education: 'Pflichtschule', income: 1650, share: 18 },
      { education: 'Lehre / BMS', income: 2320, share: 36 },
      { education: 'AHS / BHS Matura', income: 2780, share: 22 },
      { education: 'Bachelor', income: 3100, share: 11 },
      { education: 'Master / Diplom', income: 3850, share: 10 },
      { education: 'Promotion (PhD)', income: 4600, share: 3 }
    ],
    diagnostics: {
      bar: {
        status: 'optimal',
        headline: 'Optimal: Diskreter kategorialer Vergleich mit klarer Basiskante',
        critique: 'Balken ermöglichen den direkten Vergleich von Beträgen auf einer gemeinsamen Skala. Diskrete Bildungsstufen bleiben klar voneinander getrennt.',
        scientificReference: 'Cleveland & McGill (1984): Position auf gemeinsamer Skala ist ideal für kategoriale Rangvergleiche.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Keine — saubere Entsprechung von Daten und Geometrie']
      },
      line: {
        status: 'misleading',
        headline: 'Irreführend: Vortäuschung einer kontinuierlichen Funktion',
        critique: 'Eine Linie verbindet diskrete Bildungsstufen und suggeriert, es gäbe kontinuierliche Zwischenzustände (z. B. "Bachelor 1.5").',
        scientificReference: 'Cairo (2019): Linien erzeugen in der Wahrnehmung eine automatische Vorstellung von zeitlichem oder physikalischem Fluss.',
        lieFactorEstimate: '1.40',
        cognitiveIssues: ['Scheinbare Kontinuität zwischen diskreten institutionellen Abschlüssen']
      },
      scatter: {
        status: 'acceptable',
        headline: 'Akzeptabel: Diskrete Punkte ohne verbindende Interpolation',
        critique: 'Vermeidet die Fehlinterpretation von Linien, lässt jedoch den visuellen Hebel der Balkenhöhe vermissen.',
        scientificReference: 'Wilkinson (2005): "The Grammar of Graphics" — Punktsymbole für Punktwerte.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Geringere visuelle Prägnanz']
      },
      pie: {
        status: 'absurd',
        headline: 'Absurd: Einkommen der Gruppen als Tortendiagramm addiert',
        critique: 'Einkommen verschiedener Gruppen dürfen nicht zu einer Gesamtsumme aufsummiert und in 360° aufgeteilt werden. Das erweckt den falschen Eindruck, ein Bildungsabschluss besitze einen "Marktanteil" am gesamten Einkommen.',
        scientificReference: 'Tufte (1983): "Pie charts should never be used" — Unzulässige Addition von Intensivgrößen.',
        lieFactorEstimate: '2.80',
        cognitiveIssues: ['Kategoriale Einheiten werden als Prozentanteile missverstanden', 'Schlechte visuelle Differenzierung']
      },
      radar: {
        status: 'misleading',
        headline: 'Irreführend: Scheinpolygon ohne inhärente Achsenmetrik',
        critique: 'Die Fläche des Spinnennetzes hängt willkürlich davon ab, in welcher Reihenfolge die Bildungsabschlüsse im Kreis angeordnet sind.',
        scientificReference: 'Few (2005): Radar Charts verzerren multivariate Vergleiche durch polygonale Flächenillusion.',
        lieFactorEstimate: '2.20',
        cognitiveIssues: ['Flächengröße hängt von willkürlicher Nachbarschaft der Achsen ab']
      },
      treemap: {
        status: 'acceptable',
        headline: 'Suboptimal: Verschachtelte Kacheln für einfache Rangdaten überflüssig',
        critique: 'Da keine Subkategorien existieren, ist die Kachelhierarchie visuell übertrieben.',
        scientificReference: 'Shneiderman: Treemaps entfalten ihren Nutzen erst bei mehrstufigen Hierarchien.',
        lieFactorEstimate: '1.30',
        cognitiveIssues: ['Flächenvergleich schwieriger als Längenvergleich']
      },
      heatmap: {
        status: 'misleading',
        headline: 'Irreführend: Pseudo-Matrix bei eindimensionalen Zielwerten',
        critique: 'Eine Heatmap benötigt typischerweise eine $X \times Y$ Matrix. Eine einfache Farbzeile ist einem Balkendiagramm kognitiv deutlich unterlegen.',
        scientificReference: 'Ware (2012): "Information Visualization: Perception for Design".',
        lieFactorEstimate: '1.50',
        cognitiveIssues: ['Schlechte Differenzierung feiner Einkommensunterschiede via Helligkeit']
      }
    }
  },
  {
    id: 'biodiversity-habitat',
    title: 'Gefährdete Arten nach Ökosystem & Taxon',
    field: 'Ökologie & Artenschutz',
    description: 'Anzahl bedrohter Tierarten aufgeschlüsselt nach Lebensraum (Korallenriff, Regenwald, Feuchtgebiete, Tundra) und Tiergruppe.',
    source: 'IUCN Red List of Threatened Species',
    recommendedType: 'treemap',
    columns: [
      { key: 'habitat', label: 'Lebensraum', type: 'categorical' },
      { key: 'taxon', label: 'Tiergruppe', type: 'categorical' },
      { key: 'count', label: 'Bedrohte Arten', type: 'numeric', unit: 'Arten' }
    ],
    data: [
      { habitat: 'Regenwald', taxon: 'Amphibien', count: 1850 },
      { habitat: 'Regenwald', taxon: 'Insekten', count: 2400 },
      { habitat: 'Regenwald', taxon: 'Säugetiere', count: 680 },
      { habitat: 'Korallenriffe', taxon: 'Fische', count: 1420 },
      { habitat: 'Korallenriffe', taxon: 'Wirbellose', count: 980 },
      { habitat: 'Feuchtgebiete', taxon: 'Vögel', count: 1100 },
      { habitat: 'Feuchtgebiete', taxon: 'Amphibien', count: 750 },
      { habitat: 'Tundra', taxon: 'Säugetiere', count: 120 }
    ],
    diagnostics: {
      treemap: {
        status: 'optimal',
        headline: 'Optimal: Zweistufige Hierarchie ideal in Kachelproportionen abgebildet',
        critique: 'Erlaubt sowohl den Vergleich der übergeordneten Habitate als auch der darin verschachtelten Tiergruppen bei 100% Flächenausnutzung.',
        scientificReference: 'Johnson & Shneiderman (1991): Raumfüllende Darstellung hierarchischer Informationsstrukturen.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Keine — intuitive Teil-Ganzes-Hierarchie']
      },
      bar: {
        status: 'acceptable',
        headline: 'Gut: Gruppierte Balken bieten exakte quantitative Vergleiche',
        critique: 'Balken ermöglichen präzise Längenvergleiche, verlieren aber bei vielen Untergruppen den kompakten Gesamtüberblick über das Ökosystem.',
        scientificReference: 'Cleveland & McGill: Balkenlängen sind präziser als Flächenkacheln.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Hohe visuelle Breite bei vielen Subkategorien']
      },
      line: {
        status: 'absurd',
        headline: 'Absurd: Fiktive Linienverbindung zwischen Regenwald und Tundra',
        critique: 'Das Verbinden von diskreten Habitaten mit einer Linie suggeriert einen morphologischen Übergang, der biologisch keinen Sinn ergibt.',
        scientificReference: 'Cairo: Falsche Verwendung linearer Kontinuität auf nominalen Variablen.',
        lieFactorEstimate: '2.50',
        cognitiveIssues: ['Implizierte Reihenfolge existiert in der Natur nicht']
      },
      scatter: {
        status: 'acceptable',
        headline: 'Akzeptabel: Reine Streuung der Punktmengen',
        critique: 'Zeigt Einzelwerte unverbunden, vermittelt jedoch das hierarchische Teil-Ganzes-Gefüge nur schwach.',
        scientificReference: 'Bertin: Nominale Punkte ohne räumliche Einbettung.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Hierarchie ist visuell unsichtbar']
      },
      pie: {
        status: 'misleading',
        headline: 'Irreführend: 8 Kuchenstücke ohne hierarchische Gruppierung',
        critique: 'Zu viele ähnliche Segmente. Das Auge kann feine Winkelunterschiede zwischen 1100 und 980 Arten im Kreis praktisch nicht verlässlich unterscheiden.',
        scientificReference: 'Spence & Lewandowsky (1991): Wahrnehmungslimits bei Multi-Segment-Tortendiagrammen.',
        lieFactorEstimate: '1.80',
        cognitiveIssues: ['Unleserliche Beschriftungen', 'Winkelvergleich scheitert bei ähnlichen Werten']
      },
      radar: {
        status: 'misleading',
        headline: 'Irreführend: Polare Verzerrung biologischer Vielfalt',
        critique: 'Setzt nominale Lebensräume in eine künstliche Winkelbeziehung.',
        scientificReference: 'Tufte: Ungerechtfertigte polygonale Verknüpfung.',
        lieFactorEstimate: '2.10',
        cognitiveIssues: ['Erzeugt ein Spinnennetz ohne physikalischen Radiusbezug']
      },
      heatmap: {
        status: 'optimal',
        headline: 'Sehr gut: Matrix Lebensraum × Tiergruppe',
        critique: 'Ergibt eine saubere 2D-Matrix, in der Farbintensitäten Häufungsschwerpunkte (Hotspots) sofort hervorheben.',
        scientificReference: 'Wilkinson & Friendly (2009): Die Geschichte und Validität der Heatmap.',
        lieFactorEstimate: '1.10',
        cognitiveIssues: ['Genaue Artenzahlen erfordern Tooltip-Hover']
      }
    }
  },
  {
    id: 'clinical-trial',
    title: 'Pharmakokinetik: Wirkstoffdosis vs. Blutplasma-Reaktion',
    field: 'Medizinische Biometrie & Pharmakologie',
    description: 'Messung der Plasma-Wirkstoffkonzentration ($\mu g/ml$) und des Auftretens von Nebenwirkungen bei steigender Dosis (mg).',
    source: 'Klinische Phase-II Dosierungsstudie (anonymisierte biometrische Daten)',
    recommendedType: 'scatter',
    columns: [
      { key: 'dosage', label: 'Dosis (mg)', type: 'numeric', unit: 'mg' },
      { key: 'concentration', label: 'Plasmakonzentration (µg/ml)', type: 'numeric', unit: 'µg/ml' },
      { key: 'adverse', label: 'Nebenwirkungen-Score', type: 'numeric' }
    ],
    data: [
      { dosage: 10, concentration: 1.2, adverse: 0 },
      { dosage: 25, concentration: 2.8, adverse: 1 },
      { dosage: 50, concentration: 5.6, adverse: 2 },
      { dosage: 75, concentration: 8.1, adverse: 4 },
      { dosage: 100, concentration: 10.9, adverse: 7 },
      { dosage: 150, concentration: 14.8, adverse: 12 },
      { dosage: 200, concentration: 17.5, adverse: 22 }
    ],
    diagnostics: {
      scatter: {
        status: 'optimal',
        headline: 'Optimal: Mathematische Korrelation zweier kontinuierlicher Variablen',
        critique: 'Zeigt die nichtlineare Dosis-Wirkungs-Beziehung und erlaubt das Aufdecken von Schwellenwerten oder Ausreißern ohne Annahmen.',
        scientificReference: 'Cleveland (1993): "Visualizing Data" — Scatterplots als Fundament bivariater Assoziationen.',
        lieFactorEstimate: '1.00',
        cognitiveIssues: ['Keine — exakte Koordinatenzuordnung']
      },
      line: {
        status: 'acceptable',
        headline: 'Gut: Dosiskurve zeigt Schwellenwert-Effekt',
        critique: 'Verbindet Messpunkte zu einer Kurve. Problematisch nur, falls Messungenauigkeiten oder individuelle Streuungen geglättet werden.',
        scientificReference: 'Tufte: Linienkurven zur Darstellung kontinuierlicher physikalischer Gesetze.',
        lieFactorEstimate: '1.05',
        cognitiveIssues: ['Mögliche Über-Glättung individueller Streuung']
      },
      bar: {
        status: 'acceptable',
        headline: 'Akzeptabel: Diskrete Dosierungsstufen dargestellt',
        critique: 'Balken eignen sich für feste Testgruppen (z. B. Kohorte 10mg vs Kohorte 50mg), verdecken aber den stetigen pharmakologischen Konzentrationsverlauf.',
        scientificReference: 'Cleveland: Skalenlücken werden durch Balkenbreiten kaschiert.',
        lieFactorEstimate: '1.15',
        cognitiveIssues: ['Unnatürliche Diskretisierung kontinuierlicher Dosen']
      },
      pie: {
        status: 'absurd',
        headline: 'Absurd: Pharmakologische Konzentrationen als Kuchenstücke',
        critique: 'Mikrogramm pro Milliliter aufzusummieren und in 360 Grad aufzuteilen ist methodisch vollkommen unsinnig. Höhere Dosen fressen die Torte auf.',
        scientificReference: 'Cairo: Kategorischer Fehlschluss bei Intensitätsmaßen.',
        lieFactorEstimate: '> 4.00',
        cognitiveIssues: ['Vollkommener Verlust der Korrelation', 'Geometrische Verzerrung toxischer Dosisbereiche']
      },
      radar: {
        status: 'misleading',
        headline: 'Irreführend: Dosisprogression in polarer Schleife gefangen',
        critique: 'Eine lineare Dosissteigerung wird im Kreis dargestellt, sodass die höchste Dosis (200mg) direkt neben der geringsten Dosis (10mg) liegt.',
        scientificReference: 'Few: Falsche Nachbarschaften in zyklischen Diagrammen.',
        lieFactorEstimate: '2.60',
        cognitiveIssues: ['Völlig falsche Nähe zwischen Minima und Maxima']
      },
      treemap: {
        status: 'misleading',
        headline: 'Ungeeignet: Physikalische Messkurve in Rechteckflächen zersplittert',
        critique: 'Die physikalische Kausalität ($Dosis \rightarrow Konzentration$) wird in unverbundene Flächenkacheln zerlegt.',
        scientificReference: 'Shneiderman: Kachelflächen vermitteln keine funktionale Abhängigkeit.',
        lieFactorEstimate: '2.30',
        cognitiveIssues: ['Kausalität und Reihenfolge gehen vollständig verloren']
      },
      heatmap: {
        status: 'acceptable',
        headline: 'Bedingt nutzbar: Toxizitäts-Heatmap',
        critique: 'Kann das Ansteigen des Risikos als Farbgradient darstellen, verliert aber die exakte numerische Plasmakurve.',
        scientificReference: 'Ware (2012): Farbskalen für Risikozonen.',
        lieFactorEstimate: '1.25',
        cognitiveIssues: ['Verlust präziser Messwerte zugunsten qualitativer Färbung']
      }
    }
  }
];
