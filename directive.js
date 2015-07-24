angular.module('ccbApp').directive("brightcove", function($timeout) {
  return {
    restrict: "E",
    replace: true,
    transclude: false,
    scope: {
      videoId: "@"
    },
    template: '<object id="myExperience{{ videoId }}" class="BrightcoveExperience"">\
                <param name="bgcolor" value="#000000">\
                <param name="width" value="800">\
                <param name="height" value="534">\
                <param name="playerID" value="2344262015001">\
                <param name="playerKey" value="AQ~~,AAAA1oy1bvE~,ALl2ezBj3WG3MLvDx9F9zkV06cNK00ey">\
                <param name="isVid" value="true">\
                <param name="isUI" value="true">\
                <param name="dynamicStreaming" value="true">\
                <param name="autoStart" value="true">\
                <param name="wmode" value="transparent">\
                <param name="@videoPlayer" value="{{ videoId }}">\
              </object>',
    link: function(scope, element, attrs) {
      return $timeout(function() {
        return brightcove.createExperiences();
      });
    }
  };
});

angular.module('ccbApp').directive('youtube', function($window) {
  return {
    restrict: "A",

    scope: {
      height:   "@",
      width:    "@",
      videoId:  "@"  
    },

    template: '<div></div>',

    link: function($scope, element) {

      var player, tag, firstScriptTag,
          ytConfig = {
            playerVars: {
              autoplay: 0,
              html5: 1,
              theme: "light",
              modesbranding: 0,
              color: "white",
              iv_load_policy: 3,
              showinfo: 1,
              controls: 1
            },

            height: $scope.height,
            width: $scope.width,
            videoId: $scope.videoId
          };

      if(document.getElementById('ytScript') == null){
        tag = document.createElement('script');
        tag.setAttribute("id", "ytScript");
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      
      if($window.YT && $window.YT.loaded){
        // console.warn('already loaded');
        player = new YT.Player(element.children()[0], ytConfig);
      } else {
        // console.warn('waiting for youtube');
        $window.onYouTubeIframeAPIReady = function() {
          player = new YT.Player(element.children()[0], ytConfig);
        };
      } 

    }  
  }
});