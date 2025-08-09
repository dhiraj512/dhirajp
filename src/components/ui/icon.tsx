import {
    RxHome,
    RxClock,
    RxArrowLeft,
    RxStar,
    RxCopy,
    RxCheck,
    RxLink2,
    RxArrowRight,
    RxMagnifyingGlass,
    RxCalendar,
    RxArrowUp,
    RxArrowDown,
    RxShare2,
    RxArrowTopRight
} from 'react-icons/rx';
import { PiBracketsCurlyBold, PiEye, PiFileSql, PiFileText } from 'react-icons/pi';
import { PiFlaskFill } from 'react-icons/pi';
import { RiTwitterXLine } from 'react-icons/ri';
import { SiArduino, SiC, SiCplusplus, SiCss3, SiHtml5, SiJavascript, SiMarkdown, SiMdx, SiNextdotjs, SiPython, SiReact, SiSpotify, SiTypescript, SiVercel } from "react-icons/si";
import { BsEmojiSmileUpsideDownFill } from 'react-icons/bs';
import { DiTerminal } from 'react-icons/di';
import { GiSoapExperiment } from "react-icons/gi";
import { LuBookOpen, LuFolderOpen, LuHeart, LuRocket, LuTag, LuTriangleAlert, LuExternalLink, LuGithub } from 'react-icons/lu';
import { VscJson } from 'react-icons/vsc';
import { ReactNode } from 'react';

type IconProps = React.HTMLAttributes<SVGElement>

const Icon = {
    // Radix Icons
    home: RxHome,
    star: RxStar,
    copy: RxCopy,
    share: RxShare2,
    link: RxLink2,
    check: RxCheck,
    clock: RxClock,
    arrowUp: RxArrowUp,
    arrowDown: RxArrowDown,
    arrowLeft: RxArrowLeft,
    arrowRight: RxArrowRight,
    arrowtopright: RxArrowTopRight,
    calendar: RxCalendar,
    socialX: RiTwitterXLine,
    search: RxMagnifyingGlass,
    face: BsEmojiSmileUpsideDownFill,

    // Simple Icons
    c: SiC,
    mdx: SiMdx,
    css: SiCss3,
    py: SiPython,
    html: SiHtml5,
    react: SiReact,
    md: SiMarkdown,
    ts: SiTypescript,
    js: SiJavascript,
    cpp: SiCplusplus,
    spotify: SiSpotify,
    arduino: SiArduino,
    nextjs: SiNextdotjs,
    vercel: SiVercel,

    // Phosphor Icons
    eye: PiEye,
    sql: PiFileSql,
    flask: PiFlaskFill,
    txtfile: PiFileText,
    code: PiBracketsCurlyBold,

    // Dev Icons
    terminal: DiTerminal,

    // VS Code Icons
    json: VscJson,

    // Lucide Icons
    tag: LuTag,
    github: LuGithub,
    heart: LuHeart,
    folder: LuFolderOpen,
    alert: LuTriangleAlert,
    rocket: LuRocket,
    bookopen: LuBookOpen,
    externalLink: LuExternalLink,
    folderopen: LuFolderOpen,

    // Grommet Icons
    experiment: GiSoapExperiment,

    // Custom Icons
    project: (props: IconProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
}

/**
 * Returns the appropriate icon component for a given language/file type
 * @param lang - The language or file type identifier
 * @returns ReactNode - The corresponding icon component
 */
export const getLanguageIcon = (lang: string, className?: string): ReactNode => {
    const normalizedLang = lang.toLowerCase().trim();

    switch (normalizedLang) {
        case "html":
            return <Icon.html className={className} />;
        case "css":
            return <Icon.css className={className} />;
        case "js":
        case "javascript":
            return <Icon.js className={className} />;
        case "bash":
        case "sh":
        case "shell":
        case "zsh":
            return <Icon.terminal className={className} />;
        case "py":
        case "python":
            return <Icon.py className={className} />;
        case "json":
            return <Icon.json className={className} />;
        case "jsx":
        case "tsx":
            return <Icon.react className={className} />;
        case "text":
        case "txt":
            return <Icon.txtfile className={className} />;
        case "md":
        case "markdown":
            return <Icon.md className={className} />;
        case "next":
        case "nextjs":
            return <Icon.nextjs className={className} />;
        case "directory":
        case "folder":
            return <Icon.folder className={className} />;
        case "vercel":
            return <Icon.vercel className={className} />;
        case "ts":
        case "typescript":
            return <Icon.ts className={className} />;
        case "cpp":
        case "c++":
            return <Icon.cpp className={className} />;
        default:
            return <Icon.code className={className} />;
    }
};

export default Icon;