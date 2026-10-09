import type { IconType } from "react-icons";
import {
  SiPython, SiPostgresql, SiApachenifi, SiApachespark, SiDocker, SiApacheairflow,
  SiSnowflake, SiFastapi, SiDjango, SiGit, SiPandas,
} from "react-icons/si";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { TbCube, TbMathFunction, TbSql, TbWorldWww, TbChartBar, TbStack2 } from "react-icons/tb";

const map: Record<string, IconType> = {
  Python: SiPython, PostgreSQL: SiPostgresql, NiFi: SiApachenifi, Spark: SiApachespark,
  Docker: SiDocker, Airflow: SiApacheairflow, dbt: TbStack2, SQL: TbSql, Snowflake: SiSnowflake,
  FastAPI: SiFastapi, Django: SiDjango, Git: SiGit, "Web scraping": TbWorldWww,
  "Power BI": TbChartBar, "Cubes OLAP/ROLAP": TbCube, Pandas: SiPandas,
  Statistiques: TbMathFunction, Excel: PiMicrosoftExcelLogo,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name];
  return Icon ? <Icon aria-hidden className={className} /> : null;
}
