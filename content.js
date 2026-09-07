function getVideo() {
    let video = document.querySelector("video");
    console.log("Video Fetched!", video);
    return video;
}

let myVideo = getVideo();

let container = document.createElement("div");
container.className = "playback-hud";
container.textContent = "Animator-Playback!";


const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .playback-hud {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 40%;
        height: 10%;
        background: rgba(18,18,18,0.85);
        border: 2px solid white;
        border-radius: 5px;
        z-index: 999;
        color: white;
    }
`
document.head.appendChild(styleSheet);


document.getElementById("movie_player")?.append(container);