document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy-video"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          // Check if data-src exists and set src if needed
          if (video.target.dataset.src) {
             video.target.src = video.target.dataset.src;
             delete video.target.dataset.src;
          }
          // Play the video
          video.target.play();
        } else {
          // Pause the video
          video.target.pause();
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
