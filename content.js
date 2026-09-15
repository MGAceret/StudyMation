function getVideo() {
    let fetchVideo = document.querySelector("video");
    console.log("Video Fetched!", fetchVideo);
    return fetchVideo;
}

const video = getVideo();

let container = document.createElement("div");
container.className = "playback-hud";

let timeline = document.createElement("input");
timeline.className = "timeline";
timeline.type = "range";
timeline.min = 0;
timeline.value = 0;
timeline.step = 0.01;

let control1 = document.createElement("div");
control1.className ="control1";
let control2 = document.createElement("div");
control2.className ="control2";

let play = document.createElement("button");
play.textContent = "❚❚"
play.className = "play-btn";
let frameSkip = document.createElement("div");
frameSkip.className = "frame-skip"; // To be utilized with parent property (buttons)
let frameCount= document.createElement("div");
frameCount.textContent = "FRAMES: ";
frameCount.className = "frame-count";
let loop = document.createElement("div");
loop.textContent = "LOOP:   "; 
loop.className = "loop";// To be utilized with parent property (buttons)

// frameSkip buttons
let minus5f = document.createElement("button");
minus5f.textContent = "-5f";
let minus1f = document.createElement("button");
minus1f.textContent = "-1f";
let plus1f = document.createElement("button");
plus1f.textContent = "1f";
let plus5f = document.createElement("button");
plus5f.textContent = "5f";

// frameCount interface
let currentFrame = document.createElement("span");
currentFrame.className = "current-frame";
let endFrame = document.createElement("span");
endFrame.className = "end-frame";

// loop buttons
let loopStart = document.createElement("button");
let loopEnd = document.createElement("button");
let loopClear = document.createElement("button");
loopStart.textContent = "Start: --";
loopEnd.textContent = "End: --";
loopClear.textContent = "Clear";

let mirror = document.createElement("button");
mirror.textContent = "Mirror [M]";
mirror.className = "mirror-btn";
let grid = document.createElement("button");
grid.textContent = "Grid [G]";
grid.className = "grid-btn";
let speedControl = document.createElement("div");
speedControl.className = "speed-control"; // To be utilized with parent property (buttons)

// speedControl buttons
let speedQuarter = document.createElement("button");
speedQuarter.textContent = "0.25x";
let speedHalf = document.createElement("button");
speedHalf.textContent = "0.5x";
let speedNormal = document.createElement("button");
speedNormal.textContent = "1.0x";

document.getElementById("movie_player")?.append(container);

container.append(timeline, control1, control2);
control1.append(play, frameSkip, frameCount, loop);
control2.append(mirror, grid, speedControl);

frameSkip.append(minus5f, minus1f, plus1f, plus5f);
frameCount.append(currentFrame, endFrame);
loop.append(loopStart, loopEnd, loopClear);

speedControl.append(speedQuarter, speedHalf, speedNormal)





// Wiring / Functions

// Timeline Scrubber Update
video.addEventListener("timeupdate", () => {
    if (!video) return;
    timeline.value = video.currentTime;
    if (loopStartTime && loopEndTime) {
        timeline.min = loopStartTime;
        timeline.max = loopEndTime;
    } else {
        timeline.min = 0;
        timeline.max = video.duration || 100;
    }
});

// Timeline Scrubber Drag
timeline.addEventListener("input", () => {
    if (!video) return;
    video.currentTime = Number(timeline.value);
});

// Play
play.addEventListener("click", () => {
    if (!video) return;
    if (video.paused) {
        video.play();
        play.textContent = "❚❚"
    } else {
        video.pause();
        play.textContent = "▶"
    }
});

// FrameSkip
function stepFrames (frames, fps = 24) {
    if (!video) return;
    video.pause();
    video.currentTime += frames / fps;
};

minus5f.addEventListener("click", () => stepFrames(-5));
minus1f.addEventListener("click", () => stepFrames(-1));
plus1f.addEventListener("click", () => stepFrames(1));
plus5f.addEventListener("click", () => stepFrames(5));


// PlayBackSpeed
function setSpeed (rate) {
    if (!video) return;
    video.playbackRate = rate;
}

speedQuarter.addEventListener("click", () => setSpeed(0.25));
speedHalf.addEventListener("click", () => setSpeed(0.5));
speedNormal.addEventListener("click", () => setSpeed(1.0));

// Mirror
mirror.addEventListener("click", () => {
    if (!video) return;
    if(video.style.transform === "scaleX(-1)") {
        video.style.transform = "none";
        mirror.className = "mirror-btn";
    } else {
        video.style.transform = "scaleX(-1)";
        mirror.className = "mirror-btn-active";
    }
});

// Grid Overlay
let gridOverlay = document.createElement("div");
gridOverlay.className = "animator-grid-overlay";
gridOverlay.style.display = "none"; // Hidden by default

// Grid Creation
for (let i = 0; i < 9; i++) {
    gridOverlay.append(document.createElement("div"));
}

document.getElementById("movie_player")?.append(gridOverlay);

grid.addEventListener("click", () => {
    if (!video) return;
    if (gridOverlay.style.display === "none") {
        gridOverlay.style.display = "grid";
        grid.className = "grid-btn-active";
    } else {
        gridOverlay.style.display = "none";
        grid.className = "grid-btn";
    }
});

// Frame Update 
video.addEventListener("timeupdate", () => {
    if (!video) return;
    currentFrame.textContent = Math.floor(video.currentTime * 24);
     
});

video.addEventListener("timeupdate", () => {
    if (!video) return;
    endFrame.textContent = " / " + Math.floor(video.duration * 24);
});

// Loop Start-End
let loopStartTime = null;
let loopEndTime = null;

loopStart.addEventListener("click", () => {
    if (!video) return;
    loopStartTime = video.currentTime;
    loopStart.textContent = "Start: " + loopStartTime.toFixed(2) + "s";
    loopStart.className = "loop-btn-active";
    loopClear.disabled = false;
    if (loopStartTime) {
        loopEnd.disabled = false;
    }
});

loopEnd.disabled = true; // Initial Loading
loopEnd.addEventListener("click", () => {
    if (!video) return;
    loopEndTime = video.currentTime;
    loopEnd.textContent = "End: " + loopEndTime.toFixed(2) + "s";
    loopEnd.className = "loop-btn-active";
});

// Loop Function
video.addEventListener("timeupdate", () => {
    if (!video) return;
    if (loopStartTime !== null && loopEndTime !== null) {
        if (video.currentTime >= loopEndTime) {
            video.currentTime = loopStartTime;
        }
    }
});

// Loop Clear
loopClear.disabled = true; // Initial Loading
loopClear.addEventListener("click", () => {
    if (!video) return;
    if ((loopStartTime && loopEndTime) || (loopStartTime || loopEndTime)) {
        loopStartTime = null;
        loopEndTime = null;
        loopStart.textContent = "Start: --";
        loopEnd.textContent = "End: --";
        loopStart.className = "";
        loopEnd.className = "";
        loopEnd.disabled = true;
        loopClear.disabled = true;
    }
});