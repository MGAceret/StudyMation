<!-- Title + One line description -->
# StudyMation   
### Frame-by-frame study suited for 2D/3D Animators, storyboarders, and choreographers
---
<!-- Introduction Paragraph -->
## Description
StudyMation is a modified playback of an extension to be used as an overlay for YouTube in order to enhance the learning experience of studying of choreography. scenery, and anything animation-alike.
---
<!-- Features created for users -->
## Features
- Timeline scrubber that updates alongside with registered loop
- Frameskipping through one and five frames per (tick?)
- Frame counter which counts the entire video and updates alongside with registered loop
- Looping execution that allows the video to continously play until it was cleared
- Mirror to allow flipping the video... (dunno how to exactly explain it)
- Display grid overlay which is useful for studying ratios. (Golden ratio and whatnot)
- Speed control to allow slow down fast paced motions
---
<!-- Recommendations -->
## Recommendations
- Ads - The extension will appear on every video however, it was not coded to specifically hide whenever an ad is present. It is best to place a detection to only display once an ad is finished or skipped.
- Allow the hud to dynamically change position through dragging
- The hud might be too large for other devices or browsers and would most likely prefer to hide the hud itself for better view. probably only display the frame counter once hidden. 
---
<!-- Programming Languages used -->
## Programming Languages
---
- JavaScript
- CSS
<!-- Directory -->
## Project Structure
---
```
StudyMation/
├── fonts/                                      
    └── Ubuntu-Medium.tff                       # Installed font
├── style/
    └── style.css                               # Custom CSS Styling
├── content.js                                  # StudyMation core engine
├── manifest.json                               # Prerequisite file for initialization
└── README.md                                   # This file
```
<!-- Shortcut changes -->
## Keyboard Shortcut changes
### What was added
- **[, ]** - Loop Start and Loop End respectively
- **Esc** - Clears registered Loop
- **M / m** - Mirror
- **G / g** - Grid Overlay
- **-, =** - Speed toggle up/down
### What was overwritten
- **M** - Mute
- **<, >** - Native Speed toggle
- **,, .** - Native Frameskip by one frame
---
<!-- Installation via Local Setup -->
## Local Usage / Installation
- You can install and use this extension locally on any chromium-based browser (Google Chrome, Brave, Microsoft Edge, Opera, Vivaldi):
- 1. Use the terminal and enter this command line:
```
git clone https://github.com/MGAceret/Animator-Playback.git
```
- 2. Open extensions page:
Open your browser and navigate to ```chrome://extensions/``` or ```edge://extensions/``` if you are using Edge.
- 3. Enable the 'Developer mode'
- 4. Click the 'Load Unpacked' 
- 5. Navigate to the cloned repository folder, containing the manifest.json
- 6. Start studying
Navigate to any video on YouTube
The StudyMation HUD will automatically appear upon playing so you can start studying!
---
<!-- Demonstration video or gif -->
## Demonstration
<!-- To be placed here -->
