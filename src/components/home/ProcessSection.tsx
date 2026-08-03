import Image from "next/image";
import { stepList } from "@/data/iocn";
import styles from "./process.module.css";

export default function ProcessSection() {
  return (
    <div className={styles.process_container}>
      <div className={styles.process_header}>
        <p className={styles.process_eyebrow}>Our Delivery Approach</p>
        <h2 className={styles.process_heading}>How We Deliver Success</h2>
      </div>

      <div className={styles.process_steps}>
        <span className={styles.process_connector_line} aria-hidden="true" />

        {stepList.map((item, index) => (
          <div key={index} className={styles.process_step}>
            <div className={styles.process_icon_wrapper}>
              <span className={styles.process_icon_circle}>
                <Image
                  width={80}
                  height={80}
                  src={item.image}
                  alt={item.title}
                  className={styles.process_icon_image}
                />
              </span>
              <span className={styles.process_step_number}>
                {item.step_number}
              </span>
            </div>

            <h3 className={styles.process_step_title}>{item.title}</h3>
            <p className={styles.process_step_desc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
