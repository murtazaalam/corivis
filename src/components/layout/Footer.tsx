import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import SocialIcon from "../home/SocialIcon";
import logo2 from "@/assets/logo/logo2.png";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { servicesList, quickLinks } from "@/data/header";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

export default function Footer() {
  const [show_scroll_top, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handle_scroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handle_scroll);
    return () => window.removeEventListener("scroll", handle_scroll);
  }, []);

  const scroll_to_top = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer_root}>
      <div className={styles.footer_topbar} />

      <IconButton
        aria-label="Scroll to top"
        onClick={scroll_to_top}
        className={`${styles.scroll_top_btn} ${show_scroll_top ? styles.scroll_top_btn_visible : ""
          }`}
      >
        <KeyboardDoubleArrowUpIcon />
      </IconButton>

      <div className={styles.footer_container}>
        <div className={styles.footer_brand}>
          <Link
            href=""
            className={styles.logo_wrapper}
          >
            <Image
              fill
              alt="Logo"
              src={logo2}
              unoptimized
              className={styles.logo}
            />
          </Link>

          <p className={styles.footer_tagline}>
            Engineering the Future of Enterprise Technology
          </p>
        </div>

        <div className={styles.footer_grid}>
          <div className={styles.footer_column}>
            <h3 className={styles.footer_heading}>Services</h3>
            <ul className={styles.footer_list}>
              {servicesList.map((service_item) => (
                <li
                  key={service_item}
                  className={styles.footer_list_item}
                >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={`${styles.footer_link} ${styles.poit_default}`}
                  >
                    {service_item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footer_column}>
            <h3 className={styles.footer_heading}>Quick</h3>
            <ul className={styles.footer_list}>
              {quickLinks.map((quick_item) => (
                <li
                  key={quick_item.label}
                  className={styles.footer_list_item}
                >
                  <Link
                    href={quick_item.href}
                    className={styles.footer_link}
                  >
                    {quick_item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footer_column}>
            <h3 className={styles.footer_heading}>Contact</h3>
            <ul className={styles.footer_list}>
              <li className={styles.footer_list_item}>
                <Link
                  className={styles.footer_link}
                  href="mailto:hello@corivis.com"
                >
                  hello@corivis.com
                </Link>
              </li>
              <li className={styles.footer_list_item_static}>
                Mumbai, India
              </li>
              <li className={styles.footer_list_item_static}>24×7 Support</li>
            </ul>
          </div>

          <div className={styles.footer_column}>
            <h3 className={styles.footer_heading}>Follow Us</h3>
            <SocialIcon />
          </div>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <p className={styles.footer_copyright}>
          ©{new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}