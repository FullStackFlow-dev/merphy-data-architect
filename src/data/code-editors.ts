const embeddedEditors = [
  {
    "id": "postgresql",
    "label": "PostgreSQL",
    "src": "https://coddy.tech/embed-editor?lang=postgresql&theme=dark&code=U0VMRUNUIG5hbWUsIHNhbGFyeSBGUk9NIGVtcGxveWVlcwpXSEVSRSBuYW1lIElMSUtFICdhJScKT1JERVIgQlkgc2FsYXJ5IERFU0M7Cg&credit=0"
  },
  {
    "id": "python",
    "label": "Python",
    "src": "https://coddy.tech/embed-editor?lang=python&theme=dark&code=bmFtZSA9IGlucHV0KCJXaGF0IGlzIHlvdXIgbmFtZT8gIikKYWdlID0gaW50KGlucHV0KCJIb3cgb2xkIGFyZSB5b3U_ICIpKQpwcmludChmIkhlbGxvLCB7bmFtZX0hIFlvdSBhcmUge2FnZX0geWVhcnMgb2xkLiIpCg&stdin=QWxpY2UKMzAK&credit=0"
  },
  {
    "id": "matplotlib",
    "label": "Python · Matplotlib",
    "src": "https://coddy.tech/embed-editor?lang=matplotlib&theme=dark&code=aW1wb3J0IG51bXB5IGFzIG5wCmltcG9ydCBtYXRwbG90bGliLnB5cGxvdCBhcyBwbHQKCnggPSBucC5saW5zcGFjZSgwLCAyICogbnAucGksIDIwMCkKCnBsdC5wbG90KHgsIG5wLnNpbih4KSwgbGFiZWw9InNpbih4KSIpCnBsdC5wbG90KHgsIG5wLmNvcyh4KSwgbGFiZWw9ImNvcyh4KSIsIGxpbmVzdHlsZT0iLS0iKQpwbHQudGl0bGUoIlNpbmUgYW5kIGNvc2luZSIpCnBsdC54bGFiZWwoInggKHJhZGlhbnMpIikKcGx0LnlsYWJlbCgieSIpCnBsdC5sZWdlbmQoKQpwbHQuZ3JpZChhbHBoYT0wLjMpCnBsdC5zaG93KCkKCnByaW50KGYie2xlbih4KX0gcG9pbnRzIGZyb20gMCB0byB7eFstMV06LjJmfSIpCg&credit=0"
  },
  {
    "id": "sql",
    "label": "SQL",
    "src": "https://coddy.tech/embed-editor?lang=sql&theme=dark&code=U0VMRUNUIGUubmFtZSwgZS5kZXBhcnRtZW50LCBlLnNhbGFyeSwgZC5idWRnZXQKRlJPTSBlbXBsb3llZXMgQVMgZQpKT0lOIGRlcGFydG1lbnRzIEFTIGQgT04gZC5uYW1lID0gZS5kZXBhcnRtZW50Ck9SREVSIEJZIGUuc2FsYXJ5IERFU0M7Cg&credit=0"
  }
];

export const codeEditors = [
  ...embeddedEditors.map((editor) => ({ ...editor, extension: editor.id === "sql" || editor.id === "postgresql" ? "sql" : "py", code: "" })),
  { id: "pandas", label: "Python · Pandas", extension: "py", code: 'import pandas as pd\n\ndf = pd.DataFrame({"Ville": ["Dakar", "Thiès"], "Température": [28, 30]})\nprint(df)\nprint(df.describe())\n' },
  { id: "numpy", label: "Python · NumPy", extension: "py", code: 'import numpy as np\n\nvaleurs = np.array([24, 26, 28, 30])\nprint("Moyenne :", np.mean(valeurs))\nprint("Écart-type :", np.std(valeurs))\n' },
  { id: "excel", label: "Excel", extension: "xlsx", code: "" },
  { id: "dax", label: "DAX", extension: "dax", code: 'Total Ventes = SUM(Ventes[Montant])\n\nVentes Année Précédente =\nCALCULATE([Total Ventes], SAMEPERIODLASTYEAR(Calendrier[Date]))\n' },
];
