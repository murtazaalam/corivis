import Link from "next/link";
import { socialLink } from "@/data/iocn";


const SocialIcon = () => {
  return (
    <div className="social-row">
      {socialLink.map((social) => (
        <Link
          target="_blank"
          key={social.label}
          href={social.href}
          rel="noopener noreferrer"
          aria-label={social.label}
          className="social-icon"
        >
          {typeof social.icon === "string" ? (
            (social.icon === "dribbble" || social.icon === "medium") ? (
              <>
                {social.icon === "medium" && <MediumGlyph />}
                {social.icon === "dribbble" && <DribbbleGlyph />}
              </>
            ) : (
              <BehanceGlyph />
            )
          ) : (
            social.icon
          )}
        </Link>
      ))}
    </div>
  );
};

export default SocialIcon;

function DribbbleGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4.2 9.2c2.6.9 5.7 1.3 8.9 1 3-.3 5.6-1.2 7.5-2.3M3.3 14.7c4.8-1.1 10.6-.6 14.8 1.6M9.5 3.1c2.6 3.4 4.3 8.4 4.5 13.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BehanceGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6h6.2c2.9 0 4.4 1.3 4.4 3.3 0 1.4-.7 2.3-2 2.8 1.7.4 2.7 1.6 2.7 3.3 0 2.3-1.7 3.6-4.7 3.6H2V6Zm4.1 5.1h1.6c1.2 0 1.9-.5 1.9-1.5 0-.9-.7-1.4-1.9-1.4H6.1v2.9Zm0 5.6h1.9c1.4 0 2.1-.6 2.1-1.6 0-1-.7-1.6-2.1-1.6H6.1v3.2ZM14.5 9.4h6.7v1.5h-6.7V9.4ZM22 15.1c0 2.6-1.9 4.2-4.6 4.2-2.9 0-4.8-1.9-4.8-4.9 0-2.9 1.9-4.9 4.7-4.9 2.9 0 4.6 2 4.6 5v.5h-7c.1 1.5 1 2.4 2.5 2.4 1.1 0 1.8-.4 2.1-1.2H22Zm-6.9-1.8h4.5c-.1-1.2-.9-2-2.2-2-1.3 0-2.1.8-2.3 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MediumGlyph() {
  return (
    <svg
      width="22"
      height="22"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >

      <g
        stroke="none"
        fill="currentColor"
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      >
        <path d="M70 4543 c0 -48 1 -49 260 -360 180 -218 262 -324 269 -350 7 -26 11
          -435 11 -1233 l0 -1195 -24 -50 c-13 -28 -149 -202 -305 -390 -271 -328 -281
          -341 -281 -382 l0 -43 760 0 760 0 0 46 c0 45 -4 50 -290 396 -217 263 -293
          362 -305 397 -13 41 -15 169 -13 1060 l3 1013 667 -1454 667 -1453 78 -3 78
          -3 569 1443 c313 794 573 1447 578 1453 4 5 7 -514 6 -1184 l-3 -1194 -228
          -221 -228 -222 3 -39 3 -40 1003 -3 1002 -2 0 43 c0 43 -1 44 -220 262 -146
          145 -220 225 -220 239 0 12 0 688 0 1504 0 1179 2 1487 12 1500 7 10 109 109
          226 221 l212 203 0 44 0 44 -707 -2 -708 -3 -495 -1231 c-272 -677 -500 -1241
          -505 -1253 -9 -20 -89 149 -585 1233 l-574 1256 -738 0 -738 0 0 -47z"
        />
      </g>
    </svg>
  );
}