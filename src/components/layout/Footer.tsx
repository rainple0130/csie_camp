import { campInfo } from "../../data/campInfo";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

export function Footer() {
  return (
    <footer className="bg-gray">
      <div className="mx-auto flex max-w-5xl flex-col-reverse gap-5 px-6 py-6 text-sm text-ivory sm:flex-row sm:items-end sm:justify-between">
        <div className="my-auto text-xs text-center sm:text-sm sm:text-right">
          COPYRIGHT © {campInfo.title}
        </div>

        <div className="flex items-center justify-end gap-3 mx-auto sm:mx-0">
          <SocialIcon
            icon={<RiFacebookFill />}
            ariaLabel="前往 Facebook 粉絲專頁"
            href="https://facebook.com/2026ntucsiecamp"
            tooltip="2026 臺大資訊營【Code Code Nut】"
          />
          <SocialIcon
            icon={<FaInstagram />}
            ariaLabel="前往 Instagram"
            href="https://instagram.com/2026ntucsiecamp"
            tooltip="@2026ntucsiecamp"
          />
          <SocialIcon
            icon={<MdOutlineEmail />}
            ariaLabel="寄信到營隊信箱"
            href={`mailto:${campInfo.email}`}
            tooltip={campInfo.email}
          />
        </div>
      </div>
    </footer>
  );
}


type SocialIconProps = {
  icon: React.ReactNode;
  ariaLabel: string;
  href: string;
  tooltip: string;
};

function SocialIcon({ icon, ariaLabel, href, tooltip }: SocialIconProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="group flex items-center gap-0 rounded-full bg-ivory text-gray shadow-sm
      px-2 py-2 text-sm
      hover:gap-2
      transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center text-lg">
        {icon}
      </div>
      <span
        className="
        text-xs font-bold max-w-0 opacity-0
        group-hover:max-w-50 group-hover:opacity-100
        transition-all duration-300 ease-in-out
        whitespace-nowrap overflow-hidden
        "
      >
        {tooltip}
      </span>
    </a>
  );
}