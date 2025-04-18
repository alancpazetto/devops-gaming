import { yaml } from '@codemirror/lang-yaml';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Markdown } from '../../components/Markdown';

import { getLocale } from '../../../paraglide/runtime';
import { useStepsProvider } from '../../providers/StepsProvider';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';

const example = `name: Example

on:
  push:
    branches:
      - main
`;

type File = {
  name: string;
  path: string;
  language: ReturnType<typeof yaml>;
  content: string;
};

const files: Record<string, File> = {
  'index.js': {
    name: 'test.yaml',
    path: '.gtihub/workflows/',
    language: yaml(),
    content: example,
  },
  'utils.js': {
    name: 'utils.js',
    path: './',
    language: yaml(),
    content: `example: test`,
  },
};

const content = `O GitHub Actions é uma poderosa ferramenta de automação que permite que você crie pipelines de CI/CD diretamente no seu repositório GitHub.

Isso significa que você pode rodar testes, builds, deploys e muito mais automaticamente, toda vez que algo acontece no seu código — como um \`push\` ou um \`merge pull request\`.

\`\`\`yaml
name: Example
\`\`\`

`;

export function Home() {
  const { currentMarkdown } = useStepsProvider();

  const [value, setValue] = useState('# arquivo yaml');
  const onChange = useCallback((val: SetStateAction<string>) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  const [activeFile, setActiveFile] = useState('index.js');
  const [fileContents, setFileContents] = useState(files);

  const handleChange = (value) => {
    setFileContents((prev) => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        content: value,
      },
    }));
  };

  const currentFile = files[activeFile];
  const locale = getLocale();

  const [mark, setMark] = useState('');

  useEffect(() => {
    import(`../../steps/${locale}/1/content.md?raw`).then((res) => {
      setMark(res.default);
    });
  }, [locale]);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="flex-1 overflow-y-auto flex flex-col h-full bg-gray-100 relative p-5 gap-10">
        <div className="flex justify-around items-center w-full">
          <div className="flex flex-col items-start gap-2 flex-1">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-gray-300">
              1. Fundamentos
            </span>

            <h1 className="text-2xl font-bold">O que é GitHub Actions?</h1>
          </div>
          <div className="w-fit flex justify-around gap-4">
            <div className="inline-flex rounded-md shadow-xs" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <LuChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                1/30
              </span>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <LuChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 tutorial-content">
          {currentMarkdown !== '' ? (
            <LoadingSkeleton />
          ) : (
            <Markdown>{currentMarkdown}</Markdown>
          )}

          <div className="mt-16 flex justify-end gap-4">
            <button
              type="button"
              className="gap-2 text-center inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <LuChevronLeft size={20} />
              Back
            </button>
            <button
              type="button"
              className="gap-2 text-center inline-flex items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Next step
              <LuChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="">asd</div>
      </div>
      <div className="flex-1">
        <div className="flex space-x-2 px-1 pt-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
          {Object.keys(files).map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-4 py-1  text-sm transition-all duration-150
              ${
                file === activeFile
                  ? 'bg-[#1e1e1e] text-white border-l border-r border-t border-[#3c3c3c]'
                  : 'bg-[#2d2d2d] text-gray-400 hover:text-white'
              }`}
            >
              <span className="opacity-70">{files[file].path}</span>
              {files[file].name}
            </button>
          ))}
        </div>
        <ReactCodeMirror
          value={currentFile.content}
          height="100%"
          style={{
            height: '100vh',
          }}
          extensions={[yaml()]}
          onChange={onChange}
          theme={dracula}
        />
      </div>
    </div>
  );
}
