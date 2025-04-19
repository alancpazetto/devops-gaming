import { useEffect } from 'react';
import hljs from 'highlight.js';

type HighlightProps = {
  value: string;
};

let mounted = false;
function mount() {
  if (!mounted) {
    hljs.highlightAll();
    mounted = true;
  }
}

export function Highlight({ value }: HighlightProps) {
  useEffect(() => {
    mount();
  });

  return (
    <pre>
      <code className="language-yaml group-hover:bg-slate-900">{value}</code>
    </pre>
  );
}
