import Image from "next/image";
import { toast } from "react-toastify";
import styles from "./partner.module.css";
import { clientLogos } from "@/data/home";
import { useEffect, useState } from "react";
import SubHeading from "../heading/SubHeading";
import { partnerTypes } from "@/types/partner";
import PersonIcon from '@mui/icons-material/Person';
import { TestimonialType } from "@/types/testimonial";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

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

const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos];

export default function PartnerSection() {
  const [partners, setPartners] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getPartners(100);
    getTestimonials();
  }, []);

  const getTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonial");

      const res = await response.json();

      // if (!response.ok) return toast.error(res.message);
      if (!response.ok) return;

      setTestimonials(res.data);
    } catch (error) {
      console.error(error);
    }
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
    <div className={styles.partners_root}>
      <div className={styles.partners_container}>
        <div className={styles.partners_header}>
          <div className={styles.partners_header_text}>
            <p className={styles.ph_subtitle}>
              Corivis Colaboration with Tect Giants
            </p>
            <SubHeading text="Strategic Partnership with Industry Leaders" />
          </div>

          <div className={styles.partners_badge}>
            <div className={styles.partners_badge_grid}>
              <span className={styles.badge_square_red} />
              <span className={styles.badge_square_green} />
              <span className={styles.badge_square_blue} />
              <span className={styles.badge_square_yellow} />
            </div>
            <div className={styles.partners_badge_text}>
              <span className={styles.partners_badge_title}>Microsoft</span>
              <span className={styles.partners_badge_subtitle}>Partner</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.logo_marquee_section}>
        <div className={styles.logo_marquee}>
          <div className={styles.logo_marquee_track}>
            {/* {marqueeLogos.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className={`${styles.logo_item} ${styles[`logo${(index % clientLogos.length) + 1}`]}`}
              >
                {item.label}
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
          <div className={styles.logo_fade_left} />
          <div className={styles.logo_fade_right} />
        </div>
      </div>

      <div className={styles.testimonial_marquee_section}>
        <div className={styles.testimonial_marquee}>
          <div className={styles.testimonial_marquee_track}>
            {(testimonials && testimonials?.length > 0) &&
              testimonials.map((item: TestimonialType, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className={styles.testimonial_card}
                >
                  <FormatQuoteIcon className={styles.testimonial_quote_icon} />

                  <p className={styles.testimonial_quote}>{item?.quote}</p>

                  <div className={styles.testimonial_footer}>
                    <div className={styles.testimonial_person}>
                      <div
                        className={`${styles.testimonial_avatar}`}
                      >
                        {item?.image ?
                          <Image
                            fill
                            sizes="100px"
                            src={item?.image}
                            alt={item.name || "Image"}
                            className={styles.avatar_image}
                          /> :
                          <PersonIcon
                            sx={{
                              fontSize: 44,
                              color: 'var(--white)'
                            }}
                          />
                        }
                      </div>
                      <div className={styles.testimonial_person_text}>
                        <span className={styles.testimonial_name}>
                          {item?.name}
                        </span>
                        <span className={styles.testimonial_role}>
                          {item?.role}
                        </span>
                      </div>
                    </div>

                    <span className={styles.testimonial_company_logo}>
                      {item?.company}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.testimonial_fade_left} />
          <div className={styles.testimonial_fade_right} />
        </div>
      </div>
    </div>
  );
}