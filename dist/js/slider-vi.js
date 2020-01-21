'use strict';

let isAPIYoutubeLoad = document.querySelectorAll('script');
let tag = document.createElement('script');

var x = {
    aInternal: 10,
    aListener: function(val) {},
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}



for (const key in isAPIYoutubeLoad) {
    if (isAPIYoutubeLoad.hasOwnProperty(key)) {
        const element = isAPIYoutubeLoad[key];

        if (element.getAttribute('src') === 'https://www.youtube.com/iframe_api') {

            break;
        } else {
            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        }

    }
}


let DEBUG;



class SimpleVideoSlider {

    constructor(options) {
        let classSV = this;

        const version = "0.5";
        const globalVAR = null;
        this.timerSlider = null;
        this.durationCurrSlide = null;
        this.countG = 0;
        this.xDown = null;
        this.yDown = null;
        this.countYTVideo = 0;
        this.isPlayYT = false;
        this.player = null;
        this.firstVideoSlide = true;

        const defaults = {
            DEBUG: false,
            sliderId: 'simpleSlider',
            listImage: [],
            durationIMG: 4000,
            loop: true,
            navBtn: true,
            pages: true,
            padding: "0",
            autoplay: true,
            videoautoplay: false,
            videocontrol: false,
            bgcolor: "#000",
            prevbtn: "prev-btn",
            nextbtn: "next-btn",
            animate: "fadeIn",
            idPages: "pagesnav",
            colorPagesOff: "#ddd",
            colorPagesOn: "#555",

        };

        const populated = Object.assign(defaults, options);
        for (const key in populated) {
            if (populated.hasOwnProperty(key)) {
                this[key] = populated[key];
            }
        }

        if (defaults.DEBUG) console.log('        %c << == Current version Simple Video Slider :%s == >>', 'color: #000; background-color: #faa; padding: 2px 5px; border-radius: 2px', version);

    }


    // геттер
    get options() {
        return `${this.options}`;
    }

    // сеттер
    set options(newValue) {
        [this.options] = newValue.split(' ');
    }


    initPlayaerVI() {

        DEBUG = this.DEBUG;
        const classSV = this;
        let slide = null;

        let SVSlider = document.getElementById(classSV.sliderId);



        SVSlider.setAttribute("style", 'background-color: ' + classSV.bgcolor + ';');

        SVSlider.addEventListener('touchstart', classSV.handleTouchStart.bind(this), false);
        SVSlider.addEventListener('touchmove', classSV.handleTouchMove.bind(this), false);

        if (classSV.DEBUG) console.log('INIT SVSlider :', SVSlider);
        if (classSV.DEBUG) console.log('INIT classSV :', classSV);
        if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
        if (classSV.DEBUG) console.log('listImage :', classSV.listImage);

        let SVSPages = document.getElementById(classSV.idPages);

        if (classSV.listImage.length) {
            for (let ix = 0; ix < classSV.listImage.length; ix++) {
                switch (classSV.listImage[ix].type) {
                    case 'image':
                        slide = document.createElement('div');
                        break;
                    case 'video':
                        slide = document.createElement('div');
                        break;
                    case 'youtube':
                        classSV.countYTVideo++;
                        slide = document.createElement("div");
                        slide.setAttribute("id", 'yut' + classSV.countYTVideo);

                        break;

                    default:
                        break;
                }


                const element = classSV.listImage[ix];
                //if (classSV.DEBUG) console.log('listImage URL [' + ix + '] :', classSV.listImage[ix].urlimg);
                if (ix) {
                    slide.className = "slide  hide-slide";
                    slide.setAttribute("style", 'padding: ' + classSV.padding + 'px;');

                    switch (classSV.listImage[ix].type) {
                        case 'image':
                            slide.innerHTML = '<img src="' + classSV.listImage[ix].urlimg + '" class="imgslide">';
                            break;
                        case 'video':
                            if (classSV.videocontrol) {
                                slide.innerHTML = '<video controls="controls"  muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                            } else {
                                slide.innerHTML = '<video muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                            }

                            break;
                        case 'youtube':
                            if (classSV.videocontrol) {
                                slide.style.height = '711px';
                            } else {
                                slide.style.height = '711px';
                            }

                            break;

                        default:
                            break;
                    }


                    SVSlider.append(slide);
                    if (classSV.listImage[ix].type === 'youtube') {
                        classSV.onYouTubeIframeAPIReady('yut' + classSV.countYTVideo, classSV.listImage[ix].urlimg);
                        console.log('currYTPlayer :', classSV.player);
                        classSV.player.playVideo();

                    }

                } else {
                    slide.className = "slide ";
                    slide.setAttribute("style", 'padding: ' + classSV.padding + 'px;');
                    switch (classSV.listImage[ix].type) {
                        case 'image':
                            slide.innerHTML = '<img src="' + classSV.listImage[ix].urlimg + '" class="imgslide">';
                            break;
                        case 'video':
                            if (classSV.videocontrol) {
                                slide.innerHTML = '<video controls="controls"  muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                            } else {
                                slide.innerHTML = '<video muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                            }

                            break;
                        case 'youtube':
                            if (classSV.videocontrol) {
                                slide.style.height = '711px';
                            } else {
                                slide.style.height = '711px';

                            }

                            break;

                        default:
                            break;
                    }


                    SVSlider.append(slide);


                    if (classSV.listImage[ix].type === 'youtube') {
                        classSV.onYouTubeIframeAPIReady('yut' + classSV.countYTVideo, classSV.listImage[ix].urlimg);
                        console.log('else ix currYTPlayer :', classSV.player);

                    }


                }


                if (classSV.pages) {
                    let pageElem = document.createElement('div');
                    if (ix === 0) {
                        pageElem.className = "pagebtn pagebtn-on";
                        pageElem.setAttribute("style", 'background-color: ' + classSV.colorPagesOn + ';');
                    } else {
                        pageElem.className = "pagebtn pagebtn-off";
                        pageElem.setAttribute("style", 'background-color: ' + classSV.colorPagesOff + ';');

                    }
                    //    if (classSV.DEBUG) console.log('INIT pageElem :', pageElem);
                    SVSPages.append(pageElem);
                }
            }
        }

        let navLeft = document.getElementById(classSV.prevbtn);
        let navRight = document.getElementById(classSV.nextbtn);

        if (classSV.navBtn) {
            if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
            if (classSV.DEBUG) console.log('classSV.durationCurrSlide = ', classSV.durationCurrSlide);



            navLeft.onclick = function() {

                if (classSV.DEBUG) console.log('PREV SLIDE', classSV);
                classSV.stopSlider();
                classSV.countG--;
                if (classSV.countG < 0) {
                    if (classSV.loop) {
                        classSV.countG = classSV.listImage.length - 1;
                    } else {
                        classSV.countG = 0;
                    }

                }
                if (classSV.autoplay) {
                    if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
                    classSV.playSlider(classSV.countG);
                } else {

                    if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
                    classSV.showSlideNum(classSV.countG);




                }
            };

            navRight.onclick = function() {

                if (classSV.DEBUG) console.log('NEXT SLIDE', classSV);
                classSV.stopSlider();


                classSV.countG++;
                if (classSV.countG > classSV.listImage.length - 1) {
                    if (classSV.loop) {
                        classSV.countG = 0;
                    } else {
                        classSV.countG = classSV.listImage.length - 1;
                    }
                }
                if (classSV.autoplay) {
                    classSV.playSlider(classSV.countG);
                } else {
                    if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
                    classSV.showSlideNum(classSV.countG);



                }
            };


        } else {
            navLeft.classList.add("hide-slide");
            navRight.classList.add("hide-slide");
        }

        if (classSV.autoplay) {
            classSV.playSlider(0);
        } else {

        }

        return true;

    }




    /*
     * **************** <<<<< YouTube Section >>>>>>> ********************
     */

    onYouTubeIframeAPIReady(idYTPlayer, vId) {


        const classSV = this;
        console.log('onYouTubeIframeAPIReady classSV :', classSV);
        classSV.player = new YT.Player(idYTPlayer, {
            height: '100%',
            width: '100%',
            videoId: vId,
            playerVars: {
                autoplay: 0,
                loop: 1,
                controls: 0,
                showinfo: 0,
                autohide: 1,
                modestbranding: 1,
                vq: 'hd1080'
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        if (classSV.DEBUG) console.log('onYouTubeIframeAPIReady = ', idYTPlayer, ' player = ', classSV.player);


        function onPlayerReady(event) {

            console.log('onPlayerReady event = ', event);
            //if (classSV.DEBUG) console.log('onPlayerReady event = ', event);
            //let durYT = event.target.getDuration();
            let durYT = 3;
            console.log('GET DURATION durYT :', durYT);
            classSV.durationCurrSlide = durYT;
            console.log('On Player Ready THIS :', classSV);
            console.log('On Player Ready START :', classSV.isPlayYT);

            event.target.mute();

            x.registerListener(function(val) {
                console.log("============================>> CHANGE x.a to " + val);
            });



            if (classSV.isPlayYT) {
                event.target.startPlay();
            }

        };

        function onPlayerStateChange(event) {
            console.log('onPlayerStateChange event = ', event);

        }

        function stopYTVideo() {
            player.stopVideo();
        }

        function playYTVideo() {
            player.playVideo();
        }

        return classSV.player;

    };




    showSlideNum(numSlide) {
        const classSV = this;
        if (classSV.DEBUG) console.log('SHOW SLIDE # ', numSlide);

        let currSlides = null;
        let SVSlider = null;
        let SVSPagesBtn = document.getElementById(classSV.idPages).children;
        SVSlider = document.getElementById(classSV.sliderId);
        if (classSV.DEBUG) console.log('showSlideNum SVSlider  :', SVSlider);
        if (classSV.DEBUG) console.log('showSlideNum type current slide :', classSV.listImage[numSlide].type);

        switch (classSV.listImage[numSlide].type) {
            case 'image':

                break;
            case 'video':
                /*                 SVSlider.getElementsByClassName('slide')[numSlide].querySelector('video').currentTime = 0;
                                SVSlider.getElementsByClassName('slide')[numSlide].querySelector('video').play(); */
                break;
            case 'youtube':
                SVSlider.isPlayYT = true;
                x.a = 1;
                break;

            default:
                break;
        }



        if (classSV.DEBUG) console.log('durationCurrSlide :', classSV.durationCurrSlide);

        currSlides = SVSlider.getElementsByClassName('slide')[numSlide];
        classSV.hideAllSlide();
        currSlides.classList.remove("hide-slide");
        currSlides.classList.add('animated', classSV.animate);
        if (classSV.pages) {
            SVSPagesBtn[numSlide].setAttribute("style", 'background-color: ' + classSV.colorPagesOn + ';');
        }

        /* setTimeout(() => {
            currSlides.classList.remove("fadeOut");
            currSlides.classList.add('animated', classSV.animate)
        }, 2000); */

    }


    hideAllSlide() {
        const classSV = this;
        let SVSlider = null;
        SVSlider = document.getElementById(classSV.sliderId);
        let allSlides = SVSlider.getElementsByClassName('slide');
        let SVSPagesBtn = document.getElementById(classSV.idPages).children;

        //    if (classSV.DEBUG) console.log('SVSPagesBtn = ', SVSPagesBtn);

        for (let index = 0; index < allSlides.length; index++) {
            const elSlide = allSlides[index];
            //if (classSV.DEBUG) console.log('slide = ', elSlide);
            elSlide.classList.add("hide-slide");
            elSlide.classList.remove("fadeOut");
            //elSlide.classList.add("fadeOut");
            if (classSV.pages) {
                SVSPagesBtn[index].setAttribute("style", 'background-color: ' + classSV.colorPagesOff + ';');
            }

        }


    }


    stopSlider() {
        const classSV = this;
        if (classSV.timerSlider !== null) {
            if (classSV.DEBUG) console.log('STOP PLAY Slider');
            clearTimeout(classSV.timerSlider);
        }
    }

    playSlider(count) {

        const classSV = this;
        if (classSV.DEBUG) console.log('START PLAY Slider');

        let currSlides = null;
        let SVSlider = null;



        SVSlider = document.getElementById(classSV.sliderId);



        if (classSV.DEBUG) console.log('SVSlider :', SVSlider);
        if (classSV.DEBUG) console.log('type current slide :', classSV.listImage[count].type);

        switch (classSV.listImage[count].type) {
            case 'image':
                classSV.durationCurrSlide = classSV.durationIMG;
                currSlides = SVSlider.getElementsByClassName('slide')[count];

                if (classSV.DEBUG) console.log('currSlides :', currSlides);
                if (classSV.DEBUG) console.log('timer  :', count);

                classSV.hideAllSlide();
                classSV.showSlideNum(count);

                classSV.timeoutNext(classSV.durationCurrSlide, count);


                break;
            case 'video':

                console.log("##################Video Source: ", SVSlider.getElementsByClassName('slide')[count].querySelector('video'));
                if (count === 0 && classSV.firstVideoSlide) {
                    SVSlider.getElementsByClassName('slide')[count].querySelector('video').addEventListener("loadedmetadata",
                        function() {
                            classSV.firstVideoSlide = false;
                            classSV.durationCurrSlide = SVSlider.getElementsByClassName('slide')[count].querySelector('video').duration * 1000;
                            SVSlider.getElementsByClassName('slide')[count].querySelector('video').play();

                            currSlides = SVSlider.getElementsByClassName('slide')[count];

                            if (classSV.DEBUG) console.log('currSlides :', currSlides);
                            if (classSV.DEBUG) console.log('timer  :', count);

                            classSV.hideAllSlide();
                            classSV.showSlideNum(count);

                            classSV.timeoutNext(classSV.durationCurrSlide, count);

                        }, true);
                } else {
                    classSV.durationCurrSlide = SVSlider.getElementsByClassName('slide')[count].querySelector('video').duration * 1000;
                    SVSlider.getElementsByClassName('slide')[count].querySelector('video').play();

                    currSlides = SVSlider.getElementsByClassName('slide')[count];

                    if (classSV.DEBUG) console.log('currSlides :', currSlides);
                    if (classSV.DEBUG) console.log('timer  :', count);

                    classSV.hideAllSlide();
                    classSV.showSlideNum(count);

                    classSV.timeoutNext(classSV.durationCurrSlide, count);

                }






                /*                 SVSlider.getElementsByClassName('slide')[count].querySelector('video').addEventListener('loadeddata', function() {
                                    console.log("Loaded the video's data!");
                                    console.log("Video Source: ", SVSlider.getElementsByClassName('slide')[count].querySelector('video'));
                                    console.log("Video Duration: ", SVSlider.getElementsByClassName('slide')[count].querySelector('video').duration);

                                    classSV.durationCurrSlide = SVSlider.getElementsByClassName('slide')[count].querySelector('video').duration * 1000;
                                    SVSlider.getElementsByClassName('slide')[count].querySelector('video').play();

                                    classSV.timerSlider = setTimeout(() => {

                                        if (classSV.DEBUG) console.log('VIDEO SLIDE TIMEOUT :', classSV.durationCurrSlide);

                                        if (count >= classSV.listImage.length - 1) {
                                            count = 0;
                                        } else {
                                            count++;
                                        }

                                        classSV.countG = count;
                                        classSV.playSlider(count);
                                    }, classSV.durationCurrSlide);

                                }, false); */

                break;
            case 'youtube':
                console.log('classSV.currYTPlayer :', classSV.player);

                //classSV.durationCurrSlide = classSV.player.getDuration() * 1000;

                break;

            default:
                break;
        }



        //    if (classSV.DEBUG) console.log('durationCurrSlide :', classSV.durationCurrSlide);



        if (classSV.durationCurrSlide !== null) {

        }

    }


    timeoutNext(dur, count) {
        const classSV = this;
        if (classSV.DEBUG) console.log('timer dur :', dur);
        classSV.timerSlider = setTimeout(() => {

            //                 if (classSV.DEBUG) console.log('prevSlides :', prevSlides);
            //                if (classSV.DEBUG) console.log('currSlides :', currSlides);

            if (count >= classSV.listImage.length - 1) {
                count = 0;
            } else {
                count++;
            }

            //            if (classSV.listImage[count].type === 'video') {
            //                 SVSlider.getElementsByClassName('slide')[count].querySelector('video').currentTime = 0;

            //}


            classSV.countG = count;
            classSV.playSlider(count);
        }, dur);

    }

    handleTouchStart(evt) {

        const classSV = this;
        //if (classSV.DEBUG) console.log('handleTouchStart classSV (this)', classSV.sliderId);
        classSV.xDown = evt.touches[0].clientX;
        classSV.yDown = evt.touches[0].clientY;
    };

    handleTouchMove(evt) {
        const classSV = this;
        //        if (classSV.DEBUG) console.log('handleTouchMove classSV (this)', classSV);

        if (!classSV.xDown || !classSV.yDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = classSV.xDown - xUp;
        let yDiff = classSV.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
            if (xDiff > 0) {
                console.log('LEFT SWIPE');


                //if (classSV.DEBUG) console.log('PREV SLIDE', classSV);
                classSV.stopSlider();
                classSV.countG--;
                if (classSV.countG < 0) {
                    if (classSV.loop) {
                        classSV.countG = classSV.listImage.length - 1;
                    } else {
                        classSV.countG = 0;
                    }

                }
                if (classSV.autoplay) {
                    if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
                    classSV.playSlider(classSV.countG);
                } else {

                    if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
                    classSV.showSlideNum(classSV.countG);




                }


                /* left swipe */
            } else {
                console.log('RIGHT SWIPE');

                //if (classSV.DEBUG) console.log('NEXT SLIDE', classSV);
                classSV.stopSlider();


                classSV.countG++;
                if (classSV.countG > classSV.listImage.length - 1) {
                    if (classSV.loop) {
                        classSV.countG = 0;
                    } else {
                        classSV.countG = classSV.listImage.length - 1;
                    }
                }
                if (classSV.autoplay) {
                    classSV.playSlider(classSV.countG);
                } else {
                    if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
                    classSV.showSlideNum(classSV.countG);



                }

                /* right swipe */
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        classSV.xDown = null;
        classSV.yDown = null;
    };






}