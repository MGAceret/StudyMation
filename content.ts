function getVideo() {
    let video = document.querySelector("video");
    console.log("Video Fetched!", video);
    return video;
}

let myVideo = getVideo();

let container = document.createElement("div");
container.textContent = "Animator Playback!"

container.style.zIndex = "999";
container.style.position = "absolute";
container.style.width = "70%";
container.style.height = "10%";
container.style.backgroundColor = "black";
container.style.border = "2px solid #00ffaa"
container.style.borderRadius = "5px"
container.style.top = "20px";
container.style.left = "20px";

document.getElementById("movie_player")?.append(container);