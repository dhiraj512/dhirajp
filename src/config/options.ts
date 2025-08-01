import fs from "fs";
import type { Options as RPCOptions } from "rehype-pretty-code";

// Load custom moonlight-ii theme
const moonlightTheme = JSON.parse(
	fs.readFileSync('./src/config/moonlight-ii.json', 'utf8')
);

export const rpcOptions: Partial<RPCOptions> = {
	theme: moonlightTheme,
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ["highlighted-line"];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ["highlighted-chars"];
	},
};