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
import { SiArduino, SiC, SiCplusplus, SiCss3, SiHtml5, SiJavascript, SiMarkdown, SiMdx, SiNextdotjs, SiPython, SiReact, SiSpotify, SiTypescript } from "react-icons/si";
import { BsEmojiSmileUpsideDownFill } from 'react-icons/bs';
import { DiTerminal } from 'react-icons/di';
import { GiSoapExperiment } from "react-icons/gi";
import { LuBookOpen, LuFolderOpen, LuHeart, LuRocket, LuTag, LuTriangleAlert, LuExternalLink, LuGithub } from 'react-icons/lu';

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

    // Phosphor Icons
    eye: PiEye,
    sql: PiFileSql,
    flask: PiFlaskFill,
    txtfile: PiFileText,
    code: PiBracketsCurlyBold,

    // Dev Icons
    terminal: DiTerminal,

    // Lucide Icons
    tag: LuTag,
    github: LuGithub,
    heart: LuHeart,
    folder: LuFolderOpen,
    alert: LuTriangleAlert,
    rocket: LuRocket,
    bookopen: LuBookOpen,
    externalLink: LuExternalLink,

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

export default Icon;