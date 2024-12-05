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
            <div class="w-full h-max relative z-10">
                <button class="flex gap-2 font-montserrat font-semibold text-sm justify-center px-4 py-2 rounded-md border-[#FFFFFF] items-center text-[#fff] bg-primary w-full" data-btn="save" type="button">Принять заказ</button>
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
        $dialog.find('[titleCard]').text("№ " + order.name);

        const imagesMarkup = order.details.photo.map((item) => {
            return `<img src="${item.src}" alt="${item.name}" class="w-full h-auto object-cover rounded-sm overflow-hidden"/>`;
        }).join('');

        const filesMarkup = order.details.files.map((item) => {
            return `<div docItem="" class="w-full flex gap-2">
                        <div class="w-12 h-12 shrink-0">
                            <img class="w-full h-full object-contain" src="./local/templates/furnitureAssembly/img/icons/DocIcons.svg" alt="Иконка">
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <p docText="" class="font-montserrat font-semibold text-base text-primary">${item.name}</p>
                            <div class="flex gap-2 justify-between">
                                <div class="flex gap-2">
                                    <p class="font-montserrat font-semibold text-base text-gray-500">19.11.2024 11:29:25</p>
                                </div>
                                <button class="flex gap-2 w-max font-montserrat font-semibold text-base text-primary hover:text-[#7a5bca]" data-file="${item.src}">Скачать</button>
                            </div>
                        </div>
                    </div>`;
        }).join('');

        const servicesMarkup = () => {
            let html = "";
            let totalPrice = 0;

            order.details.services.forEach((item) => {
                html += `<div class="w-full grid grid-cols-3 gap-2 items-center shadow-md rounded-md py-1 px-3">
                        <p class="font-montserrat font-semibold text-sm text-black">${item.name}</p>
                        <div class="flex items-center gap-2 justify-end">
                            <p class="font-montserrat font-semibold text-sm text-black">${item.count}</p>
                            <p class="font-montserrat font-semibold text-sm text-black">${item.unitMeasurement}</p>
                        </div>
                        <p class="font-montserrat font-semibold text-sm text-black text-end">${item.prise} руб</p>
                    </div>`;

                    totalPrice += Number(item.prise) 
            });

            html += `<div class="w-full grid grid-cols-auto-1fr gap-2 items-center shadow-md rounded-md py-1 px-3 bg-green-200">
                        <p class="font-montserrat font-semibold text-sm text-black">Итого З/п (При 100% участии)</p>
                        <p class="font-montserrat font-semibold text-sm text-black text-end">${totalPrice} руб</p>
                    </div>`;

            return html;
        };

        const $body = $(`
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <p class="flex items-center gap-2 font-montserrat font-semibold text-black text-xl"> 
                        <img class="w-6 h-6 object-contain filter-black" src="./local/templates/furnitureAssembly/img/icons/User.svg" alt="иконка">
                        Клиент
                    </p>
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
                <div class="grid grid-cols-1fr-auto items-center gap-2">
                    <input type="checkbox" id="details" name="details" class="hidden peer" />
                    <label for="details", class="flex items-center gap-1 font-montserrat font-semibold text-black text-xl cursor-pointer">
                        <img class="w-6 h-6 object-contain filter-black" src="./local/templates/furnitureAssembly/img/icons/ClipboardText.svg" alt="иконка">
                        Подробности
                    </label>
                    <img src="./local/templates/furnitureAssembly/img/icons/CaretDown.svg" alt="иконка" class="w-6 h-6 object-contain filter-black transition-all peer-checked:rotate-180 ml-auto" />
                    <div class="flex flex-col gap-2 w-full col-span-2 max-h-0 peer-checked:max-h-[40rem] overflow-hidden transition-all ease-in-out delay-150">
                        ${order.details.typeOrder !== null ? 
                            `<div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">Тип заказа: </p>
                                <p class="font-montserrat font-semibold text-black">${order.details.typeOrder}</p>
                            </div>` : ""}
                        ${order.details.workInterval !== null ? 
                            `<div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">Интервал работ: </p>
                                <p class="font-montserrat font-semibold text-black">${order.details.workInterval}</p>
                            </div>` : ""}
                        ${order.details.dopInfo !== null ? 
                            `<div class="flex gap-x-1 items-center flex-wrap">
                                <p class="font-montserrat font-semibold text-black">Дополнительная информация: </p>
                                <p class="font-montserrat font-semibold text-black">${order.details.dopInfo}</p>
                            </div>` : ""}
                        ${order.details.photo.length > 0 ? 
                            `<div class="flex flex-col gap-1">
                                <p class="font-montserrat font-semibold text-black">Фото: </p>
                                <div class="grid grid-cols-2 gap-2">
                                    ${imagesMarkup}
                                </div>
                            </div>` : ""}
                        ${order.details.files.length > 0 ? 
                            `<div class="flex flex-col gap-1">
                                <p class="font-montserrat font-semibold text-black">Файлы: </p>
                                <div class="flex flex-col gap-2">
                                    ${filesMarkup}
                                </div>
                            </div>` : ""}
                        ${order.details.services.length > 0 ? 
                            `<div class="flex flex-col gap-1">
                                <p class="font-montserrat font-semibold text-black">Услуги: </p>
                                <div class="flex flex-col gap-2 px-1 py-2">
                                    ${servicesMarkup()}
                                </div>
                            </div>` : ""}
                    </div>
                </div>
            </div>`)

        $body.append($controlsHtml);

        $dialogBody.append($body);

        $('button[data-file]').on('click', function(){
            const $item = $(this);
            const $parent = $item.closest('[docItem]')
            const fileSrc = $item.data('file');
            const fileName = $parent.find('[docText]').text();

            window.Telegram.WebApp.downloadFile({
                url: fileSrc,
                file_name: fileName
            }, (item) => {
                console.log(item)
            })
        });

        // КАРТА ЯНДЕКС
        ymaps.ready(init(order));
        function init (order) {
            myMap = new ymaps.Map("map", {
                center: [order.client.coordinates.latitude, order.client.coordinates.longitude], // Углич
                zoom: 11,
                controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
            }, {
                balloonMaxWidth: 200,
                searchControlProvider: 'yandex#search'
            });

            myMap.setCenter([order.client.coordinates.latitude, order.client.coordinates.longitude], 11, {
                checkZoomRange: true
            });
            myMap.geoObjects.add(new ymaps.Placemark([order.client.coordinates.latitude, order.client.coordinates.longitude], {}, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }))

        }

        $('#Order').dialog('open');
    }

    // --- Orders end ---


});
