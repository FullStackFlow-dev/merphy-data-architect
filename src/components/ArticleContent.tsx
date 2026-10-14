import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const components: Components = {
  pre: ({ children }) => (
    <div className="code-block my-5 overflow-hidden rounded-lg border border-border">
      <pre className="overflow-x-auto p-4 text-sm leading-6">{children}</pre>
    </div>
  ),
};

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="space-y-5 break-words leading-7 text-foreground [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
