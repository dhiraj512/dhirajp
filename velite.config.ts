import { defineConfig } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code'
import { rpcOptions } from '@/config/options';
import { Experiments } from '@/config/collections';

const config = defineConfig({
    root: 'src/content',
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[ext]",
        clean: true,
    },
    collections: { Experiments },
    mdx: {
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, rpcOptions]],
        remarkPlugins: [],
        recmaPlugins: []
    },
})

export default config