import type { MDXComponents } from 'mdx/types'
import * as runtime from 'react/jsx-runtime';
import CodeBlock from './code-block';
import CodeBlockHeader from './code-block-header';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../ui/icon';

// Custom Table Component
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800" {...props}>
            {children}
        </table>
    </div>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50 dark:bg-gray-900/50" {...props}>
        {children}
    </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800" {...props}>
        {children}
    </tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" {...props}>
        {children}
    </tr>
);

const TableHead = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        {...props}
    >
        {children}
    </th>
);

const TableCell = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100" {...props}>
        {children}
    </td>
);

const sharedComponents = {
    // Headings
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className="mb-6 mt-8 text-2xl font-bold leading-tight  first:mt-0 sm:text-3xl md:text-4xl"
            {...props}
        >
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className="mb-4 mt-8 text-xl font-semibold leading-tight  first:mt-0 sm:text-2xl md:text-3xl"
            {...props}
        >
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className="mb-3 mt-6 text-lg font-medium leading-tight  first:mt-0 sm:text-xl md:text-2xl"
            {...props}
        >
            {children}
        </h3>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className="mb-2 mt-4 text-base font-semibold leading-tight  first:mt-0 sm:text-lg md:text-xl"
            {...props}
        >
            {children}
        </h4>
    ),
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="rounded-sm border border-primary/50 bg-primary/30 px-1 py-0.25 font-mono text-sm text-foreground sm:px-1.5 sm:py-0.5"
            {...props}
        >
            {children}
        </code>
    ),

    // Paragraphs and text
    p: ({ children, ...props }) => (
        <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300" {...props}>
            {children}
        </p>
    ),

    // Links
    a: ({ href, children, ...props }) => {
        const isInternal = href?.startsWith('/') || href?.startsWith('#');
        const isExternal = href?.startsWith('http') || href?.startsWith('https');

        if (isInternal) {
            return (
                <Link
                    href={href}
                    className="text-primary/80 hover:underline font-medium"
                    {...props}
                >
                    {children}
                </Link>
            );
        }

        return (
            <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-primary/80 underline decoration-primary/80 hover:text-primary hover:decoration-primary underline-offset-2 transition-all duration-200"
                {...props}
            >
                {children}
                <Icon.arrowtopright className="inline-flex size-4 stroke-1" />
            </a>
        );
    },

    // Button (using shadcn)
    button: ({ children, ...props }) => (
        <button {...props}>
            {children}
        </button>
    ),

    // Lists
    ul: ({ children, ...props }) => (
        <ul className="mb-4 pl-6 space-y-2 list-disc" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }) => (
        <ol className="mb-4 pl-6 space-y-2 list-decimal" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }) => (
        <li className="text-gray-700 dark:text-gray-300 leading-7" {...props}>
            {children}
        </li>
    ),

    pre: (props) => <CodeBlock className="not-prose" collapsedHeight={200} {...props} />,
    figcaption: CodeBlockHeader,

    // Blockquotes
    blockquote: ({ children, ...props }) => (
        <blockquote
            className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300"
            {...props}
        >
            {children}
        </blockquote>
    ),

    // Images
    img: ({ src, alt, ...props }) => (
        <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={400}
            className="rounded-lg mb-4 w-full h-auto"
            {...props}
        />
    ),

    // Table components (using custom components)
    table: Table,
    thead: TableHeader,
    tbody: TableBody,
    tr: TableRow,
    th: TableHead,
    td: TableCell,

    // Horizontal rule
    hr: (props) => (
        <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
    ),

    // Strong and emphasis
    strong: ({ children, ...props }) => (
        <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
            {children}
        </strong>
    ),
    em: ({ children, ...props }) => (
        <em className="italic text-gray-700 dark:text-gray-300" {...props}>
            {children}
        </em>
    ),

    // Custom components
    Callout: ({ children, type = 'info', ...props }) => {
        const styles = {
            info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
            error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
            success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
        };

        return (
            <div className={`border-l-4 p-4 mb-4 ${styles[type as keyof typeof styles] || styles.info}`} {...props}>
                {children}
            </div>
        );
    },

} as MDXComponents

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
};

interface MDXProps {
    code: string;
    components?: Record<string, React.ComponentType>;
}

// MDXContent component
export const MDX = ({ code, components }: MDXProps) => {
    const Component = useMDXComponent(code);
    return <Component components={{ ...sharedComponents, ...components }} />;
};