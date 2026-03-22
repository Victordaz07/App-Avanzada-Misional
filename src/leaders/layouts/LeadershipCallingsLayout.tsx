/**
 * Área de contenido principal bajo /leaders/app/* (menta, ancho máximo).
 * La barra inferior y el sync viven en LeadersTabShell.
 */

import React from 'react';
import './LeadershipCallingsLayout.css';

interface LeadershipCallingsLayoutProps {
  children: React.ReactNode;
}

export default function LeadershipCallingsLayout({
  children,
}: LeadershipCallingsLayoutProps): JSX.Element {
  return (
    <div className="leadership-callings-layout">
      <main className="leadership-callings-content">{children}</main>
    </div>
  );
}
