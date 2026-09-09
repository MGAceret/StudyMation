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
let frameSkip = document.createElement("div");
let frameCount= document.createElement("div");
let loop = document.createElement("div");

// frameSkip buttons
let minus5f = document.createElement("button");
let minus1f = document.createElement("button");
let plus1f = document.createElement("button");
let plus5f = document.createElement("button");

// frameCount interface
let currentFrame = document.createElement("span");
let endFrame = document.createElement("span");

// loop buttons
let loopStart = document.createElement("button");
let loopEnd = document.createElement("button");

let mirror = document.createElement("button");
let grid = document.createElement("button");
let speedControl = document.createElement("div");

// speedControl buttons
let speedQuarter = document.createElement("button");
let speedHalf = document.createElement("button");
let speedNormal = document.createElement("button");

document.getElementById("movie_player")?.append(container);