import posthog from "@/lib/posthog";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { FormType } from "@/types/form";
import SocialIcon from "../home/SocialIcon";
import InputField from "../input/InputField";
import styles from "./consultation.module.css";
import { cleanedData } from "@/utils/cleanData";
import CloseIcon from "@mui/icons-material/Close";
import TextAreaField from "../input/TextAreaField";
import { contactFormInitialData } from "@/data/form";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { contactValidator } from "@/validators/contactValidator";
import { useEffect, useState, ChangeEvent, type FormEvent } from "react";

type ConnectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ConnectModalProps) {
  const [is_submitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormType>(
    contactFormInitialData
  );

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isOpen) return;

    const previous_overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous_overflow;
    };
  }, [isOpen]);

  const handle_submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      const status = contactValidator(formData);
      if (!status.isValid) return toast.error(status.message);
      const newFormData = cleanedData(formData);

      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok) return toast.error(data.message);

      onClose();
      console.log("PostHog:", posthog);
      console.log("Distinct ID:", posthog.get_distinct_id());

      posthog.capture("contact_us_completed", {
        ...newFormData
      });
      toast.success(data.message);
      setFormData(contactFormInitialData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_backdrop} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        className={styles.modal_panel}
        aria-labelledby="lets_connect_heading"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={styles.modal_close_btn}
        >
          <CloseIcon fontSize="small" />
        </button>

        <form onSubmit={handle_submit} className={styles.modal_form}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header_text}>
              <h2
                id="lets_connect_heading"
                className={styles.modal_heading}
              >
                Let&apos;s Connect
              </h2>
              <p className={styles.modal_subheading}>
                Hello! How may I assist you today?
              </p>
            </div>

            <div className={styles.modal_social_row}>
              <SocialIcon />
            </div>
          </div>

          <div className={styles.modal_field_grid}>
            <InputField
              required
              type="text"
              name="name"
              label="Name"
              placeholder="Hello..."
              value={formData.name}
              onChange={onInputChange}
            />
            <InputField
              required
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="Where can I reply?"
            />
            <InputField
              type="text"
              name="company_name"
              label="Company Name"
              onChange={onInputChange}
              value={formData.company_name}
              placeholder="Your company or website?"
            />
            <InputField
              type="number"
              name="contact_no"
              label="Contact No."
              onChange={onInputChange}
              value={formData.contact_no}
              placeholder="Your Contact Details"
            />
          </div>
          <TextAreaField
            required
            label="Message"
            name="message"
            value={formData.message}
            onChange={onInputChange}
            placeholder="Tell me about your idea."
          />

          <div className={styles.modal_footer}>
            <Button
              text="Submit"
              type="submit"
              action={() => { }}
              disabled={is_submitting}
              isLoading={is_submitting}
              endIcon={<ArrowForwardIcon fontSize="small" />}
            />
          </div>
        </form>
      </div>
    </div>
  );
}