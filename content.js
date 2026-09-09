function getVideo() {
    let video = document.querySelector("video");
    console.log("Video Fetched!", video);
    return video;
}

let myVideo = getVideo();

let container = document.createElement("div");
container.className = "playback-hud";

let timeline = document.createElement("div");
let control1 = document.createElement("div");
let control2 = document.createElement("div");

let play = document.createElement("button");
play.textContent = "▶"
let frameSkip = document.createElement("div");
let frameCount= document.createElement("div");
frameCount.textContent = "FRAMES: "
let loop = document.createElement("div");
loop.textContent = "LOOP:"

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
let endFrame = document.createElement("span");


// loop buttons
let loopStart = document.createElement("button");
let loopEnd = document.createElement("button");
loopStart.textContent = "Start: --";
loopEnd.textContent = "End: --";

let mirror = document.createElement("button");
mirror.textContent = "Mirror [M]";
let grid = document.createElement("button");
grid.textContent = "Grid [G]";
let speedControl = document.createElement("div");

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
loop.append(loopStart, loopEnd);

speedControl.append(speedQuarter, speedHalf, speedNormal)