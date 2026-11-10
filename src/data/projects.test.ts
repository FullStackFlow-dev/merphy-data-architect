import { describe, expect, it } from "vitest";
import { getProject, getProjectLinks } from "./projects";

describe("Pending project destinations", () => {
  it("keeps DWI GitHub and deployment unavailable until official URLs are supplied", () => {
    const project = getProject("dakar-weather-intelligence");
    if (!project) throw new Error("DWI project missing");
    expect(getProjectLinks(project)).toEqual({ github: undefined, demo: undefined });
  });
  it("uses supplied official URLs without substituting destinations", () => {
    const project = getProject("mobilite-urbaine-senegal");
    if (!project) throw new Error("Mobility project missing");
    expect(getProjectLinks(project).github).toBe("https://github.com/merphy-mademba/Mirah-BI-Urban-Mobility-Analytics");
  });
});