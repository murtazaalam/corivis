import { toast } from "react-toastify";
import ServiceCard from "./ServiceCard";
import { useScroll } from "framer-motion";
import styles from "./servicess.module.css";
import { ServiceType } from "@/types/service";
import BodyLoader from "../loader/BodyLoader";
import SubHeading from "../heading/SubHeading";
import * as MuiIcons from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

type DynamicIconProps = {
  name: string;
  [key: string]: any
}

export default function ServicessSection() {
  const [active, setActive] = useState(0);
  const [panelTop, setPanelTop] = useState(90);

  const stackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [services, setServices] = useState([]);
  const [totalCount, setTotalCount] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    getServices();
    const el = headerRef.current;
    if (!el) return;

    const update = () => setPanelTop(el.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const handleTabClick = (index: number) => {
    setActive(index);

    panelRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/service");

      const res = await response.json();
      setIsLoading(false);
      if (!response.ok) return toast.error(res.message);

      setServices(res.data);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  const dynamicIcons = ({ name }: DynamicIconProps) => {
    const icon = MuiIcons[name as keyof typeof MuiIcons];
    return icon;
  }

  return (
    <section className={styles.container}>
      {isLoading && <BodyLoader />}
      <div ref={headerRef} className={styles.sticky_area}>
        <div className={styles.header}>
          <SubHeading text="Our Services" />
        </div>
        <div className={styles.tabs_sticky}>
          <div className={styles.tabs_row}>
            {(services && services?.length > 0) &&
              services.map((item: ServiceType, index) => {
                const TabIcon = dynamicIcons({
                  name: item.tab_icon || "QuestionMark"
                });
                const theme = (index % 6) + 1;
                const isActive = active === index;
                return (
                  <button
                    type="button"
                    key={item.slug}
                    onClick={() => handleTabClick(index)}
                    ref={(el) => { tabRefs.current[index] = el; }}
                    style={{
                      borderColor: isActive ? 'rgb(255, 255, 255)' : `#e2e6ec`,
                      color: isActive ? 'rgb(255, 255, 255)' : `#3d4552`,
                      background: (item?.btn_color && isActive) ?
                        item?.btn_color : 'rgb(255, 255, 255)',
                    }}
                    className={`${styles.tab}`}
                  >
                    {TabIcon ? <TabIcon fontSize="small" /> : null}
                    <span>{item.tab_label}</span>
                  </button>
                );
              })}
          </div>

          <div className={styles.track}>
            <span
              style={{ width: `${((active + 1) / services.length) * 100}%` }}
              className={`${styles.fill} ${styles[`fill_${(active % 6) + 1}`]}`}
            />
          </div>
        </div>
      </div>

      <div
        ref={stackRef}
        className={styles.stack}
        style={{ "--panel-top": `${panelTop}px` } as React.CSSProperties}
      >
        {(services && services?.length > 0) &&
          services.map((item: ServiceType, index) => (
            <ServiceCard
              index={index}
              key={item.slug}
              item={item as any}
              onActive={setActive}
              total={services.length}
              progress={scrollYProgress}
              range={[index / services.length, 1]}
              panelRef={(el) => { panelRefs.current[index] = el; }}
            />
          ))}
      </div>
    </section>
  );
}