from PIL import Image
import os

img_path = './public/mockup.png'
img = Image.open(img_path)

# Let's crop the portraits. 
# Looking at the original image 580x1024, the left panel is roughly x=110 to 190.
# Let's crop the face portraits and the full body.
# Wait, I don't need to crop them physically! I can just use CSS background-image and background-position!
# But to be clean, let's extract them into separate PNGs.

# Let's define bounding boxes manually based on typical proportions.
# Actually, I can just use CSS! It's much easier to tweak CSS live if I need to.
# Let me write a script that generates an HTML file that visualizes the crops, but I can't view HTML easily.
# Let's just output cropped images and guess the coordinates. 
# I will do a quick sweep of coordinates and save them.

# First, find the dimensions
width, height = img.size
print(f"Image size: {width}x{height}")

# Full body model is likely in the right side of the window.
# Window is maybe x=110 to 460, y=70 to 830
# Center panel: x=200 to 460, y=100 to 800
full_body = img.crop((195, 105, 465, 805))
full_body.save('./public/model_full.png')

# Left panel portraits: x=115 to 190. There are 6 of them.
# y ranges from 105 to 805. Let's say each is about (805-105)/6 = 116 height.
# They have margins. Let's crop them roughly.
for i in range(6):
    y_start = 105 + i * 115
    y_end = y_start + 110
    portrait = img.crop((115, y_start, 190, y_end))
    portrait.save(f'./public/portrait_{i}.png')

