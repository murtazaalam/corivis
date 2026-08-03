import { ReactNode } from "react";
import ButtonLoader from "@/components/loader/ButtonLoader";

type ButtonProps = {
  text: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  className?: string;
  action: () => void;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};

const GlowButton = ({
  text,
  startIcon,
  endIcon,
  action,
  disabled,
  isLoading,
  className,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={action}
      disabled={disabled}
      className={`btn-glow ${className || ""}`}
    >
      {!isLoading ? (
        <div className="btn-content">
          {startIcon}
          <div>{text}</div>
          {endIcon}
        </div>
      ) : (
        <ButtonLoader />
      )}
    </button>
  );
};

export default GlowButton;