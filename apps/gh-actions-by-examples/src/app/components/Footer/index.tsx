import { Fragment } from 'react/jsx-runtime';
import { m } from '../../../paraglide/messages';

export function Footer() {
  return (
    <footer className="mt-10 px-6">
      <p className="text-sm">
        {m.createdBy()}{' '}
        <a target="_blank" rel="noreferrer" href="https://alancpazetto.com">
          Alan Pazetto
        </a>{' '}
        |{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/mmcgrana/gobyexample"
        >
          {m.source()}
        </a>{' '}
        |{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/mmcgrana/gobyexample"
        >
          {m.license()}
        </a>{' '}
        | {m.inspiredByGoByExample()}{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/mmcgrana/gobyexample#license"
        >
          Go by Example
        </a>
      </p>
    </footer>
  );
}
