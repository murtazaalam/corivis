import Image from "next/image";
import Button from "../button/Button";
import styles from "./hero.module.css";
import { clientLogos } from "@/data/home";
import image from "@/assets/home/img1.jpg";
import { useState, useEffect } from "react";
import GlowButton from "../button/GlowButton";
import { partnerTypes } from "@/types/partner";
import MainHeading from "../heading/MainHeading";
import ConsultationModal from "../modal/ConsultationModal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Django from "@/assets/logo/django.png";
import Pipefy from "@/assets/logo/pipefy.png";
import TeamWork from "@/assets/logo/teamwork.jpg";


const partnerLogogs = [
  {
    name: "Django",
    logo: Django
  },
  {
    name: "Pipefy",
    logo: Pipefy
  },
  {
    name: "TeamWork",
    logo: TeamWork
  }
]
const marquee_logos = [...clientLogos, ...clientLogos, ...clientLogos];

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [partners, setPartners] = useState([]);

  useEffect(() => { getPartners(100) }, []);

  const buttonClicked = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getPartners = async (dataLimit: number) => {
    try {
      const response = await fetch("/api/partner" + "?limit=" + dataLimit);
      const res = await response.json();

      // if (!response.ok) return toast.error(res.message);
      if (!response.ok) return;
      setPartners(res.data);
    }
    catch (error) { console.error(error) }
  };

  return (
    <div className={styles.hero_root}>
      <div className={styles.hero_bg_wrapper}>
        <Image
          fill
          priority
          src={image}
          sizes="100vw"
          className={styles.hero_bg_image}
          alt="Team collaborating in a modern office"
        />
        <div className={styles.hero_overlay} />
        <div className={styles.hero_vignette} />
        <div className={styles.hero_glow} />
      </div>
      <div className={styles.hero_content_wraper}>
        <div className={styles.hero_content}>
          <MainHeading
            title="Engineering the Future of"
            subTitle="Enterprise Technology"
          />
          <p className={styles.hero_description}>
            We help organizations modernize, secure, and scale through Cloud
            Engineering, Modern Workplace, Enterprise Service Management, IT
            Operations, Data Engineering, and Digital Product Development.
          </p>

          <div className={styles.hero_actions}>
            <GlowButton
              action={() => setOpen(true)}
              text="Book a free consultation"
              endIcon={<ArrowForwardIcon fontSize="small" />}
            />
            <Button
              text="Explore services"
              action={buttonClicked}
              endIcon={<ArrowForwardIcon fontSize="small" />}
            />
          </div>
        </div>
      </div>

      <div className={styles.hero_logos_section}>
        <div className={styles.hero_marquee}>
          <div className={styles.hero_marquee_track}>
            {/* {marquee_logos.map((logo_item, logo_index) => (
              <span
                key={`${logo_item.label}-${logo_index}`}
                className={`${styles.hero_logo_item} ${styles[`logo${(logo_index % 6) + 1}`]
                  }`}
              >
                {logo_item.label}
              </span>
            ))} */}
            {(partners && partners) &&
              partners?.map((item: partnerTypes, index: number) => (
                <div
                  key={index}
                  className={styles.partner_logo}
                >
                  <Image
                    width={200}
                    height={80}
                    src={item?.logo}
                    alt={item?.name}
                  />
                </div>
              ))}
          </div>
          {/* <div className={styles.hero_marquee_fade_left} />
          <div className={styles.hero_marquee_fade_right} /> */}
        </div>
      </div>
      <ConsultationModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}