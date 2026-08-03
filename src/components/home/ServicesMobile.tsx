import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ServiceType } from "@/types/service";
import BodyLoader from "../loader/BodyLoader";
import SubHeading from "../heading/SubHeading";
import styles from "./servicemobile.module.css";
import ServiceCardMobile from "./ServiceCardMobile";

export default function ServicessMobile() {
  const [services, setServices] = useState([]);
  const [totalCount, setTotalCount] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => { getServices() }, []);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
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

  return (
    <section className={styles.container}>
      {isLoading && <BodyLoader />}
      <div className={styles.header}>
        <SubHeading text="Our Services" />
      </div>

      <div className={styles.list}>
        {services &&
          services?.length > 0 &&
          services.map((item: ServiceType, index) => (
            <ServiceCardMobile
              index={index}
              key={item.slug}
              item={item as any}
              isActive={activeIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
      </div>
    </section>
  );
}