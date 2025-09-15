import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import { rpcOptions } from './options'

export const highlighter = async (
    code: string,
    lang: string = 'javascript',
    fileName?: string,
    highlightLines?: string, // e.g. "1,2", "2-4" or "1,3-5"
    highlightWords?: string[] // e.g. ["console", "Hello"]
) => {
    // Build the opening fence with optional title & line highlights
    let fence = lang;
    if (fileName) fence += ` title="${fileName}"`;
    if (highlightLines) fence += ` {${highlightLines}}`;
    if (highlightWords?.length) {
        const wordSyntax = highlightWords.map((w) => `${w}`).join(" ");
        fence += ` ${wordSyntax}`;
    }

    const codeBlock = `\`\`\`${fence}\n${code}\n\`\`\``;

    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, rpcOptions)
        .use(rehypeStringify)
        .process(codeBlock)

    return result.toString()
}
