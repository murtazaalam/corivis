import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import styles from "./project.module.css";
import { useState, useEffect } from "react";
import { ProjectType } from "@/types/project";
import SubHeading from "../heading/SubHeading";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ProjectSection() {
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(-1);
  const [is_loading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([] as any);

  const handle_load_more = () => setLimit(limit + 5);

  useEffect(() => { getProjects(limit) }, [limit]);

  const getProjects = async (dataLimit: number) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/project" + "?limit=" + dataLimit);

      const res = await response.json();

      setIsLoading(false);
      // if (!response.ok) return toast.error(res.message);
      if (!response.ok) return;

      setProjects(res.data);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.projects_container}>
      <div className={styles.pr_head}>
        <SubHeading text="Our Works &amp; Projects" />
      </div>
      <div className={styles.projects_grid}>
        {(projects && projects?.length > 0) &&
          projects.map((project_item: ProjectType, index: number) => (
            <Link
              href="#"
              key={index}
              // href={`/projects/${project_item.slug}`}
              onClick={(e) => e.preventDefault()}
              className={`${styles.project_card} ${project_item.spanSize === "wide" ? styles.project_card_wide : ""
                }`}
            >
              <div className={styles.project_image_wrapper}>
                {project_item?.image &&
                  <Image
                    fill
                    src={project_item?.image}
                    className={styles.project_image}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={project_item?.title || "Project Image"}
                    priority={project_item.slug === projects[0].slug}
                  />
                }
                <div className={styles.project_image_overlay} />
              </div>

              <div className={styles.project_info}>
                <h3 className={styles.project_title}>{project_item?.title}</h3>
                <p className={styles.project_subtitle}>{project_item?.subTitle}</p>
              </div>
            </Link>
          ))}
      </div>

      <div className={styles.projects_load_more_row}>
        {totalCount >= limit &&
          <button
            type="button"
            disabled={is_loading}
            onClick={handle_load_more}
            className={styles.projects_load_more_btn}
          >
            <span>{is_loading ? "Loading..." : "Load More"}</span>
            <RefreshIcon
              className={`${styles.projects_load_more_icon} ${is_loading ? styles.projects_load_more_icon_spinning : ""
                }`}
              fontSize="small"
            />
          </button>
        }
      </div>
    </div>
  );
}