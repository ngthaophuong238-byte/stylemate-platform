import json

transcript_path = '/Users/ng.thaotrang/.gemini/antigravity-ide/brain/e37a6e71-fb13-4a20-9cb6-7490814409b8/.system_generated/logs/transcript_full.jsonl'
with open(transcript_path, 'r') as f:
    lines = f.readlines()

for line in reversed(lines):
    if not line.strip(): continue
    data = json.loads(line)
    if data.get('type') == 'TOOL_RESPONSE' and 'Showing lines 1 to 620' in str(data):
        try:
            content = data['tool_responses'][0]['response']['output']
            idx_start = content.find("1: import React")
            idx_end = content.find("The above content shows the entire")
            if idx_start != -1 and idx_end != -1:
                code_raw = content[idx_start:idx_end]
                code_lines = []
                for l in code_raw.split('\n'):
                    parts = l.split(': ', 1)
                    if len(parts) == 2 and parts[0].isdigit():
                        code_lines.append(parts[1])
                
                with open('/Users/ng.thaotrang/Desktop/stylemate---virtual-fashion-wardrobe-&-styling-platform/src/components/FitStudio.tsx', 'w') as out_f:
                    out_f.write('\n'.join(code_lines))
                print("RESTORED! Lines:", len(code_lines))
                break
        except Exception as e:
            print("Error", e)
