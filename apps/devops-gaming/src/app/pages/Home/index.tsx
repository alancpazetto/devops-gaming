import { yaml } from '@codemirror/lang-yaml';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import { SetStateAction, useCallback, useState } from 'react';

export function Home() {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val: SetStateAction<string>) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-around items-center w-full p-5">
          <h1 className="text-2xl">Tutorial</h1>
          <div>
            <button>asdas</button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ReactCodeMirror
          value={value}
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
