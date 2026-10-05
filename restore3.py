import json

transcript_path = '/Users/ng.thaotrang/.gemini/antigravity-ide/brain/e37a6e71-fb13-4a20-9cb6-7490814409b8/.system_generated/logs/transcript_full.jsonl'
with open(transcript_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        content = str(data)
        if 'Showing lines 1 to 620' in content and 'FitStudio: React.FC<FitStudioProps>' in content:
            # We found the tool response! Let's extract it.
            # The tool response might be deeply nested.
            # Let's just find the string that starts with "1: import React"
            idx_start = content.find("1: import React")
            idx_end = content.find("The above content shows the entire")
            if idx_start != -1 and idx_end != -1:
                code_raw = content[idx_start:idx_end]
                # Split by \n or whatever it is escaped as
                # Since it's a python dict string repr, it might have \n escaped.
                import ast
                try:
                    out = data['tool_responses'][0]['response']['output']
                    idx_start = out.find("1: import React")
                    idx_end = out.find("The above content shows the entire")
                    code_raw = out[idx_start:idx_end]
                    code_lines = []
                    for l in code_raw.split('\\n'):
                        # l might be literal \n or actual newline
                        pass
                    
                    code_lines = []
                    for l in code_raw.split('\n'):
                        parts = l.split(': ', 1)
                        if len(parts) == 2 and parts[0].isdigit():
                            code_lines.append(parts[1])
                        elif l.strip():
                            pass
                    
                    with open('/Users/ng.thaotrang/Desktop/stylemate---virtual-fashion-wardrobe-&-styling-platform/src/components/FitStudio.tsx', 'w') as out_f:
                        out_f.write('\n'.join(code_lines))
                    print("RESTORED!")
                    break
                except Exception as e:
                    print("Error", e)
