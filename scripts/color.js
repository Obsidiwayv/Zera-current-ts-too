const fs = require("fs");

const originalData = JSON.parse(fs.readFileSync("scripts/colors.json", 'utf8'));

  // Create a new JSON object with keys and values swapped
  const reversedData = {};
  for (const colorName in originalData) {
    reversedData[originalData[colorName]] = colorName;
  }
// Write the reversed JSON data to a new file
fs.writeFileSync("scripts/hex_colors.json", JSON.stringify(reversedData, null, 2), 'utf8');
