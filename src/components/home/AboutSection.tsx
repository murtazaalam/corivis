import Image from "next/image";
import CountUp from "react-countup";
import { statList } from "@/data/home";
import styles from "./about.module.css";
import { featureList } from "@/data/iocn";
import SubHeading from "../heading/SubHeading";

export default function AboutSection() {
  return (
    <div className={styles.about_container}>
      <div className={styles.about_label_col}>
        <SubHeading text="About Corivis" />
      </div>

      <div className={styles.about_content_col}>
        <h3 className={styles.about_heading}>Technology. Innovation. Impact</h3>

        <p className={styles.about_paragraph}>
          Corivis is a technology consulting and engineering company helping
          organizations transform the way they work. Our expertise spans
          Microsoft Cloud, Modern Workplace, Identity &amp; Security, Enterprise
          Service Management, IT Operations, Data Engineering, Digital
          Experience, and Automation.
        </p>

        <p className={styles.about_paragraph}>
          We combine deep technical capability with a customer-first approach to
          deliver secure, scalable, and future-ready solutions that drive
          business growth and operational excellence.
        </p>

        <div className={styles.about_feature_grid}>
          {featureList.map((item, index) => (
            <div key={index} className={styles.about_feature_item}>
              <Image
                width={100}
                height={100}
                src={item.image}
                alt={item.title}
                className={styles.feature_icon_image}
              />
              <div className={styles.about_feature_text}>
                <h4 className={styles.about_feature_title}>{item.title}</h4>
                <p className={styles.about_feature_desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.about_stats_row}>
          {statList.map((item, index) => (
            <div key={index} className={styles.about_stat_item}>
              <span className={styles.about_stat_value}>
                {typeof item.value === "number" ? (
                  <>
                    <CountUp
                      end={item.value}
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {item.suffix}
                  </>
                ) : (
                  item.value
                )}
              </span>

              <span className={styles.about_stat_label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
