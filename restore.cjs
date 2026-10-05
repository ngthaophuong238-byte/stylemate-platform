const fs = require('fs');

const transcriptPath = '/Users/ng.thaotrang/.gemini/antigravity-ide/brain/e37a6e71-fb13-4a20-9cb6-7490814409b8/.system_generated/logs/transcript_full.jsonl';
const fileContent = fs.readFileSync(transcriptPath, 'utf8');

const lines = fileContent.split('\n');
for (const line of lines) {
  if (!line.trim()) continue;
  const data = JSON.parse(line);
  if (data.type === 'TOOL_RESPONSE' && data.content.includes('Showing lines 1 to 620') && data.content.includes('1: import React')) {
    const content = data.content;
    const startIndex = content.indexOf('1: import React');
    const endIndex = content.indexOf('The above content shows the entire');
    if (startIndex !== -1 && endIndex !== -1) {
      const codeRaw = content.slice(startIndex, endIndex);
      const codeLines = [];
      for (const l of codeRaw.split('\n')) {
        const parts = l.split(': ');
        if (parts.length >= 2 && !isNaN(parseInt(parts[0]))) {
          codeLines.push(parts.slice(1).join(': '));
        }
      }
      
      fs.writeFileSync('/Users/ng.thaotrang/Desktop/stylemate---virtual-fashion-wardrobe-&-styling-platform/src/components/FitStudio.tsx', codeLines.join('\n'));
      console.log('RESTORED!');
      break;
    }
  }
}
