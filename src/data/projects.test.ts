import { describe, expect, it } from "vitest";
import { getProject, getProjectLinks, projects } from "./projects";

describe("Pending project destinations", () => {
  it("uses the official DWI GitHub repository and keeps deployment pending", () => {
    const project = getProject("dakar-weather-intelligence");
    if (!project) throw new Error("DWI project missing");
    expect(getProjectLinks(project)).toEqual({ github: "https://github.com/FullStackFlow-dev/Dakar-Weather-Intelligence_-DWI-", demo: undefined });
  });
  it("uses supplied official URLs without substituting destinations", () => {
    const project = getProject("mobilite-urbaine-senegal");
    if (!project) throw new Error("Mobility project missing");
    expect(getProjectLinks(project).github).toBe("https://github.com/merphy-mademba/Mirah-BI-Urban-Mobility-Analytics");
  });
});
describe("Projects added to the portfolio", () => {
  it.each([
    ["wal-transit-engine", "https://github.com/FullStackFlow-dev/WAL-Transit-Engine-West-Africa-Logistics-Transit-Engine-"],
    ["artenova-shop", "https://github.com/FullStackFlow-dev/Projet-Site-E-commerce-ArteNova-Shop"],
    ["mirah-bi-urban-mobility-analytics", "https://github.com/FullStackFlow-dev/Urban-Mobility-Analytics"],
    ["mirah-bi-test-platform", "https://github.com/FullStackFlow-dev/MIRAH-BI-Test-Platform"],
  ])("keeps the supplied repository for %s", (slug, githubUrl) => {
    const project = getProject(slug);
    if (!project) throw new Error(`Project missing: ${slug}`);
    expect(project.status).toBe("En développement");
    expect(getProjectLinks(project).github).toBe(githubUrl);
  });

  it("keeps the existing ArtéNova demo destination", () => {
    const project = getProject("artenova-shop");
    if (!project) throw new Error("ArtéNova project missing");
    expect(getProjectLinks(project).demo).toBe("https://artenova-shoponline.vercel.app");
  });

  it("does not introduce an AI or machine-learning skills category", async () => {
    const { skills } = await import("./profile");
    expect(Object.keys(skills).some((category) => /\bIA\b|machine learning/i.test(category))).toBe(false);
  });

  it("preserves the existing project records", () => {
    expect(getProject("dakar-weather-intelligence")).toBeDefined();
    expect(getProject("mobilite-urbaine-senegal")).toBeDefined();
  });
});
