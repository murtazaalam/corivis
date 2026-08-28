import Image from "next/image";
import posthog from "@/lib/posthog";
import { useRef, useState } from "react";
import styles from "./servicess.module.css";
import BrochureModal from "../modal/BrochureModal";
import { useMotionValueEvent } from "framer-motion";
import DescriptionIcon from "@mui/icons-material/Description";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

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
  total: number;
  range: [number, number];
  progress: MotionValue<number>;
  onActive: (index: number) => void;
  panelRef: (el: HTMLDivElement | null) => void;
};

export default function ServiceCard({
  item,
  index,
  total,
  range,
  onActive,
  progress,
  panelRef,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  // const targetScale = 1 - (total - index) * 0.05;
  // const scale = useTransform(progress, range, [1, targetScale]);

  const theme = (index % 6) + 1;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.55) {
      onActive(index);
    }
  });

  const handleServiceCLick = (item: any) => {
    setOpen(true)
    setDownloadUrl(item.brochure_href)
    posthog.capture("service_clicked", {
      service_id: item._id,
      service_name: item.title,
    });
  }

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        panelRef(el);
      }}
      data-panel-index={index}
      className={styles.panel}
      style={{ zIndex: index + 1 }}
    >
      <motion.div className={styles.shell}>
        <div
          // className={`${styles.card} ${styles[`card_${theme}`]}`}
          className={`${styles.card}`}
          style={{
            background: item?.card_bg_color ? item?.card_bg_color : 'rgb(0, 0, 0)'
          }}
        >
          <span className={`${styles.glow} ${styles[`glow_${theme}`]}`} />

          <div className={styles.text}>
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

            <button
              type="button"
              className={`${styles.btn}`}
              onClick={() => handleServiceCLick(item)}
              style={{
                "--btn-color": item.btn_color || "#1976d2",
              } as React.CSSProperties}
            >
              <span>Download Brochure</span>
              <DescriptionIcon fontSize="small" />
            </button>
          </div>

          <div className={styles.img_col}>
            <div
              className={`${styles.img_wrap}`}
              style={{
                boxShadow:
                  item.btn_color ?
                    `0 20px 44px -12px ${item.btn_color}66` : 'none'
              }}
            >
              {/* <span className={`${styles.ring} ${styles[`ring_${theme}`]}`} /> */}
              <motion.div className={styles.scaler} style={{ scale: imgScale }}>
                {item.image_src &&
                  <Image
                    fill
                    alt={"card_image"}
                    src={item.image_src}
                    className={styles.img}
                    sizes="(min-width: 1024px) 260px, 200px"
                  />
                }
              </motion.div>
            </div>
            {/* <p className={styles.caption}>{item.image_caption}</p> */}
          </div>
        </div>
      </motion.div>
      <BrochureModal
        isOpen={open}
        title={item.title}
        brochure={downloadUrl}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}