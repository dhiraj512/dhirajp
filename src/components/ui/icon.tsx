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
import { LuBookOpen, LuFolderOpen, LuHeart, LuRocket, LuTag, LuTriangleAlert, LuExternalLink } from 'react-icons/lu';


const Icon = {
    // Radix Icons
    home: RxHome,
    star: RxStar,
    copy: RxCopy,
    // code: RxCode,
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
    heart: LuHeart,
    folder: LuFolderOpen,
    alert: LuTriangleAlert,
    rocket: LuRocket,
    bookopen: LuBookOpen,
    externalLink: LuExternalLink,

    // Grommet Icons
    experiment: GiSoapExperiment,
}

// export type IconKey = keyof typeof Icon;

export default Icon;

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    logo: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
            <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
        </svg>
    ),
    spinner: (props: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    ),
    v0: (props: IconProps) => (
        <svg
            viewBox="0 0 40 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                fill="currentColor"
            ></path>
            <path
                d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                fill="currentColor"
            ></path>
        </svg>
    ),
}