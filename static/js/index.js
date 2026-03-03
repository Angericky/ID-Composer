window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    // Results 不再使用轮播组件，因此移除 bulmaCarousel 初始化

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // Copy BibTeX functionality
    $('#copy-bibtex-btn').click(function() {
      var bibtexText = $('#bibtex-content').text().trim();
      navigator.clipboard.writeText(bibtexText).then(function() {
        var $btn = $('#copy-bibtex-btn');
        var originalHtml = $btn.html();
        
        $btn.html('<span class="icon"><i class="fas fa-check"></i></span><span>Copied!</span>');
        $btn.addClass('is-success').removeClass('is-dark is-outlined');
        
        setTimeout(function() {
          $btn.html(originalHtml);
          $btn.removeClass('is-success').addClass('is-dark is-outlined');
        }, 2000);
      }, function(err) {
        console.error('Could not copy text: ', err);
      });
    });

})
