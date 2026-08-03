import { ChangeEvent } from "react";
import styles from "@/components/modal/consultation.module.css";

interface TextAreaFieldProps {
  label: string;
  name?: string;
  rows?: number;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = ({
  label,
  name,
  value,
  disabled,
  rows = 2,
  onChange,
  className,
  placeholder,
  required = false,
}: TextAreaFieldProps) => {
  return (
    <label className={`${styles.modal_field} ${className || ""}`}>
      <span className={styles.modal_label}>
        {label}
        {required && <span>*</span>}
      </span>

      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={styles.modal_textarea}
      />
    </label>
  );
};

export default TextAreaField;