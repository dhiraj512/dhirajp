import NowPlaying from "@/components/app/spotify"
import { Face } from "@/components/motion/face"
import { TabGroup } from "@/components/ui/tab-group"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative flex items-center gap-4">
        <Image
          src="/profile.jpg"
          width={48}
          height={48}
          alt="Dhiraj"
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl leading-5 font-semibold">Dhiraj Pandey</h1>
          <span className="text-xs font-medium text-muted-foreground">Tinkerer</span>
        </div>
        <Face />
      </div>
      <TabGroup
        tabs={[
          {
            title: "About",
            description:
              "I’m Dhiraj, an Electrical Engineer passionate about electronics, DIY projects, and electrical systems. I enjoy bridging the gap between hardware and software, often building automation systems with Raspberry Pi, ESP32/ESP8266, and more.",
          },
          {
            title: "Career",
            description:
              "Currently working as a Field Engineer at IMS & SUM Hospital, Siksha 'O' Anusandhan University. Previously served as a Graduate Engineer Trainee for 9 months.",
          },
          {
            title: "Skills",
            description:
              "Electrical Systems, Electrical Wiring & Installation, Embedded Systems, Raspberry Pi, ESP8266, IoT, PCB Design, React, Next.js, Tailwind CSS, Firebase.",
          },
        ]}
      />
      <NowPlaying />
    </div>
  )
}
