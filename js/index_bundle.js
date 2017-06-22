/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// import {tracking} from 'tracking/src/trackers';
// import * as tracking from 'tracking';

window.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("video"),
    videoObj = { "video": true },
    errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  if(navigator.mediaDevices) { // Standard
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
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
  document.getElementById('video').addEventListener('click', function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 400, 300);
    var jpegUrl = canvas.toDataURL("image/jpeg");
    document.getElementById("base64").innerHTML = jpegUrl;

    var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);

    tracker.setStepSize(1.7);
    tracking.track('#canvas', tracker);

    tracker.on('track', function(event) {
      event.data.forEach(function(rect) {
        window.plot(rect.x, rect.y, rect.width, rect.height);
      });
    });
    window.plot = function(x, y, w, h) {
      var rect = document.createElement('div');
      document.querySelector('.demo-container').appendChild(rect);
      rect.classList.add('rect');
      rect.style.width = w + 'px';
      rect.style.height = h + 'px';
      rect.style.left = (img.offsetLeft + x) + 'px';
      rect.style.top = (img.offsetTop + y) + 'px';
    };

    // sendFileToCloudVision(
    //   jpegUrl.replace("data:image/jpeg;base64,", ""))


  });
};

    //   var img = document.getElementById('img');
    //   var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    //   tracker.setStepSize(1.7);
    //   tracking.track('#img', tracker);
    //   tracker.on('track', function(event) {
    //     event.data.forEach(function(rect) {
    //       window.plot(rect.x, rect.y, rect.width, rect.height);
    //     });
    //   });
    //   window.plot = function(x, y, w, h) {
    //     var rect = document.createElement('div');
    //     document.querySelector('.demo-container').appendChild(rect);
    //     rect.classList.add('rect');
    //     rect.style.width = w + 'px';
    //     rect.style.height = h + 'px';
    //     rect.style.left = (img.offsetLeft + x) + 'px';
    //     rect.style.top = (img.offsetTop + y) + 'px';
    //   };
    // };

/***/ })
/******/ ]);