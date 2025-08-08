function getLanguageBadge(language) {
  if (!language || !language.name || !language.percent)
    return "/Unknown-gray?style=for-the-badge";

  const colorMap = {
    JavaScript: "fdcf08",
    TypeScript: "087cd1",
    Python: "4d8bbc",
    "Jupyter Notebook": "f37b2d",
    HTML: "E34F26",
    CSS: "41b4e1",
    SCSS: "d673a6",
    PHP: "777BB4",
    Java: "007396",
    C: "A8B9CC",
    "C++": "00599C",
    "C#": "239120",
    Go: "00ADD8",
    Ruby: "CC342D",
    Shell: "89E051",
    Kotlin: "7F52FF",
    Rust: "DEA584",
  };

  const color = colorMap[language.name] || "999999"; // default grey
  const label = `${language.name} ${language.percent}%`;

  // Encode label biar aman di URL
  const encodedLabel = encodeURIComponent(label);

  return `/${encodedLabel}-${color}?style=for-the-badge&logo=${language.name}&logoColor=white`;
}
