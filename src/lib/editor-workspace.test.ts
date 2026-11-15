import { describe, expect, it } from "vitest";
import { decodeWorkspace, encodeWorkspace } from "./editor-workspace";

describe("editor workspace", () => {
  it("shares and restores Unicode code and spreadsheet cells", () => {
    const document = { editorId: "pandas", code: 'print("Météo à Dakar")', name: "météo.py", rows: [["Dakar", "25"]] };
    expect(decodeWorkspace(encodeWorkspace(document))).toEqual(document);
  });
  it("rejects malformed shared documents", () => {
    expect(() => decodeWorkspace(btoa(JSON.stringify({ editorId: "excel", code: 42, name: "test", rows: [] })))).toThrow();
  });
});