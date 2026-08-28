import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";
import { navLink } from "@/data/header";
import styles from "./header.module.css";
import logo2 from "@/assets/logo/logo2.png";
import SocialIcon from "../home/SocialIcon";
import { useEffect, useState } from "react";
import ContactModal from "../modal/ContactModal";
import IconButton from "@mui/material/IconButton";
import ConsultationModal from "../modal/ConsultationModal";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrolledDesk, setScrolledDesk] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleDesktopScroll = () => {
      setScrolledDesk(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleDesktopScroll);

    return () => {
      window.removeEventListener("scroll", handleDesktopScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div
        className={`${styles.desktop_bar} ${scrolledDesk ? styles.scrolled_desk : ""}`}
      >
        <Link href="/" className={styles.logo_wrapper}>
          <Image
            fill
            alt="Logo"
            src={logo2}
            unoptimized
            className={styles.logo}
          />
        </Link>

        <nav className={styles.desktop_nav} aria-label="Primary">
          {navLink.map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.nav_link}
              >
                {link.label}
              </Link>
            ),
            // link.href === "#contact" ? (
            //   <button
            //     key={link.href}
            //     type="button"
            //     className={`${styles.nav_link} ${styles.nav_link_button}`}
            //     onClick={() => setOpenContact(true)}
            //   >
            //     {link.label}
            //   </button>
            // ) : (
            //   <Link
            //     key={link.href}
            //     href={link.href}
            //     className={styles.nav_link}
            //   >
            //     {link.label}
            //   </Link>
            // ),
          )}
        </nav>

        <Button
          text="Contact Us"
          action={() => setOpenContact(true)}
          endIcon={<MailOutlineRoundedIcon fontSize="small" />}
        />
      </div>

      <div
        className={`${styles.mobile_bar} ${scrolled ? styles.scrolled : ""}`}
      >
        <Link href="/" className={styles.logo_wrapper}>
          <Image
            fill
            alt="Logo"
            src={logo2}
            unoptimized
            className={styles.logo}
          />
        </Link>

        <IconButton
          aria-label="Open menu"
          className={styles.icon_toggle}
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuRoundedIcon className={styles.icon_toggle_glyph} />
        </IconButton>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={`${styles.mobile_menu} ${isMenuOpen ? styles.mobile_menu_open : ""}`}
      >
        <div className={styles.mobile_menu_top}>
          <Link href="/">
            <Image src={logo2} width={120} alt="MediNivo Logo" />
          </Link>

          <IconButton
            aria-label="Close menu"
            className={styles.icon_toggle}
            onClick={() => setIsMenuOpen(false)}
          >
            <CloseRoundedIcon className={styles.icon_toggle_glyph} />
          </IconButton>
        </div>

        <div className={styles.mobile_menu_divider} />

        <nav aria-label="Mobile primary" className={styles.mobile_nav}>
          {navLink.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobile_nav_link}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{link.label}</span>
              <ArrowOutwardRoundedIcon
                fontSize="small"
                className={styles.mobile_nav_arrow}
              />
            </Link>
          ))}
        </nav>

        <div className={styles.mobile_menu_actions}>
          <Button
            action={() => setOpen(true)}
            text="Book a free consultation"
            endIcon={<ArrowForwardIcon fontSize="small" />}
          />
          <Button
            text="Contact Us"
            action={() => setOpenContact(true)}
            endIcon={<ArrowForwardIcon fontSize="small" />}
          />
        </div>

        <div className={styles.mobile_menu_footer}>
          <span className={styles.follow_label}>Follow Us.</span>
          <SocialIcon />
        </div>
      </div>
      <ContactModal
        isOpen={openContact}
        onClose={() => setOpenContact(false)}
      />
      <ConsultationModal isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
