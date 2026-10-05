import json

transcript_path = '/Users/ng.thaotrang/.gemini/antigravity-ide/brain/e37a6e71-fb13-4a20-9cb6-7490814409b8/.system_generated/logs/transcript_full.jsonl'
with open(transcript_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'TOOL_RESPONSE':
            content = data.get('content', '')
            if 'Showing lines 1 to 620' in content and 'FitStudio.tsx' in content:
                # Extract the code
                code_lines = []
                lines = content.split('\n')
                in_code = False
                for l in lines:
                    if l.startswith('1: import React'):
                        in_code = True
                    if l.startswith('The above content shows'):
                        in_code = False
                    
                    if in_code:
                        # strip the "line_number: " prefix
                        parts = l.split(': ', 1)
                        if len(parts) == 2 and parts[0].isdigit():
                            code_lines.append(parts[1])
                        else:
                            # some lines might not have prefix if wrapped? 
                            pass

                with open('/Users/ng.thaotrang/Desktop/stylemate---virtual-fashion-wardrobe-&-styling-platform/src/components/FitStudio.tsx', 'w') as out:
                    out.write('\n'.join(code_lines))
                print("Restored!")
                break
