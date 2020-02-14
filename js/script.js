const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');
let volumeSlider = document.getElementById("volume");

function changeBodyBg(color) {
    document.body.style.background = color;
}

function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;
}

function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    play.setAttribute('data-icon', 'P');
}

let intervalFwd;
let intervalRwd;

function videoBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if (rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        video.play();
    } else {
        rwd.classList.add('active');
        video.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function videoForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if (fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        video.play();
    } else {
        fwd.classList.add('active');
        video.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if (video.currentTime <= 3) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        stopVideo();
    } else {
        video.currentTime -= 3;
    }
}

function windForward() {
    if (video.currentTime >= video.duration - 3) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopVideo();
    } else {
        video.currentTime += 3;
    }
}

function changeVolume() {
    video.volume = volumeSlider.value;
}

rwd.classList.remove('active');
fwd.classList.remove('active');
clearInterval(intervalRwd);
clearInterval(intervalFwd);

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
rwd.addEventListener('click', videoBackward);
fwd.addEventListener('click', videoForward);
