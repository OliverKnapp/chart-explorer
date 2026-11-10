import React from 'react';
import { Lightbulb, Compass, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenDoc: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDoc }) => {
  return (
    <header className="w-full border-b border-matte-border bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-lg bg-matte-black text-white flex items-center justify-center font-serif text-lg font-bold">
            C
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-base font-semibold text-matte-black tracking-tight font-sans">
                Chart-Explorer
              </h1>
              <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-matte-subtle text-matte-muted border border-matte-border">
                v1.0 • TU Wien
              </span>
            </div>
            <p className="text-xs text-matte-muted hidden sm:block">
              187.B12 Denkweisen der Informatik • Miniprojekt 2
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Denkweisen Badges */}
          <div className="hidden md:flex items-center space-x-1.5 mr-2">
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-matte-subtle text-matte-black border border-matte-border font-medium">
              <Lightbulb className="w-3 h-3 text-cobalt" />
              Creative Thinking
            </span>
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-matte-subtle text-matte-black border border-matte-border font-medium">
              <Compass className="w-3 h-3 text-matte-black" />
              Scientific Thinking
            </span>
          </div>

          <button
            onClick={onOpenDoc}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-matte-black hover:text-cobalt bg-white hover:bg-matte-subtle border border-matte-border px-3 py-1.5 rounded-lg transition-colors shadow-subtle"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Dokumentation</span>
          </button>
        </div>
      </div>
    </header>
  );
};
