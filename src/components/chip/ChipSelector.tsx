import styles from "@/components/modal/consultation.module.css";

interface ChipSelectorProps {
  options: string[];
  multiple?: boolean;
  selected: string | string[];
  onSelect: (value: string) => void;
}

const ChipSelector = ({
  options,
  selected,
  onSelect,
  multiple = false,
}: ChipSelectorProps) => {
  return (
    <div className={styles.modal_chip_row}>
      {options.map((label) => {
        const isSelected = multiple
          ? (selected as string[]).includes(label)
          : selected === label;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(label)}
            className={`${styles.modal_chip} ${isSelected ? styles.modal_chip_active : ""}`} aria-pressed={isSelected}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ChipSelector;