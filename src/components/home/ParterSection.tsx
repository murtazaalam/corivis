import Image from "next/image";
import { toast } from "react-toastify";
import styles from "./partner.module.css";
import { clientLogos } from "@/data/home";
import { useEffect, useState } from "react";
import SubHeading from "../heading/SubHeading";
import { TestimonialType } from "@/types/testimonial";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos];

export default function PartnerSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => { getTestimonials() }, []);

  const getTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonial");

      const res = await response.json();

      if (!response.ok) return toast.error(res.message);

      setTestimonials(res.data);
    } catch (error) {
      console.error(error);
    }
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
            {marqueeLogos.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className={`${styles.logo_item} ${styles[`logo${(index % clientLogos.length) + 1}`]}`}
              >
                {item.label}
              </span>
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
                        className={`${styles.testimonial_avatar} ${styles[
                          `test_avatar${(index % testimonials.length) + 1}`
                        ]
                          }`}
                      >
                        {item?.image &&
                          <Image
                            fill
                            sizes="100px"
                            src={item?.image}
                            alt={item.name || "Image"}
                            className={styles.avatar_image}
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