import { ChangeEvent } from "react";
import styles from "@/components/modal/consultation.module.css";

interface InputFieldProps {
  label: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  type?: "text" | "email" | "password" | "number" | "tel";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  name,
  value,
  disabled,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: InputFieldProps) => {
  return (
    <label className={styles.modal_field}>
      <span className={styles.modal_label}>
        {label}
        {required && <span>*</span>}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={styles.modal_input}
      />
    </label>
  );
};

export default InputField;