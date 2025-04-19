import { yaml } from '@codemirror/lang-yaml';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';

type CodeBlockProps = {
  value: string;
};

export function CodeBlock({ value }: CodeBlockProps) {
  return (
    <ReactCodeMirror
      value={value}
      extensions={[yaml()]}
      theme={dracula}
      editable={false}
      className="rounded-md overflow-hidden my-5"
    />
  );
}
