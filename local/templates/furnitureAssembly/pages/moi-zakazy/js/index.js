$(document).ready( async function() {


    if(window.Telegram.WebApp.initDataUnsafe !== null){
        window.Telegram.WebApp.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.location.href= "https://sergey-khomyakov.github.io/miniAppFurnitureAssembly/";
        });
    }

    // --- Search start ---

    $('[claerSearch]').on('click', function(){
        $('#Search').val('');
    });

    $('#Search').on('input', function() {
        const userId = 1; // TODO id учетки
        const val = $(this).val();
        if(val.length < 3) return;
        
        const $parent = $(this).closest('[SearchBox]');
        const $list = $parent.find('[list]');
        $list.empty();

        const orders = Orders.filter((item) => item.name.toLowerCase().includes(val.toLowerCase()) && item.user.id === userId);

        orders.forEach((order) => {
            const $itemSearch = $(`
                <div class="px-3 cursor-pointer py-2 group" orderCardId="${order.id}">
                    <p class="font-montserrat font-semibold text-base group-hover:text-primary">${order.name}</p>
                </div>`);

                $itemSearch.on('click', function(){
                    const $item = $(this);
                    const id = $item.attr('orderCardId');
                    const order = Orders.find((item) => item.id === Number(id));
                    CallModal(order);
                    $('#Search').val('');
                });
            $list.append($itemSearch)
        });
    });

    // --- Search end ---

    // --- Init dialog start ---

    $( "#Order" ).dialog({
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
            $( "#Order" ).css({'margin-top': '-1rem'});
        },
        close: function( event, ui ) {
            $('#overlay').remove();
            $('body').css({'overflow-y': 'scroll'});
            $( "#Order" ).css({'margin-top': '0'});
        },
        width: $(window).width(), // Устанавливаем ширину окна
        height: $(window).height(), // Устанавливаем высоту окна
        position: { my: "left top", at: "left top", of: "body" },
      });


    $('[closeModal]').on('click', function(){
        const $item = $(this);
        $item.closest('dialog').dialog('close');
    });

    // --- Init dialog end ---

    // --- Orders start ---
    setTimeout(() => {
        renderOrdersByStatus("New", 1)
    }, 400);

    $('[orderNav]').on('click', '[data-active]', function(){
        const $item = $(this);
        const active = $item.attr('data-active');
        if(active === 'true') return;

        const $parent = $item.closest('[orderNav]');
        const $loading = $('[loadingCards]');
        const status = $item.attr('orderStatus');

        if(status !== undefined && status !== ""){
            if($loading.hasClass('hidden')){
                $loading.removeClass('hidden').addClass('flex');
            }else{
                $loading.removeClass('flex').addClass('hidden');
            }
    
            $parent.find('[data-active="true"]').attr('data-active', 'false').addClass('bg-black').removeClass('bg-primary');
            $item.attr('data-active', 'false').removeClass('bg-black').addClass('bg-primary').attr('data-active', 'true');
            $('[orderBody]').empty();
            // ajax request to server
            setTimeout(() => {
                renderOrdersByStatus(status, 1);
            }, 500);
        }

    });

    function renderOrdersByStatus(status, userId){
        const orderItems = Orders.filter((item) => item.status === status && item.user.id === userId);

        const $loading = $('[loadingCards]');
        $loading.removeClass('flex').addClass('hidden');

        if(orderItems.length > 0){
            const $orderContainer = $('[orderBody]');

            orderItems.forEach((item) => {
                const $order = $(`
                    <div orderCardId="${item.id}" class="bg-white p-4 ring-1 ring-gray-900/5 rounded-lg shadow-lg w-full min-h-28 cursor-pointer hover:bg-gray-100">
                        <div class="flex flex-col gap-2 py-1">
                            <p class="font-montserrat font-semibold text-base text-black">${item.name}</p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="flex flex-col">
                                    <p class="font-montserrat font-semibold text-sm text-black col-span-1">Клиент:</p>
                                    <p class="font-montserrat font-semibold text-sm text-black col-span-1">${item.client.name}</p>
                                </div>
                                <div class="flex flex-col">
                                    <p class="font-montserrat font-semibold text-sm text-black col-span-1">Номер клиента:</p>
                                    <p class="font-montserrat font-semibold text-sm text-black col-span-1">${item.client.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>`);
                $order.on('click', function(){
                    const $item = $(this);
                    const id = $item.attr('orderCardId');
                    const order = Orders.find((item) => item.id === Number(id));

                    if(order === undefined){
                        return;
                    }

                    CallModal(order);
                });
                $orderContainer.append($order);
            });
        }
    }

    function CallModal(order){
        const $dialog = $('#Order');
        const $dialogBody = $dialog.find('[dialogBody]');
        $dialogBody.empty();
        let $controlsHtml = "";

        if(order.status === "New"){
            $controlsHtml = $(`
            <div class="w-full">
                <button class="flex gap-2 font-montserrat font-semibold xs:text-sm xs:justify-center lg:justify-start lg:text-base px-4 py-2 rounded-md border-[#FFFFFF] items-center text-[#fff] bg-primary w-full justify-center" data-btn="save" type="button">Принять заказ</button>
            </div>`);
            $controlsHtml.find('button').on('click', function(){
                order.status = "StartedWork";
                const oldCountNew = Number($('[orderstatus="New"] > p:eq(1)').text() !== undefined ? $('[orderstatus="New"] > p:eq(1)').text() : "0");
                const oldCountStartedWork = Number($('[orderstatus="StartedWork"] > p:eq(1)').text() !== undefined ? $('[orderstatus="StartedWork"] > p:eq(1)').text() : "0");

                if(oldCountNew > 0){
                    $('[orderstatus="New"] > p:eq(1)').text(oldCountNew - 1);
                }
                $('[orderstatus="StartedWork"] > p:eq(1)').text(oldCountStartedWork + 1);
                
                $('[ordercardid="'+ order.id +'"]').remove();
                $('#Order').dialog('close');
            });
        }else if(order.status === "StartedWork"){

        }

        const $body = $(`
            <div class="flex flex-col gap-4">
                <p class="font-montserrat font-semibold text-2xl text-black">№ ${order.name}</p>
                <div class="flex flex-col gap-2">
                        <p class="flex items-center gap-2 font-montserrat font-semibold text-black text-xl"> <img class="w-6 h-6 object-contain" src="./local/templates/furnitureAssembly/img/icons/User.svg" alt="иконка">Клиент</p>
                        <div class="flex flex-col gap-1">
                            <div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">ФИО: </p>
                                <p class="font-montserrat font-semibold text-black">${order.client.name}</p>
                            </div>
                            <div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">Номер: </p>
                                <p class="font-montserrat font-semibold text-black">${order.client.phone}</</p>
                            </div>
                            <div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">Дополнительный номер: </p>
                                <p class="font-montserrat font-semibold text-black">+7 999 222-22-99</p>
                            </div>
                            <div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">Адрес: </p>
                                <p class="font-montserrat font-semibold text-black">${order.client.adress}</p>
                            </div>
                        </div>
                        <div class="rounded-lg w-full h-60 aspect-1-1 overflow-hidden">
                            <div id="map" class="w-full h-full"></div>
                        </div>
                    </div>
            </div>`)

        $body.append($controlsHtml);

        $dialogBody.append($body);

        // КАРТА ЯНДЕКС==================================================================================
        ymaps.ready(init(order));
        function init (order) {
            myMap = new ymaps.Map("map", {
                center: [$("#map").data(order.client.coordinates.latitude), $("#map").data(order.client.coordinates.longitude)], // Углич
                zoom: 11,
                controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
            }, {
                balloonMaxWidth: 200,
                searchControlProvider: 'yandex#search'
            });

            myMap.setCenter([$("#map").data(order.client.coordinates.latitude), $("#map").data(order.client.coordinates.longitude)], 11, {
                checkZoomRange: true
            });
            myMap.geoObjects.add(new ymaps.Placemark([$("#map").data(order.client.coordinates.latitude), $("#map").data(order.client.coordinates.longitude)], {}, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }))

        }

        $('#Order').dialog('open');
    }

    // --- Orders end ---


});
