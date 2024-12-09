$(document).ready( async function() {

    if(window.Telegram.WebApp.initDataUnsafe !== null){
        
        window.Telegram.WebApp.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.location.href= "https://sergey-khomyakov.github.io/miniAppFurnitureAssembly/";
        });
    }

    const Calendar = new AirDatepicker('#calendar', {
        inline: true,
    });

    $( "#Help" ).dialog({
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
            $('body').append('<div id="overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.5);"></div>');
            $('body').css({'overflow-y': 'hidden', "height": "100vh"});

            $( "#Order" ).css({'margin-top': '-0.5rem'});
        },
        close: function( event, ui ) {
            $('#overlay').remove();
            $('body').css({'overflow-y': 'auto', "height": "unset"});
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

    $('[help]').on('click', function(){
        $('#Help').dialog('open');
    });


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
            $('body').append('<div id="overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.5);"></div>');
            $('body').css({'overflow-y': 'hidden', "height": "100vh"});

            // КАРТА ЯНДЕКС fix scroll top
            setTimeout(() => {ymaps.ready(() => initMap())}, 1500)

            $( "#Order" ).css({'margin-top': '-0.5rem'});
        },
        close: function( event, ui ) {
            $('#overlay').remove();
            $('body').css({'overflow-y': 'auto', "height": "unset"});
            $( "#Order" ).css({'margin-top': '0'});
        },
        width: $(window).width(), // Устанавливаем ширину окна
        height: $(window).height(), // Устанавливаем высоту окна
        position: { my: "left top", at: "left top", of: "body" },
      });


    });

    // --- Orders start ---
    function CallModal(order){
        const $dialog = $('#Order');
        const $dialogBody = $dialog.find('[dialogBody]');
        $dialogBody.empty();

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

        const historyMarkup = order.history.map((item) => {
            return `<div class="w-full grid grid-cols-3 gap-2 items-center shadow-md rounded-md py-1 px-3">
                        <p class="font-montserrat font-semibold text-sm text-black">${item.event}</p>
                        <p class="font-montserrat font-semibold text-sm text-black">${item.date.split('-').reverse().join('.')}</p>
                        <p class="font-montserrat font-semibold text-sm text-black text-end">${item.author}</p>
                    </div>`;
        }).join('');

        const $body = $(`
            <div cardBody="" class="flex flex-col gap-4">
                ${getStatusHtml(order.status)}
                <div class="flex gap-2 items-center">
                    <p class="font-montserrat font-semibold text-base text-black">Дата заказа: </p>
                    <p class="font-montserrat font-semibold text-sm text-gray-400">${order.date.split('-').reverse().join('.')}</p>
                </div>
                <div navCard="" class="flex flex-wrap gap-y-1 gap-x-2 items-center">
                    <div data-active="true" navContent="Client" class="flex gap-2 border border-solid border-gray-100 rounded-full py-2 px-3 cursor-pointer bg-primary">
                        <p class="font-montserrat font-semibold text-xs text-white text-nowrap">Клиент</p>
                    </div>
                    <div data-active="false" navContent="Details" class="flex gap-2 border border-solid border-gray-100 rounded-full py-2 px-3 cursor-pointer bg-black">
                        <p class="font-montserrat font-semibold text-xs text-white text-nowrap">Подробности</p>
                    </div>
                    <div data-active="false" navContent="Services" class="flex gap-2 border border-solid border-gray-100 rounded-full py-2 px-3 cursor-pointer bg-black">
                        <p class="font-montserrat font-semibold text-xs text-white text-nowrap">Услуги</p>
                    </div>
                    <div data-active="false" navContent="History" class="flex gap-2 border border-solid border-gray-100 rounded-full py-2 px-3 cursor-pointer bg-black">
                        <p class="font-montserrat font-semibold text-xs text-white text-nowrap">История</p>
                    </div>
                    <div data-active="false" navContent="Actions" class="flex gap-2 border border-solid border-gray-100 rounded-full py-2 px-3 cursor-pointer bg-black">
                        <p class="font-montserrat font-semibold text-xs text-white text-nowrap">Действия</p>
                    </div>
                </div>
                <div cardContent="Client" class="flex flex-col gap-2">
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
                            <div id="map" data-x="${order.client.coordinates.latitude}" data-y="${order.client.coordinates.longitude}" class="w-full h-full"></div>
                        </div>
                </div>
                <div cardContent="Details" class="hidden flex-col gap-2">
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
                </div>
                <div cardContent="Services" class="hidden flex-col gap-2">
                    ${order.details.services.length > 0 ? 
                        `<div class="flex flex-col gap-1">
                            <div class="flex flex-col gap-2 px-1 py-2">
                                ${servicesMarkup()}
                            </div>
                        </div>` : ""}
                </div>
                <div cardContent="History" class="hidden flex-col gap-2">
                    ${historyMarkup}
                </div>
            </div>`);

        $dialogBody.append($body);

        $('[navContent]').on('click', function(){
            const $item = $(this);
            const isActive = $item.data('active');
            
            if(Boolean(isActive)){
                return;
            }
            const $parent = $item.closest('[cardBody]');
            const $oldActiveNav = $parent.find('[data-active="true"]');
            const oldNavContentName = $oldActiveNav.attr('navContent');
        
            const $oldActiveContent = $parent.find('[cardContent="'+ oldNavContentName +'"]');
        
            // Remove old Content
            $oldActiveNav.attr('data-active', 'false').removeClass('bg-primary').addClass('bg-black');
            $oldActiveContent.removeClass('flex').addClass('hidden');
        
            // Activate new Content
            const newNavContentName = $item.attr('navContent');
            const $newActiveContent = $parent.find('[cardContent="'+ newNavContentName +'"]');
            $item.attr('data-active', 'true').removeClass('bg-black').addClass('bg-primary');
            $newActiveContent.addClass('flex').removeClass('hidden');
        });

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

        setTimeout(function(){
            $('#Order').dialog('open');
        },10)
    }

    function getStatusHtml(statusName){

        if(statusName === "New"){
            return `<div class="flex gap-2 items-center">
                    <p class="font-montserrat font-semibold text-base text-black">Статус заказа: </p>
                    <p class="font-montserrat font-semibold text-sm text-green-500">Новый</p>
                </div>`;
        }

        if(statusName === "StartedWork"){
            return `<div class="flex gap-2 items-center">
                    <p class="font-montserrat font-semibold text-base text-black">Статус заказа: </p>
                    <p class="font-montserrat font-semibold text-sm text-amber-500">В работе</p>
                </div>`;
        }

        if(statusName === "Extended"){
            return `<div class="flex gap-2 items-center">
                    <p class="font-montserrat font-semibold text-base text-black">Статус заказа: </p>
                    <p class="font-montserrat font-semibold text-sm text-green-700">Продлен</p>
                </div>`;
        }

        if(statusName === "Complaint"){
            return `<div class="flex gap-2 items-center">
                    <p class="font-montserrat font-semibold text-base text-black">Статус заказа: </p>
                    <p class="font-montserrat font-semibold text-sm text-gray-500">Рекламация</p>
                </div>`;
        }

        if(statusName === "Interrupted"){
            return `<div class="flex gap-2 items-center">
                    <p class="font-montserrat font-semibold text-base text-black">Статус заказа: </p>
                    <p class="font-montserrat font-semibold text-sm text-red-600">Прерван</p>
                </div>`;
        }

        return '';
    }
    // --- Orders end ---