function getVideo() {
    let video = document.querySelector("video");
    console.log("Video Fetched!", video);
    return video;
}

let myVideo = getVideo();

let container = document.createElement("div");
container.className = "playback-hud";
container.textContent = "Animator-Playback!";

document.getElementById("movie_player")?.append(container);