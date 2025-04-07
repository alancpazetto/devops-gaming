import { yaml } from '@codemirror/lang-yaml';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import { SetStateAction, useCallback, useState } from 'react';
import { CodeBlock } from '../../components/CodeBlock';
import {
  LuArrowLeft,
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';

import * as m from '../../../paraglide/messages';

const example = `name: Example

on:
  push:
    branches:
      - main
`;

const files = {
  'index.js': {
    name: 'index.js',
    language: yaml(),
    content: example,
  },
  'utils.js': {
    name: 'utils.js',
    language: yaml(),
    content: `example: test`,
  },
};

export function Home() {
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

  const currentFile = files[activeFile] as any;

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="flex justify-around items-center w-full p-5">
          <h1 className="text-2xl flex-1 font-bold">
            Welcome {m.example_message({ username: 'asdasdas' })}
          </h1>
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
        <div className="p-5">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, ad consectetur eaque natus aliquid cupiditate sint,
            eveniet, molestias voluptatibus voluptatem iusto placeat eligendi
            facere labore perferendis! Cum non saepe inventore?
          </p>

          <CodeBlock value={example} />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nihil quia odio quam quidem quisquam similique dignissimos, ipsam
            porro! Harum recusandae adipisci impedit, corrupti rerum explicabo
            aperiam cupiditate dicta earum.
          </p>

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
              {file}
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
