$(document).ready( async function() {


    $( "#locationModal" ).dialog({
        autoOpen: false,
        modal: true,
        show: {
          effect: "slide",
          direction: "down",
          duration: 1000
        },
        hide: {
          effect: "slide",
          direction: "down", 
          duration: 1000
        },
        open: function( event, ui ) {
            $('body').append('<div id="overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);"></div>');
            $('body').css({'overflow-y': 'hidden'});
            $( "#locationModal" ).css({'margin-top': '-1rem'});
        },
        close: function( event, ui ) {
            $('#overlay').remove();
            $('body').css({'overflow-y': 'scroll'});
            $( "#locationModal" ).css({'margin-top': '0'});
        },
        width: $(window).width(), // Устанавливаем ширину окна
        height: $(window).height(), // Устанавливаем высоту окна
        position: { my: "left top", at: "left top", of: "body" },
      });

    $('[closeModal]').on('click', function(){
        const $item = $(this);
        $item.closest('dialog').dialog('close');
    });

    $('#Phone').mask('+7 (000) 000-00-00');
    $('#DopPhone').mask('+7 (000) 000-00-00');

    $('button[data-btn="save"]').on('click', function(){
        const $item = $(this);
        $item.append(`<img class="w-6 h-6 object-contain filter invert sepia-0 saturate-0 hue-rotate-[94deg] brightness-[1.06] contrast-[20]" src="./local/templates/furnitureAssembly/img/other/loading2.gif" alt="иконка">`)
        setTimeout(() => {
            $item.find('img').remove();
        }, 500);
    })

    $('#SelectLocation').on('click', function(){
        const $item = $(this);
        const $modal = $('#locationModal');
        $modal.dialog('open');
    });

    if(window.Telegram.WebApp.initDataUnsafe !== null){
        
        window.Telegram.WebApp.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.location.href= "https://sergey-khomyakov.github.io/miniAppFurnitureAssembly/";
        });
    }

    if($("#Map").length){
        ymaps.ready(init);
        function init () {
            myMap = new ymaps.Map("Map", {
                center: [55.7505, 37.6192], // Углич
                zoom: 11,
                controls: ['zoomControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
            }, {
                balloonMaxWidth: 200,
                searchControlProvider: 'yandex#search'
            });
            let findAdres = new ymaps.control.Button({
                data: {
                    content: "Поиск по введенному адресу"
                },
                options: {
                    maxWidth: [200, 220, 250]
                }
            });
            console.log(findAdres)
            myMap.controls.add(findAdres, {float: 'right'});
            function addCircles(coord, dist, colors, hint){
                var myCircle = new ymaps.Circle([
                    coord,
                    dist
                ], {
                    hintContent: hint
                }, {
                    interactivityModel: "default#transparent",
                    // Цвет заливки.
                    fillColor: colors[1],
                    fillOpacity: 0.1,
                    // Цвет обводки.
                    strokeColor: colors[0],
                    strokeOpacity: 0.8,
                    strokeWidth: 2
                });

                // Добавляем круг на карту.
                myMap.geoObjects.add(myCircle);
            }
            findAdres.events.add('click', function (e) {
                ymaps.geocode($('[data-input="ADRES"]').val(), {
                    results: 1
                }).then(function (res) {

                    var firstGeoObject = res.geoObjects.get(0)
                    var   coords = firstGeoObject.geometry.getCoordinates()

                    if (!firstGeoObject){

                        console.log("fail")
                    } else {


                        myMap.setCenter([coords[0], coords[1]], 11, {
                            checkZoomRange: true
                        });

                        let mark = new ymaps.Placemark([coords[0], coords[1]], {
                            balloonContent: 'Адрес: ' + $('[data-input="ADRES"]').val()
                        }, {
                            preset: 'islands#icon',
                            iconColor: '#0095b6'
                        })
                        myMap.geoObjects.removeAll()
                        myMap.geoObjects.add(mark)
                        $('[data-input="KAORDS"]').val(coords[0] + ", " + coords[1])
                    }

                });
            });




            // Обработка события, возникающего при щелчке
            // левой кнопкой мыши в любой точке карты.
            // При возникновении такого события откроем балун.

            myMap.events.add('click', function (e) {
                myMap.geoObjects.removeAll();
                myMap.balloon.close();
                var coords = e.get('coords');
                myMap.balloon.open(coords, {
                    contentHeader:'Координаты',
                    contentBody:'<p>'+[
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>'
                });
                $('[data-input="KAORDS"]').val(coords[0].toPrecision(6) + ", " + coords[1].toPrecision(6))

                addCircles([coords[0].toPrecision(6), coords[1].toPrecision(6)], 16000, ["#FF616187", "#ff6161"], "16 км")
                addCircles([coords[0].toPrecision(6), coords[1].toPrecision(6)], 12000, ["#FFDA0087", "#ffda00"], "12 км")
                addCircles([coords[0].toPrecision(6), coords[1].toPrecision(6)], 7000, ["#1CFF0087", "#1CFF00FF"], "7 км")

            });



            $('[data-btn="selectLocationModal"]').on('click', function(e){
                e.preventDefault();

                const coordinates = $('[data-input="KAORDS"]').val();
                const location = coordinates.split(', ');
                const latitude = location[0];
                const longitude = location[1];

                const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ru`;

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const $inputLocation = $('#SelectLocation');
                        const $inputLocationParent = $inputLocation.closest('div[locationBox]');
                        $inputLocation.val(data.address.city + ", ул. " + data.address.road +", " + (data.address.house_number ? data.address.house_number : ""));
                        $('#locationModal').dialog('close');

                        $inputLocationParent.find('label').removeClass('top-[0.675rem] text-base');
                        $inputLocationParent.find('label').addClass('-top-[0.675rem] text-sm');
                        //$('p[location]').text('Address:' + data.display_name);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });


            // Обработка события, возникающего при щелчке
            // правой кнопки мыши в любой точке карты.
            // При возникновении такого события покажем всплывающую подсказку
            // в точке щелчка.
            // myMap.events.add('contextmenu', function (e) {
            //     myMap.hint.show(e.get('coordPosition'), 'Кто-то щелкнул правой кнопкой');
            // });data-btn="checkMap"
        }
    }

});