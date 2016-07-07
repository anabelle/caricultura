
var videos = [
                                '9Tn0pXzwTHA',
                                'n1yu_q1pH5o',
                                'GRrIyvr1opc',
                                '2xpZOM1enoU',
                                'H6RjlMZpz_I',
                                '8JHYLTRMqGw',
                                'zTaWNUq3ZUc',
                                '3N98Zc84KP8',
                                'Rz50ph09e1A',
                                'RNB-_srEYzQ',
                                'J8m7uw7_Ies',
                                '2e_AucBegKw',
                                '43jgOj6Bb_0',
                                'oYGusu4p9vY'
];

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
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
        events: {
            'onStateChange': onPlayerStateChange
        },
        playerVars: { 'autoplay': 0, 'controls': 0 }
    });
}

function onPlayerStateChange(event) {

    if ( event.data == YT.PlayerState.ENDED ) {
            event.target.playVideo();
    }
}

$(document).ready(function () {


    $('#wtf').on('click', function(){ 
            if ($('.texto').hasClass('desplegado')) {
                $('.texto').removeClass('desplegado');

            }else{
                $('.texto').addClass('desplegado');
            }
    });

    $('.overlay').on( 'click', function(){
        var indexof = $('.overlay').index( $(this) );
        players[ indexof ].loadVideoById( videos[ Math.floor(Math.random()*videos.length) ] );
        console.log( indexof  );
    });
 
    $('#play').on( 'click', function () {

        if( $('.paused').length === 0 ){

            $(this).addClass('paused');
            $('body').addClass('playing');

            //loop players array to stop them all
            $(players).each(function (i) {
                this.playVideo();
                this.mute();
            });

            players[3].unMute();
            $('#volumen').removeClass('off')
            videosSize();        
        }else{

            $(this).removeClass('paused');
            //loop players array to stop them all
            $(players).each(function (i) {
                this.pauseVideo();
            });  

        }
        fadeOverlay()

    });



    $('#volumen').on( 'click', function () {

        if( $('.off').length === 0 ){

            $(this).addClass('off');
            //loop players array to stop them all
            players[3].mute();

            videosSize();        
        }else{

            $(this).removeClass('off');
            //loop players array to stop them all
            players[3].unMute();

        }

    });

    $('#random').click(function () {
        //loop players array to stop them all
        $(players).each(function (i) {
            this.loadVideoById( videos[ Math.floor(Math.random()*videos.length) ] );
            this.mute();
        });
        players[3].unMute();
        $('#volumen').removeClass('off')
        $('#play').addClass('paused');
        fadeOverlay()
        videosSize(); 
    });

    $('#stop').click(function () {
        //loop players array to stop them all
        $(players).each(function (i) {
            this.stopVideo();
        });
    });

    function fadeOverlay(){
        $('.overlay').css({
            background: 'transparent',
            color: 'transparent'
        });
    }
    
    function videosSize(){
        var windowheight = $(window).height();
        var headerheight = $('header').outerHeight();
        var controlheight = $('#menu').outerHeight();

        var freeheight = windowheight - headerheight - controlheight;
        var stripheight = freeheight / 5;

        $('.player_container').height( stripheight );
        $('.overlay').css( 'line-height', stripheight+'px' );

        $('#player_container_1').css('top', 0 );
        $('#player_container_2').css('top', stripheight );
        $('#player_container_3').css('top', stripheight * 2);
        $('#player_container_4').css('top', stripheight * 3);
        $('#player_container_5').css('top', stripheight * 4);


        $('#player_container_1 iframe').css('top', 0 );
        $('#player_container_2 iframe').css('top', -stripheight );
        $('#player_container_3 iframe').css('top', -stripheight * 2);
        $('#player_container_4 iframe').css('top', -stripheight * 3);
        $('#player_container_5 iframe').css('top', -stripheight * 4);

    	$('iframe').each(function(index, el) {
	    	$(this).css({
	    		width: $(window).width(),
	    		height: freeheight
	    	});
	    });
    }

    $(window).load( function(){
        videosSize();
    });

    $(window).resize( videosSize );
});