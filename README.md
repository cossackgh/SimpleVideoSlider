# Simple Video Slider

## Установка

Скачать /dist

**Добавить на страничку**

    <link rel="stylesheet" href="css/svs-style.css">
    <link rel="stylesheet" href="css/animate.css">
    <script src="js/slider-vi.js"></script> 
    
**В теле странички вставить блок где нужно вставить слайдер**

        <div class="slider-v" id="simpleSlider">
            <div class="navsvs prev-slide" id="prev-btn"></div>
            <div class="navsvs next-slide" id="next-btn"></div>
        </div>

**Добавить скрипт инициализации**


            let vs = new SimpleVideoSlider({
                listImage: [
                    {
                        'type': 'image',
                        'urlimg': 'images/img-2.jpg'
                    }, {
                        'type': 'image',
                        'urlimg': 'images/img-3.jpg'
                    }, {
                        'type': 'video',
                        'urlimg': 'images/video.mp4'
                    },
                ]
            });
            vs.initPlayaerVI();

## Параметры

**Для управления режимами проигрывания слайдера используют следующие параметры:**


                sliderId: 'simpleSlider', - ID блока, где размещается слайдер
                padding: '0', - Padding внутрь блока со слайдером
                bgcolor: "#000", - Цвет бакграунда
                animate: "fadeIn", - Эффект анимации
                prevbtn: "prev-btn", - ID кнопки влево
                nextbtn: "next-btn", - ID кнопки вправо
                loop: true, - Листание слайдера по кольцу или от края до края
                autoplay: false, - Автопроигрывание
                navBtn: true, - Вкл/Выкл кнопок навигации вправо-влево

