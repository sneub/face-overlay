window.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("video"),
    videoObj = { "video": true },
    errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  var constraints = {
    audio: false,
    video: { 
      facingMode: "user",
      frameRate: { ideal: 15, max: 15 }
    },
  };

  if(navigator.mediaDevices) { // Standard
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      video.srcObject = stream;
    }).catch(errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  } else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function(stream){
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  } else {
    alert('Sorry, your browser does not support getUserMedia');
  }
}, false);

// Trigger photo take
window.onload = function() {
  var canvas = document.getElementById('canvas');
  var tracker = new tracking.ObjectTracker(['face']);
  tracker.setStepSize(1.7);
  tracking.track('#video', tracker);

  tracker.on('track', function(event) {
    event.data.forEach(function(rect) {
      window.plot(rect.x, rect.y, rect.width, rect.height);
    });
  });
  window.plot = function(x, y, w, h) {
    var video = document.getElementById('video');
    var hair = document.getElementById('hair');
    hair.style.display = 'block';
    hair.style.width = w + 'px';
    hair.style.left = (video.offsetLeft + x) + 'px';
    hair.style.top = (video.offsetTop + y)-(h/2) + 'px';
  };
};
