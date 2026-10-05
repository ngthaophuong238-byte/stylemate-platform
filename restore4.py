import json

transcript_path = '/Users/ng.thaotrang/.gemini/antigravity-ide/brain/e37a6e71-fb13-4a20-9cb6-7490814409b8/.system_generated/logs/transcript_full.jsonl'
with open(transcript_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'TOOL_RESPONSE' and 'output' in data.get('content', ''):
            # Parse the content as JSON? 
            # In transcript_full.jsonl, content is a string containing JSON or the raw text.
            pass
        
        # Let's just string match!
        text = str(data)
        if 'Showing lines 1 to 620' in text and '1: import React' in text:
            # find output string
            try:
                content_dict = json.loads(data['content'])
                output = content_dict['output']
                
                idx_start = output.find("1: import React")
                idx_end = output.find("The above content shows the entire")
                if idx_start != -1 and idx_end != -1:
                    code_raw = output[idx_start:idx_end]
                    code_lines = []
                    for l in code_raw.split('\n'):
                        parts = l.split(': ', 1)
                        if len(parts) == 2 and parts[0].isdigit():
                            code_lines.append(parts[1])
                    
                    with open('/Users/ng.thaotrang/Desktop/stylemate---virtual-fashion-wardrobe-&-styling-platform/src/components/FitStudio.tsx', 'w') as out_f:
                        out_f.write('\n'.join(code_lines))
                    print("RESTORED!")
                    break
            except Exception as e:
                pass
