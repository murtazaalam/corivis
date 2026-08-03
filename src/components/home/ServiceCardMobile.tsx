import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import styles from "./servicemobile.module.css";
import BrochureModal from "../modal/BrochureModal";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useRef, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";


type Item = {
  slug: string;
  title: string;
  badges: string[];
  image_src: string;
  btn_color?: string;
  description: string;
  image_caption: string;
  brochure_href: string;
  card_bg_color?: string;
};

type Props = {
  item: Item;
  index: number;
  isActive: boolean;
  onToggle: () => void;
};

export default function ServiceCardMobile({
  item,
  index,
  isActive,
  onToggle,
}: Props) {
  const theme = (index % 6) + 1;
  const firstRender = useRef(true);
  const [open, setOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!isActive || !itemRef.current) return;

    const timer = setTimeout(() => {
      itemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div ref={itemRef} className={styles.item}>
      <button
        type="button"
        onClick={onToggle}
        className={`${styles.item_head} `}
        style={{
          borderColor: isActive ? 'rgb(255, 255, 255)' : `#e2e6ec`,
          color: isActive ? 'rgb(255, 255, 255)' : `#3d4552`,
          background: (item?.btn_color && isActive) ?
            item?.btn_color : 'rgb(255, 255, 255)',
        }}
      >
        <span className={styles.item_title}>{item.title}</span>
        {isActive ? (
          <RemoveIcon fontSize="small" />
        ) : (
          <AddIcon fontSize="small" />
        )}
      </button>

      {isActive && (
        <div className={styles.card_wrapper}>
          <div className={`${styles.item_body}`}
            style={{
              background: item?.card_bg_color ? item?.card_bg_color : 'rgb(0, 0, 0)'
            }}
          >
            <div className={styles.badge_row}>
              {item.badges.map((badge, i) => {
                const bTheme = (i % 6) + 1;
                return (
                  <span
                    key={badge}
                    className={`${styles.badge} ${styles[`badge_${bTheme}`]}`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>

            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.desc}>{item.description}</p>

            <div
              className={`${styles.img_wrap}`}
              style={{
                boxShadow:
                  item.btn_color ?
                    `0 20px 44px -12px ${item.btn_color}66` : 'none'
              }}
            >
              {/* <span className={`${styles.ring} ${styles[`ring_${theme}`]}`} /> */}
              {item?.image_src &&
                <Image
                  fill
                  sizes="160px"
                  alt={"card_image"}
                  src={item.image_src}
                  className={styles.img}
                />
              }
            </div>
            {/* <p className={styles.caption}>{item.image_caption}</p> */}

            <button
              type="button"
              onClick={() => {
                setOpen(true)
                setDownloadUrl(item?.brochure_href)
              }}
              className={`${styles.btn}`}
              style={{
                "--btn-color": item.btn_color || "#1976d2",
              } as React.CSSProperties}

            >
              <span>Download Brochure</span>
              <DescriptionIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
      <BrochureModal
        isOpen={open}
        title={item.title}
        brochure={downloadUrl}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}