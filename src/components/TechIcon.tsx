import type { IconType } from "react-icons";
import {
  SiPython, SiPostgresql, SiApachenifi, SiApachespark, SiDocker, SiApacheairflow,
  SiSnowflake, SiFastapi, SiDjango, SiGit, SiPandas, SiCoursera, SiDatacamp, SiMeta,
  SiFlask, SiApachekafka, SiDatabricks,
} from "react-icons/si";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import {
  TbCube, TbMathFunction, TbSql, TbWorldWww, TbChartBar, TbStack2,
  TbBrandWindows, TbBuildingSkyscraper,
} from "react-icons/tb";

const map: Record<string, IconType> = {
  Python: SiPython, PostgreSQL: SiPostgresql, NiFi: SiApachenifi, Spark: SiApachespark,
  Docker: SiDocker, Airflow: SiApacheairflow, dbt: TbStack2, SQL: TbSql, Snowflake: SiSnowflake,
  FastAPI: SiFastapi, Django: SiDjango, Git: SiGit, "Web scraping": TbWorldWww,
  "Power BI": TbChartBar, "Cubes OLAP/ROLAP": TbCube, Pandas: SiPandas,
  Statistiques: TbMathFunction, Excel: PiMicrosoftExcelLogo,
  // Fournisseurs de certifications
  Coursera: SiCoursera, DataCamp: SiDatacamp, Meta: SiMeta,
  Microsoft: TbBrandWindows, IBM: TbBuildingSkyscraper,
  Flask: SiFlask, Kafka: SiApachekafka, Databricks: SiDatabricks,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name];
  return Icon ? <Icon aria-hidden className={className} /> : null;
}
