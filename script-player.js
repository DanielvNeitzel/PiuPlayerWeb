// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
        playing = false,
        mediaPath = 'https://archive.org/download/daniel_neitzel_hotmail_15E2/',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "Last Rebirth",
            "length": "1:51",
            "file": "1501"
        }, {
            "track": 2,
            "name": "Hellfire",
            "length": "1:57",
            "file": "1503"
        }, {
            "track": 3,
            "name": "Further",
            "length": "1:58",
            "file": "1509"
        }, {
            "track": 4,
            "name": "Bring Back the Beat",
            "length": "1:46",
            "file": "1512"
        }, {
            "track": 5,
            "name": "Sarabande",
            "length": "1:51",
            "file": "1516"
        }, {
            "track": 6,
            "name": "Kasou Shinja",
            "length": "2:49",
            "file": "1517"
        }, {
            "track": 7,
            "name": "Arcana Force",
            "length": "5:45",
            "file": "1525"
        }, {
            "track": 8,
            "name": "Bang Bang Bang",
            "length": "5:27",
            "file": "1544"
        }, {
            "track": 9,
            "name": "Me Gustas Tu",
            "length": "5:46",
            "file": "1545"
        }, {
            "track": 10,
            "name": "Rhythm Ta",
            "length": "5:25",
            "file": "1546"
        }, {
            "track": 11,
            "name": "Chase Me",
            "length": "5:54",
            "file": "1547"
        }, {
            "track": 12,
            "name": "Pick Me",
            "length": "4:41",
            "file": "1548"
        }, {
            "track": 13,
            "name": "Jackpot",
            "length": "13:17",
            "file": "1549"
        }, {
            "track": 14,
            "name": "Boombayah",
            "length": "8:13",
            "file": "1551"
        }, {
            "track": 15,
            "name": "Up & Down",
            "length": "7:03",
            "file": "1553"
        }, {
            "track": 16,
            "name": "You're the Best",
            "length": "5:44",
            "file": "1555"
        }, {
            "track": 17,
            "name": "Number Nine",
            "length": "10:47",
            "file": "1556"
        }, {
            "track": 18,
            "name": "Acquaintance",
            "length": "5:37",
            "file": "1557"
        }, {
            "track": 19,
            "name": "Moon Light Dance",
            "length": "2:49",
            "file": "1564"
        }, {
            "track": 20,
            "name": "Step",
            "length": "5:46",
            "file": "1575"
        }, {
            "track": 21,
            "name": "Just Kidding",
            "length": "13:08",
            "file": "1576"
        }, {
            "track": 22,
            "name": "Death Moon",
            "length": "5:16",
            "file": "15A7"
        }, {
            "track": 23,
            "name": "Christmas Memories",
            "length": "5:47",
            "file": "15A8"
        }, {
            "track": 24,
            "name": "Asterios",
            "length": "4:52",
            "file": "15B0"
        }, {
            "track": 25,
            "name": "Le Grand Bleu",
            "length": "8:44",
            "file": "15B1"
        }, {
            "track": 26,
            "name": "Clue",
            "length": "3:01",
            "file": "15B7"
        }, {
            "track": 27,
            "name": "Vulcan Remix",
            "length": "6:10",
            "file": "15D0"
        }, {
            "track": 28,
            "name": "Me Gustas Tu Full Song",
            "length": "5:06",
            "file": "15E0"
        }, {
            "track": 29,
            "name": "Bang Bang Bang Full Song",
            "length": "12:33",
            "file": "15E1"
        }, {
            "track": 30,
            "name": "Boombayah Full Song",
            "length": "8:57",
            "file": "15E2"
        }, {
            "track": 31,
            "name": "Sarabande Shotcut",
            "length": "4:55",
            "file": "15F0"
        }, {
            "track": 32,
            "name": "Death Moon Shotcut",
            "length": "5:46",
            "file": "15F1"
        }],
        buildPlaylist = $.each(tracks, function(key, value) {
            var trackNumber = value.track,
            trackName = value.name,
            trackLength = value.length;
            if (trackNumber.toString().length === 1) {
                trackNumber = '0' + trackNumber;
            } else {
                trackNumber = '' + trackNumber;
            }
            $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
        }),
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Tocando');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Pausado');
        }).bind('ended', function () {
            npAction.text('Pausado');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        lineTime = $('#audio1').on('timeupdate', function() {
            $('#seekbar').attr("value", this.currentTime / this.duration);
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});