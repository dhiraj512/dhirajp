'use client';

import { useRef, useState, useEffect } from 'react';
import Icon from '../ui/icon';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface CodeBlockProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> {
  /** set by `rehype-pretty-code` */
  'data-language'?: string;
  /** Maximum height when collapsed (in pixels) */
  collapsedHeight?: number;
}

const CodeBlock = ({ children, collapsedHeight = 200, ...props }: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  const onCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(preRef.current?.textContent ?? '');
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if content height exceeds collapsed height
  useEffect(() => {
    const checkHeight = () => {
      if (preRef.current) {
        const contentHeight = preRef.current.scrollHeight;
        setShowExpandButton(contentHeight > collapsedHeight);
      }
    };

    // Check on mount
    checkHeight();

    // Check on resize (in case of responsive changes)
    const resizeObserver = new ResizeObserver(checkHeight);
    if (preRef.current) {
      resizeObserver.observe(preRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [collapsedHeight, children]);

  return (
    <div>
      <pre
        ref={preRef}
        {...props}
        className="relative not-prose overflow-x-auto text-sm leading-relaxed font-mono !bg-slate-900 transition-all duration-300 ease-in-out"
        style={{
          maxHeight: showExpandButton && !isExpanded ? `${collapsedHeight}px` : 'none',
          overflowY: showExpandButton && !isExpanded ? 'hidden' : 'visible',
        }}
      >
        {children}
      </pre>
      {showExpandButton && !isExpanded && (
        <div className="absolute inset-x-0 -bottom-2 flex h-32 items-center justify-center  bg-gradient-to-t from-slate-900 via-slate-900/80 to-trasparent">
          <button type="button" onClick={toggleExpand} className="absolute bottom-6 text-white cursor-pointer text-base">
            Expand
          </button>
        </div>
      )}

      <div className="absolute top-1 right-1 flex items-center flex-row-reverse">
        <button
          type="button"
          aria-label="Copy code"
          onClick={onCopy}
          className={cn("flex items-center justify-center cursor-pointer ",
            "size-8 hover:bg-neutral-600/40  rounded-md",
            copied ? "text-green-500" : "text-white"
          )}
        >
          {copied ? (
            <Icon.check className="size-4 stroke-[0.25]" />
          ) : (
            <Icon.copy className="size-4 stroke-[0.25]" />
          )}
          <span className="sr-only">Copy code</span>
        </button>
        <Separator orientation="vertical" className="!h-4 w-px mx-1.5 bg-white/60" />
        {showExpandButton && (
          <button
            onClick={toggleExpand}
            type="button"
            aria-label='Toggle code block expansion'
            className="flex items-center justify-center cursor-pointer h-8 px-2 w-fit text-white hover:bg-neutral-600/40 text-sm font-medium rounded-md">
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;