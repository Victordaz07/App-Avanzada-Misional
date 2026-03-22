import React from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getScriptureByReference } from '../../../modules/investigator/data/scriptures';
import './CanonicalScriptureExcerpt.css';

export interface CanonicalScriptureExcerptProps {
  reference: string;
  className?: string;
}

export function CanonicalScriptureExcerpt({
  reference,
  className = '',
}: CanonicalScriptureExcerptProps): JSX.Element {
  const { locale } = useI18n();
  const scripture = getScriptureByReference(reference, locale);

  if (!scripture) {
    return (
      <p className={`canonical-scripture-excerpt canonical-scripture-excerpt--missing ${className}`.trim()}>
        {locale === 'es'
          ? 'Abre la referencia para leer la escritura canónica completa.'
          : 'Open the reference to read the full canonical scripture.'}
      </p>
    );
  }

  if (scripture.verses && scripture.verses.length > 0) {
    return (
      <div className={`canonical-scripture-excerpt ${className}`.trim()}>
        {scripture.verses.map((verse) => (
          <p key={verse.verse} className="canonical-scripture-excerpt__verse">
            <span className="canonical-scripture-excerpt__number">{verse.verse}</span>{' '}
            {verse.text}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p className={`canonical-scripture-excerpt ${className}`.trim()}>
      {scripture.text}
    </p>
  );
}
