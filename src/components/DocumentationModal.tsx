import React from 'react';
import { X, Copy, Check } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      document.getElementById('doc-content')?.innerText || ''
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] border border-matte-border shadow-dock flex flex-col relative overflow-hidden">
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-matte-border flex items-center justify-between bg-white shrink-0">
          <div>
            <h3 className="text-base font-semibold text-matte-black font-sans">
              Miniprojekt 2 — Dokumentation
            </h3>
            <p className="text-xs text-matte-muted">
              187.B12 Denkweisen der Informatik • TU Wien • Creative & Scientific Thinking
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-matte-border bg-white hover:bg-matte-subtle text-matte-black transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-matte-muted hover:text-matte-black hover:bg-matte-subtle transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Doc Body */}
        <div id="doc-content" className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-matte-black leading-relaxed font-sans">
          {/* Metadata Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-matte-subtle border border-matte-border font-mono text-[11px]">
            <div>
              <span className="text-matte-muted block">Gruppe:</span>
              <strong className="text-matte-black">Oliver Knapp & Roman Krebs</strong>
            </div>
            <div>
              <span className="text-matte-muted block">Matrikelnummern:</span>
              <span className="text-matte-black">12616937, 12620369</span>
            </div>
            <div>
              <span className="text-matte-muted block">Tutor_innen:</span>
              <span className="text-matte-black">Jessica Arabi, Bidha Shrestha</span>
            </div>
            <div>
              <span className="text-matte-muted block">Denkweisen:</span>
              <span className="text-cobalt font-semibold">Creative & Scientific</span>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h4 className="text-sm font-bold text-matte-black uppercase tracking-wider font-mono border-b pb-1">
              1. Ideensammlung & Themenfindung
            </h4>
            <p>
              Im Vorfeld haben wir 6 individuelle Einzelideen formuliert (3 von Oliver Knapp, 3 von Roman Krebs), die das Zusammenspiel von <strong>Scientific Thinking</strong> und <strong>Creative Thinking</strong> untersuchen:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-matte-muted">
              <li><strong className="text-matte-black">Idee 1 (Gewählt): Chart-Explorer</strong> — Interaktive Sandbox, die wissenschaftliche Datensätze bewusst in unpassende Diagrammtypen zwingt, um visuelle Verzerrung („Anti-Patterns“) durch flüssiges Morphing erfahrbar zu machen.</li>
              <li><strong className="text-matte-black">Idee 2: Generativer Klimadaten-Klang- und Kunst-Generator</strong> — Verworfen wegen diffuser didaktischer Zielsetzung.</li>
              <li><strong className="text-matte-black">Idee 3: Gamifizierter P-Hacking-Simulator</strong> — Verworfen wegen zu hohem mathematischem Pipeline-Aufwand.</li>
              <li><strong className="text-matte-black">Idee 4: Algorithmen-Verhalten Workbench</strong> — Verworfen wegen existierender Standard-Lösungen (Visualgo).</li>
              <li><strong className="text-matte-black">Idee 5: Kognitiver Bias-Detektor für Umfragedaten</strong> — Verworfen wegen mangelnder Probanden-Erhebungsmöglichkeiten.</li>
              <li><strong className="text-matte-black">Idee 6: Simulator für evolutionäre Schwarmintelligenz</strong> — Verworfen wegen zu geringem Alltagsbezug für Data Literacy.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h4 className="text-sm font-bold text-matte-black uppercase tracking-wider font-mono border-b pb-1">
              2. State of the Art & Abgrenzung
            </h4>
            <p>
              Existierende Kataloge (The Data Visualisation Catalogue, Data Viz Project, FT Visual Vocabulary) zeigen ausschließlich statische Musterbeispiele für „gute“ Visualisierungen. Sie demonstrieren jedoch <strong>nicht das reale, methodische Scheitern</strong> eines falschen Diagrammtyps am selben Datensatz.
            </p>
            <p>
              Chart-Explorer grenzt sich ab durch: <strong>(1) Aktive Anti-Pattern Sandbox</strong>, <strong>(2) Animiertes Morphing mit ECharts Universal Transitions</strong>, <strong>(3) Side-by-Side Split View</strong> und <strong>(4) On-Demand Fehlerdiagnose</strong> nach Edward Tufte und Cleveland & McGill.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h4 className="text-sm font-bold text-matte-black uppercase tracking-wider font-mono border-b pb-1">
              3. Peer Feedback & Didaktische Validierung
            </h4>
            <p>
              Feedback von 3 Testpersonen aus dem universitären Umfeld führte zur direkten Integration eines CSV-Uploaders sowie eines dezenten Hinweises bei erkannten Anti-Patterns. Für weiterführende Validierung wurden 4 spezifische Gruppen identifiziert:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-matte-muted">
              <li>Menschen mit Seh- und Farbfehlsichtigkeiten (Barrierefreiheit & WCAG).</li>
              <li>Schüler_innen der Sekundarstufe (Frühe Medien- und Datenkompetenz).</li>
              <li>Professionelle Data Scientists (Mathematische Exaktheit der Diagnose-Kriterien).</li>
              <li>Senior_innen mit geringer digitaler Vorerfahrung (Bedienbarkeit des Floating Docks).</li>
            </ol>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-matte-border bg-white flex items-center justify-between shrink-0">
          <span className="text-[11px] text-matte-muted font-mono">
            Vollständige Markdown-Fassung in: <code>DOKUMENTATION.md</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-matte-black text-white hover:bg-zinc-800 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
