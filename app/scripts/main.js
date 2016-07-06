
var videos = [
                                'Eo56UBLBQ7I',
                                'tvZ6xRz14z4',
                                'wNthIu9FFkw',
                                'fkisILqne1c',
                                'fkzFHVEz9X0',
                                'X7JQu06ylFM',
                                'M7lc1UVf-VE',
                                'X7JQu06ylFM',
                                'M7lc1UVf-VE',
                                'X7JQu06ylFM',
                                'M7lc1UVf-VE',
                                'X7JQu06ylFM',
                                'M7lc1UVf-VE',
                                'X7JQu06ylFM',
                                'M7lc1UVf-VE',
                                'X7JQu06ylFM'
];

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerInfoList = [{
    id: 'player-1',
    height: '390',
    width: '640',
    videoId: videos[0]
}, {
    id: 'player-2',
    height: '390',
    width: '640',
    videoId: videos[1]
}, {
    id: 'player-3',
    height: '390',
    width: '640',
    videoId: videos[2]
}, {
    id: 'player-4',
    height: '390',
    width: '640',
    videoId: videos[3]
}, {
    id: 'player-5',
    height: '390',
    width: '640',
    videoId: videos[4]
}];

function onYouTubeIframeAPIReady() {
    if (typeof playerInfoList === 'undefined') return;
    
    for (var i = 0; i < playerInfoList.length; i++) {
        var curplayer = createPlayer(playerInfoList[i]);
        players[i] = curplayer;
    }
}

var players = new Array();

function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
        height: playerInfo.height,
        width: playerInfo.width,
        videoId: playerInfo.videoId,
        playerVars: { 'autoplay': 0, 'controls': 0 }
    });
}

$(document).ready(function () {

    $('.overlay').on( 'click', function(){
        var indexof = $('.overlay').index( $(this) );
        players[ indexof ].loadVideoById( videos[ Math.floor(Math.random()*videos.length) ] );
        console.log( indexof  );
    });
 
    $('#play').click(function () {
        //loop players array to stop them all
        $(players).each(function (i) {
            console.log(this);
            this.playVideo();
        });

        videosSize();
    });

    $('#stop').click(function () {
        //loop players array to stop them all
        $(players).each(function (i) {
            console.log(this);
            this.stopVideo();
        });
    });

    videosSize();
    
    function videosSize(){
    	$('iframe').each(function(index, el) {
	    	$(this).css({
	    		width: $(window).width(),
	    		height: $(window).height()
	    	});
	    });
    }
})