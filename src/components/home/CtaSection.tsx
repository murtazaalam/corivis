import { useState } from "react";
import styles from "./cta.module.css";
import Button from "../button/Button";
import ContactModal from "../modal/ContactModal";
import ConsultationModal from "../modal/ConsultationModal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function CtaSection() {
  const [openContact, setOpenContact] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.cta_container}>
      <div className={styles.cta_text_col}>
        <h2 className={styles.cta_heading}>
          Let&apos;s Build Something Amazing Together.
        </h2>
        <p className={styles.cta_description}>
          Whether you&apos;re modernizing your infrastructure, automating
          processes, or building digital experiences — Corivis is here to help.
        </p>
      </div>

      <div className={styles.cta_actions_col}>
        <Button
          text="Request a Call Back"
          action={() => setOpen(true)}
          endIcon={<ArrowForwardIcon fontSize="small" />}
        />
        <Button
          text="Contact Us"
          action={() => setOpenContact(true)}
          endIcon={<ArrowForwardIcon fontSize="small" />}
        />
      </div>
      <ContactModal
        isOpen={openContact}
        onClose={() => setOpenContact(false)}
      />
      <ConsultationModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
