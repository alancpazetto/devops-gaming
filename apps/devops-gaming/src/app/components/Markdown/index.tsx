/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../CodeBlock';
import { useEffect, useState } from 'react';
import { getLocale } from '../../../paraglide/runtime';

type MarkdownProps = {
  children: string;
};

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className="text-4xl font-bold text-gray-900 mt-10 mb-6 border-b pb-2 border-gray-200"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="text-3xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-1"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="text-2xl font-medium text-gray-800 mt-6 mb-3"
            {...props}
          />
        ),
        h4: ({ node, ...props }) => (
          <h4
            className="text-xl font-medium text-gray-700 mt-5 mb-2"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p
            className="text-base leading-relaxed text-gray-700 mb-4"
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul
            className="list-disc list-inside text-gray-700 mb-4 space-y-1"
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            className="list-decimal list-inside text-gray-700 mb-4 space-y-1"
            {...props}
          />
        ),
        li: ({ node, ...props }) => (
          <li className="ml-4 text-gray-700" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 bg-gray-50 py-2 px-3 rounded-md my-4"
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline font-medium" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-semibold text-gray-900" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic text-gray-800" {...props} />
        ),
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <CodeBlock value={String(children).replace(/\n$/, '')} />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        // img: (props) => <AsyncImg {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function AsyncImg(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const [src, setSrc] = useState(props.src);
  const locale = getLocale();

  useEffect(() => {
    import(`../../steps/${locale}/1/${props.src}?raw`).then((res) => {
      setSrc(res.default);
      console.log(res.default);
    });
  }, [locale, props.src]);

  return <img {...props} alt={props.alt || 'image'} />;
}
