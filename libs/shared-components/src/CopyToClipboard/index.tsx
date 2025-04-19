import { LucideCopy } from 'lucide-react';

type CopyToClipboardProps = {
  content: string;
};

export function CopyToClipboard({ content }: CopyToClipboardProps) {
  async function handleCopyClick() {
    await navigator.clipboard.writeText(content);
  }

  return (
    <div className="absolute top-3 right-3">
      <button onClick={handleCopyClick}>
        <LucideCopy width={24} />
      </button>
    </div>
  );
}
