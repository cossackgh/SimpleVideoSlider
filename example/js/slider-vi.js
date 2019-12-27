'use strict';


let DEBUG;


class SimpleVideoSlider {



    constructor(options) {
        let classSV = this;
        const version = "0.1";
        const globalVAR = null;
        this.timerSlider = null;
        this.durationCurrSlide = 0;
        this.countG = 0;
        this.xDown = null;
        this.yDown = null;

        const defaults = {
            DEBUG: false,
            sliderId: 'simpleSlider',
            listImage: [],
            durationIMG: 4000,
            loop: true,
            navBtn: true,
            padding: "0",
            autoplay: true,
            videoautoplay: false,
            videocontrol: false,
            bgcolor: "#000",
            prevbtn: "prev-btn",
            nextbtn: "next-btn",
            animate: "fadeIn",




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



        let SVSlider = document.getElementById(classSV.sliderId);
        SVSlider.setAttribute("style", 'background-color: ' + classSV.bgcolor + ';');

        SVSlider.addEventListener('touchstart', classSV.handleTouchStart.bind(this), false);
        SVSlider.addEventListener('touchmove', classSV.handleTouchMove.bind(this), false);

        if (classSV.DEBUG) console.log('INIT SVSlider :', SVSlider);
        if (classSV.DEBUG) console.log('INIT classSV :', classSV);
        if (classSV.DEBUG) console.log('classSV.countG = ', classSV.countG);
        if (classSV.DEBUG) console.log('listImage :', classSV.listImage);


        if (classSV.listImage.length) {
            for (let ix = 0; ix < classSV.listImage.length; ix++) {
                let slide = document.createElement('div');
                const element = classSV.listImage[ix];
                if (classSV.DEBUG) console.log('listImage URL [' + ix + '] :', classSV.listImage[ix].urlimg);
                if (ix) {
                    slide.className = "slide  hide-slide";
                    slide.setAttribute("style", 'padding: ' + classSV.padding + 'px;');

                    if (classSV.listImage[ix].type === 'image') {
                        slide.innerHTML = '<img src="' + classSV.listImage[ix].urlimg + '" class="imgslide">';
                    } else {
                        if (classSV.videocontrol) {
                            slide.innerHTML = '<video controls="controls"  muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                        } else {
                            slide.innerHTML = '<video muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                        }

                    }
                    SVSlider.append(slide);
                } else {
                    slide.className = "slide ";
                    slide.setAttribute("style", 'padding: ' + classSV.padding + 'px;');

                    if (classSV.listImage[ix].type === 'image') {
                        slide.innerHTML = '<img src="' + classSV.listImage[ix].urlimg + '" class="imgslide">';
                    } else {
                        if (classSV.videocontrol) {
                            slide.innerHTML = '<video controls="controls"  muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                        } else {
                            slide.innerHTML = '<video muted> <source src="' + classSV.listImage[ix].urlimg + '"  type="video/mp4"> </video>';
                        }
                    }
                    SVSlider.append(slide);
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


    showSlideNum(numSlide) {
        const classSV = this;
        if (classSV.DEBUG) console.log('SHOW SLIDE # ', numSlide);

        let currSlides = null;
        let SVSlider = null;

        SVSlider = document.getElementById(classSV.sliderId);
        if (classSV.DEBUG) console.log('SVSlider :', SVSlider);
        if (classSV.DEBUG) console.log('type current slide :', classSV.listImage[numSlide].type);

        if (classSV.listImage[numSlide].type === 'image') {

            /*             let allVideo = SVSlider.querySelector('video');
                        console.log('allVideo :', allVideo);
                        for (let l = 0; l < allVideo.length; l++) {
                            const elvid = allVideo[l];
                            elvid.pause();


                        } */


        } else {
            SVSlider.getElementsByClassName('slide')[numSlide].querySelector('video').currentTime = 0;
            SVSlider.getElementsByClassName('slide')[numSlide].querySelector('video').play();

        }

        if (classSV.DEBUG) console.log('durationCurrSlide :', classSV.durationCurrSlide);

        currSlides = SVSlider.getElementsByClassName('slide')[numSlide];
        classSV.hideAllSlide();
        currSlides.classList.remove("hide-slide");
        currSlides.classList.add('animated', classSV.animate);


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

        for (let index = 0; index < allSlides.length; index++) {
            const elSlide = allSlides[index];
            if (classSV.DEBUG) console.log('slide = ', elSlide);
            elSlide.classList.add("hide-slide");
            elSlide.classList.remove("fadeOut");
            //elSlide.classList.add("fadeOut");

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

        if (classSV.listImage[count].type === 'image') {

            classSV.durationCurrSlide = classSV.durationIMG;

        } else {
            classSV.durationCurrSlide = SVSlider.getElementsByClassName('slide')[count].querySelector('video').duration * 1000;
            SVSlider.getElementsByClassName('slide')[count].querySelector('video').play();

        }

        if (classSV.DEBUG) console.log('durationCurrSlide :', classSV.durationCurrSlide);

        currSlides = SVSlider.getElementsByClassName('slide')[count];

        if (classSV.DEBUG) console.log('currSlides :', currSlides);
        if (classSV.DEBUG) console.log('timer  :', count);

        classSV.hideAllSlide();
        classSV.showSlideNum(count);

        classSV.timerSlider = setTimeout(() => {

            //if (classSV.DEBUG) console.log('prevSlides :', prevSlides);
            //if (classSV.DEBUG) console.log('currSlides :', currSlides);

            if (count >= classSV.listImage.length - 1) {
                count = 0;
            } else {
                count++;
            }

            /*             if (classSV.listImage[count].type === 'video') {
                            SVSlider.getElementsByClassName('slide')[count].querySelector('video').currentTime = 0;

                        } */
            classSV.countG = count;
            classSV.playSlider(count);
        }, classSV.durationCurrSlide);

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