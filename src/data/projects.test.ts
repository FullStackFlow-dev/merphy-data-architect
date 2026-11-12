import { describe, expect, it } from "vitest";
import { getProject, getProjectLinks } from "./projects";

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