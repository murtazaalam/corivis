import Button from "../button/Button";
import { toast } from "react-toastify";
import { FormType } from "@/types/form";
import { createPortal } from "react-dom";
import InputField from "../input/InputField";
import styles from "./consultation.module.css";
import { cleanedData } from "@/utils/cleanData";
import CloseIcon from "@mui/icons-material/Close";
import { brochureFormInitialData } from "@/data/form";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { downloadValidator } from "@/validators/downloadValidator";
import { useEffect, useState, ChangeEvent, type FormEvent } from "react";

type ConnectModalProps = {
  title: string;
  isOpen: boolean;
  brochure: string;
  onClose: () => void;
};

export default function BrochureModal({
  isOpen,
  title,
  onClose,
  brochure
}: ConnectModalProps) {
  const [is_submitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormType>(brochureFormInitialData);

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
      formData.brochure_name = title;
      const status = downloadValidator(formData);
      if (!status.isValid) return toast.error(status.message);
      const newFormData = cleanedData(formData);
      setIsSubmitting(true);
      const response = await fetch("/api/download", {
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

      window.open(brochure, "_blank");
      toast.success(data.message);
      setFormData(brochureFormInitialData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal_backdrop} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lets_connect_heading"
        className={`${styles.modal_panel} ${styles.brochure_pannel}`}
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
          <h3 id="lets_connect_heading" className={styles.prochure_heading}>
            {title}
          </h3>

          <div className={styles.brochure_col}>
            <InputField
              required
              type="text"
              name="name"
              label="Name"
              value={formData.name}
              placeholder="Enter Name"
              onChange={onInputChange}
            />
            <InputField
              required
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="Enter Email"
            />
          </div>

          <div className={styles.modal_footer}>
            <Button
              type="submit"
              text="Download"
              action={() => { }}
              disabled={is_submitting}
              isLoading={is_submitting}
              endIcon={<ArrowForwardIcon fontSize="small" />}
            />
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}