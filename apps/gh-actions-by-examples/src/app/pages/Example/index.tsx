import {
  CopyToClipboard,
  ErrorMessage,
  Highlight,
} from '@devops-gaming/shared-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EXAMPLES } from '../../../constants/examples';
import { m } from '../../../paraglide/messages';
import { getLocale } from '../../../paraglide/runtime';

type ExampleJson = {
  comment: string;
  content: string;
};

export function ExamplePage() {
  const { example: exampleParam } = useParams<{ example?: string }>();
  const example = useMemo(() => {
    if (!exampleParam || !EXAMPLES.includes(exampleParam)) {
      return EXAMPLES[0];
    }

    return exampleParam;
  }, [exampleParam]);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState<ExampleJson[]>([]);
  const locale = useMemo(() => getLocale(), []);

  const loadExample = useCallback(() => {
    import(`../../../examples/${locale}/${example}.json?raw`)
      .then((res) => {
        const parsedJson = JSON.parse(res.default) as unknown as ExampleJson[];

        setCode(
          parsedJson.reduce((acc, item) => `${acc}\n${item.content}`, '')
        );
        setCodeBlocks(parsedJson);
      })
      .catch(() => {
        setError(true);
      });
  }, [example, locale]);

  useEffect(() => {
    loadExample();
  }, [loadExample]);

  return (
    <div>
      {error ? (
        <ErrorMessage
          onRetry={() => {
            loadExample();
          }}
        />
      ) : (
        <table
          className="w-full border-collapse"
          border={0}
          cellPadding={0}
          cellSpacing={0}
        >
          <tbody>
            {codeBlocks.map((item, key) => (
              <tr className="group" key={key}>
                <td
                  className="group-hover:bg-[rgba(0,0,0,0.1)] w-1/2 whitespace-pre-line px-6 pt-2"
                  valign="top"
                >
                  {item.comment}
                </td>
                <td className="relative">
                  <Highlight value={item.content} />
                  {key === 0 && <CopyToClipboard content={code} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="px-6 mt-8">
        {m.nextExample()} <a href="/page">Secrets</a>
      </div>
    </div>
  );
}
