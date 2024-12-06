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
            $('body').append('<div id="overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.5);"></div>');
            $('body').animate({
                scrollTop: 0
            }, 0);
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
                            <div class="grid grid-cols-2 gap-4">
                                <p class="font-montserrat font-semibold text-base text-black">${item.name}</p>
                                <p class="font-montserrat font-semibold text-sm text-black">Дата заказа: ${item.date.split('-').reverse().join('.')}</p>
                            </div>
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
            $controlsHtml = $(`
                <div class="w-full flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <div class="grid grid-cols-1fr-auto items-center gap-2">
                            <input type="checkbox" id="photoBefore" name="photoBefore" class="hidden peer" />
                            <label for="photoBefore", class="flex items-center gap-1 font-montserrat font-semibold text-black text-sm cursor-pointer">
                                Фото ДО начала работ
                            </label>
                            <img src="./local/templates/furnitureAssembly/img/icons/CaretDown.svg" alt="иконка" class="w-5 h-5 object-contain filter-black transition-all peer-checked:rotate-180 ml-auto" />
                            <div class="flex flex-col gap-2 w-full col-span-2 max-h-0 peer-checked:max-h-[40rem] overflow-hidden transition-all ease-in-out delay-150">
                                <label class="flex flex-col items-center justify-center py-4 w-full h-16 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" data-dropzone="fileBefore" for="fileBefore">
                                    <span class="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                            <path d="M26.7075 10.2925L19.7075 3.2925C19.6146 3.19967 19.5042 3.12605 19.3829 3.07586C19.2615 3.02568 19.1314 2.9999 19 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V11C27.0001 10.8686 26.9743 10.7385 26.9241 10.6172C26.8739 10.4958 26.8003 10.3854 26.7075 10.2925ZM20 6.41375L23.5863 10H20V6.41375ZM25 27H7V5H18V11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12H25V27ZM19.7075 17.2925C19.8004 17.3854 19.8741 17.4957 19.9244 17.6171C19.9747 17.7385 20.0006 17.8686 20.0006 18C20.0006 18.1314 19.9747 18.2615 19.9244 18.3829C19.8741 18.5043 19.8004 18.6146 19.7075 18.7075C19.6146 18.8004 19.5043 18.8741 19.3829 18.9244C19.2615 18.9747 19.1314 19.0006 19 19.0006C18.8686 19.0006 18.7385 18.9747 18.6171 18.9244C18.4957 18.8741 18.3854 18.8004 18.2925 18.7075L17 17.4137V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17.4137L13.7075 18.7075C13.6146 18.8004 13.5043 18.8741 13.3829 18.9244C13.2615 18.9747 13.1314 19.0006 13 19.0006C12.8686 19.0006 12.7385 18.9747 12.6171 18.9244C12.4957 18.8741 12.3854 18.8004 12.2925 18.7075C12.1996 18.6146 12.1259 18.5043 12.0756 18.3829C12.0253 18.2615 11.9994 18.1314 11.9994 18C11.9994 17.8686 12.0253 17.7385 12.0756 17.6171C12.1259 17.4957 12.1996 17.3854 12.2925 17.2925L15.2925 14.2925C15.3854 14.1995 15.4957 14.1258 15.6171 14.0754C15.7385 14.0251 15.8686 13.9992 16 13.9992C16.1314 13.9992 16.2615 14.0251 16.3829 14.0754C16.5043 14.1258 16.6146 14.1995 16.7075 14.2925L19.7075 17.2925Z" fill="#404040"></path>
                                        </svg>
                                        <p class="font-montserrat font-semibold text-sm text-black">Загрузить файл</p>
                                    </span>
                                    <input class="hidden" type="file" id="fileBefore" accept="image/*" multiple>
                                </label>
                                <div fileBeforeBlock="" class="grid grid-cols-2 gap-2">
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1fr-auto items-center gap-2">
                            <input type="checkbox" id="photoAfter" name="photoAfter" class="hidden peer" />
                            <label for="photoAfter", class="flex items-center gap-1 font-montserrat font-semibold text-black text-sm cursor-pointer">
                                Фото ПОСЛЕ завершения работ
                            </label>
                            <img src="./local/templates/furnitureAssembly/img/icons/CaretDown.svg" alt="иконка" class="w-5 h-5 object-contain filter-black transition-all peer-checked:rotate-180 ml-auto" />
                            <div class="flex flex-col gap-2 w-full col-span-2 max-h-0 peer-checked:max-h-[40rem] overflow-hidden transition-all ease-in-out delay-150">
                                <label class="flex flex-col items-center justify-center py-4 w-full h-16 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" data-dropzone="fileAfter" for="fileAfter">
                                    <span class="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                            <path d="M26.7075 10.2925L19.7075 3.2925C19.6146 3.19967 19.5042 3.12605 19.3829 3.07586C19.2615 3.02568 19.1314 2.9999 19 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V11C27.0001 10.8686 26.9743 10.7385 26.9241 10.6172C26.8739 10.4958 26.8003 10.3854 26.7075 10.2925ZM20 6.41375L23.5863 10H20V6.41375ZM25 27H7V5H18V11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12H25V27ZM19.7075 17.2925C19.8004 17.3854 19.8741 17.4957 19.9244 17.6171C19.9747 17.7385 20.0006 17.8686 20.0006 18C20.0006 18.1314 19.9747 18.2615 19.9244 18.3829C19.8741 18.5043 19.8004 18.6146 19.7075 18.7075C19.6146 18.8004 19.5043 18.8741 19.3829 18.9244C19.2615 18.9747 19.1314 19.0006 19 19.0006C18.8686 19.0006 18.7385 18.9747 18.6171 18.9244C18.4957 18.8741 18.3854 18.8004 18.2925 18.7075L17 17.4137V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17.4137L13.7075 18.7075C13.6146 18.8004 13.5043 18.8741 13.3829 18.9244C13.2615 18.9747 13.1314 19.0006 13 19.0006C12.8686 19.0006 12.7385 18.9747 12.6171 18.9244C12.4957 18.8741 12.3854 18.8004 12.2925 18.7075C12.1996 18.6146 12.1259 18.5043 12.0756 18.3829C12.0253 18.2615 11.9994 18.1314 11.9994 18C11.9994 17.8686 12.0253 17.7385 12.0756 17.6171C12.1259 17.4957 12.1996 17.3854 12.2925 17.2925L15.2925 14.2925C15.3854 14.1995 15.4957 14.1258 15.6171 14.0754C15.7385 14.0251 15.8686 13.9992 16 13.9992C16.1314 13.9992 16.2615 14.0251 16.3829 14.0754C16.5043 14.1258 16.6146 14.1995 16.7075 14.2925L19.7075 17.2925Z" fill="#404040"></path>
                                        </svg>
                                        <p class="font-montserrat font-semibold text-sm text-black">Загрузить файл</p>
                                    </span>
                                    <input class="hidden" type="file" id="fileAfter" accept="image/*" multiple>
                                </label>
                                <div fileAfterBlock="" class="grid grid-cols-2 gap-2">
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1fr-auto items-center gap-2">
                            <input type="checkbox" id="photoWork" name="photoWork" class="hidden peer" />
                            <label for="photoWork", class="flex items-center gap-1 font-montserrat font-semibold text-black text-sm cursor-pointer">
                                Фото акта выполненных работ
                            </label>
                            <img src="./local/templates/furnitureAssembly/img/icons/CaretDown.svg" alt="иконка" class="w-5 h-5 object-contain filter-black transition-all peer-checked:rotate-180 ml-auto" />
                            <div class="flex flex-col gap-2 w-full col-span-2 max-h-0 peer-checked:max-h-[40rem] overflow-hidden transition-all ease-in-out delay-150">
                                <label class="flex flex-col items-center justify-center py-4 w-full h-16 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" data-dropzone="fileWork" for="fileWork">
                                    <span class="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                            <path d="M26.7075 10.2925L19.7075 3.2925C19.6146 3.19967 19.5042 3.12605 19.3829 3.07586C19.2615 3.02568 19.1314 2.9999 19 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V11C27.0001 10.8686 26.9743 10.7385 26.9241 10.6172C26.8739 10.4958 26.8003 10.3854 26.7075 10.2925ZM20 6.41375L23.5863 10H20V6.41375ZM25 27H7V5H18V11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12H25V27ZM19.7075 17.2925C19.8004 17.3854 19.8741 17.4957 19.9244 17.6171C19.9747 17.7385 20.0006 17.8686 20.0006 18C20.0006 18.1314 19.9747 18.2615 19.9244 18.3829C19.8741 18.5043 19.8004 18.6146 19.7075 18.7075C19.6146 18.8004 19.5043 18.8741 19.3829 18.9244C19.2615 18.9747 19.1314 19.0006 19 19.0006C18.8686 19.0006 18.7385 18.9747 18.6171 18.9244C18.4957 18.8741 18.3854 18.8004 18.2925 18.7075L17 17.4137V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17.4137L13.7075 18.7075C13.6146 18.8004 13.5043 18.8741 13.3829 18.9244C13.2615 18.9747 13.1314 19.0006 13 19.0006C12.8686 19.0006 12.7385 18.9747 12.6171 18.9244C12.4957 18.8741 12.3854 18.8004 12.2925 18.7075C12.1996 18.6146 12.1259 18.5043 12.0756 18.3829C12.0253 18.2615 11.9994 18.1314 11.9994 18C11.9994 17.8686 12.0253 17.7385 12.0756 17.6171C12.1259 17.4957 12.1996 17.3854 12.2925 17.2925L15.2925 14.2925C15.3854 14.1995 15.4957 14.1258 15.6171 14.0754C15.7385 14.0251 15.8686 13.9992 16 13.9992C16.1314 13.9992 16.2615 14.0251 16.3829 14.0754C16.5043 14.1258 16.6146 14.1995 16.7075 14.2925L19.7075 17.2925Z" fill="#404040"></path>
                                        </svg>
                                        <p class="font-montserrat font-semibold text-sm text-black">Загрузить файл</p>
                                    </span>
                                    <input class="hidden" type="file" id="fileWork" accept="image/*" multiple>
                                </label>
                                <div fileWorkBlock="" class="grid grid-cols-2 gap-2">
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1fr-auto items-center gap-2">
                            <input type="checkbox" id="photoComplaints" name="photoComplaints" class="hidden peer" />
                            <label for="photoComplaints", class="flex items-center gap-1 font-montserrat font-semibold text-black text-sm cursor-pointer">
                                Фото акта рекламации
                            </label>
                            <img src="./local/templates/furnitureAssembly/img/icons/CaretDown.svg" alt="иконка" class="w-5 h-5 object-contain filter-black transition-all peer-checked:rotate-180 ml-auto" />
                            <div class="flex flex-col gap-2 w-full col-span-2 max-h-0 peer-checked:max-h-[40rem] overflow-hidden transition-all ease-in-out delay-150">
                                <label class="flex flex-col items-center justify-center py-4 w-full h-16 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" data-dropzone="fileComplaints" for="fileComplaints">
                                    <span class="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                            <path d="M26.7075 10.2925L19.7075 3.2925C19.6146 3.19967 19.5042 3.12605 19.3829 3.07586C19.2615 3.02568 19.1314 2.9999 19 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V11C27.0001 10.8686 26.9743 10.7385 26.9241 10.6172C26.8739 10.4958 26.8003 10.3854 26.7075 10.2925ZM20 6.41375L23.5863 10H20V6.41375ZM25 27H7V5H18V11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12H25V27ZM19.7075 17.2925C19.8004 17.3854 19.8741 17.4957 19.9244 17.6171C19.9747 17.7385 20.0006 17.8686 20.0006 18C20.0006 18.1314 19.9747 18.2615 19.9244 18.3829C19.8741 18.5043 19.8004 18.6146 19.7075 18.7075C19.6146 18.8004 19.5043 18.8741 19.3829 18.9244C19.2615 18.9747 19.1314 19.0006 19 19.0006C18.8686 19.0006 18.7385 18.9747 18.6171 18.9244C18.4957 18.8741 18.3854 18.8004 18.2925 18.7075L17 17.4137V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17.4137L13.7075 18.7075C13.6146 18.8004 13.5043 18.8741 13.3829 18.9244C13.2615 18.9747 13.1314 19.0006 13 19.0006C12.8686 19.0006 12.7385 18.9747 12.6171 18.9244C12.4957 18.8741 12.3854 18.8004 12.2925 18.7075C12.1996 18.6146 12.1259 18.5043 12.0756 18.3829C12.0253 18.2615 11.9994 18.1314 11.9994 18C11.9994 17.8686 12.0253 17.7385 12.0756 17.6171C12.1259 17.4957 12.1996 17.3854 12.2925 17.2925L15.2925 14.2925C15.3854 14.1995 15.4957 14.1258 15.6171 14.0754C15.7385 14.0251 15.8686 13.9992 16 13.9992C16.1314 13.9992 16.2615 14.0251 16.3829 14.0754C16.5043 14.1258 16.6146 14.1995 16.7075 14.2925L19.7075 17.2925Z" fill="#404040"></path>
                                        </svg>
                                        <p class="font-montserrat font-semibold text-sm text-black">Загрузить файл</p>
                                    </span>
                                    <input class="hidden" type="file" id="fileComplaints" accept="image/*" multiple>
                                </label>
                                <div fileComplaintsBlock="" class="grid grid-cols-2 gap-2">
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1fr-auto items-center gap-2">
                            <input type="checkbox" id="addWork" name="addWork" class="hidden peer" />
                            <label for="addWork", class="flex items-center gap-1 font-montserrat font-semibold text-black text-sm cursor-pointer">
                                Фото акта допработ
                            </label>
                            <img src="./local/templates/furnitureAssembly/img/icons/CaretDown.svg" alt="иконка" class="w-5 h-5 object-contain filter-black transition-all peer-checked:rotate-180 ml-auto" />
                            <div class="flex flex-col gap-2 w-full col-span-2 max-h-0 peer-checked:max-h-[40rem] overflow-hidden transition-all ease-in-out delay-150">
                                <label class="flex flex-col items-center justify-center py-4 w-full h-16 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" data-dropzone="fileaddWork" for="fileaddWork">
                                    <span class="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                            <path d="M26.7075 10.2925L19.7075 3.2925C19.6146 3.19967 19.5042 3.12605 19.3829 3.07586C19.2615 3.02568 19.1314 2.9999 19 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V11C27.0001 10.8686 26.9743 10.7385 26.9241 10.6172C26.8739 10.4958 26.8003 10.3854 26.7075 10.2925ZM20 6.41375L23.5863 10H20V6.41375ZM25 27H7V5H18V11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12H25V27ZM19.7075 17.2925C19.8004 17.3854 19.8741 17.4957 19.9244 17.6171C19.9747 17.7385 20.0006 17.8686 20.0006 18C20.0006 18.1314 19.9747 18.2615 19.9244 18.3829C19.8741 18.5043 19.8004 18.6146 19.7075 18.7075C19.6146 18.8004 19.5043 18.8741 19.3829 18.9244C19.2615 18.9747 19.1314 19.0006 19 19.0006C18.8686 19.0006 18.7385 18.9747 18.6171 18.9244C18.4957 18.8741 18.3854 18.8004 18.2925 18.7075L17 17.4137V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17.4137L13.7075 18.7075C13.6146 18.8004 13.5043 18.8741 13.3829 18.9244C13.2615 18.9747 13.1314 19.0006 13 19.0006C12.8686 19.0006 12.7385 18.9747 12.6171 18.9244C12.4957 18.8741 12.3854 18.8004 12.2925 18.7075C12.1996 18.6146 12.1259 18.5043 12.0756 18.3829C12.0253 18.2615 11.9994 18.1314 11.9994 18C11.9994 17.8686 12.0253 17.7385 12.0756 17.6171C12.1259 17.4957 12.1996 17.3854 12.2925 17.2925L15.2925 14.2925C15.3854 14.1995 15.4957 14.1258 15.6171 14.0754C15.7385 14.0251 15.8686 13.9992 16 13.9992C16.1314 13.9992 16.2615 14.0251 16.3829 14.0754C16.5043 14.1258 16.6146 14.1995 16.7075 14.2925L19.7075 17.2925Z" fill="#404040"></path>
                                        </svg>
                                        <p class="font-montserrat font-semibold text-sm text-black">Загрузить файл</p>
                                    </span>
                                    <input class="hidden" type="file" id="fileaddWork" accept="image/*" multiple >
                                </label>
                                <div fileaddWorkBlock="" class="grid grid-cols-2 gap-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <button class="flex gap-2 font-montserrat font-semibold text-sm justify-center px-4 py-2 rounded-md border-[#FFFFFF] items-center text-[#fff] bg-primary w-full" data-btn="Work" type="button">Завершил заказ</button>
                        <button class="flex gap-2 font-montserrat font-semibold text-sm justify-center px-4 py-2 rounded-md border-[#FFFFFF] items-center text-[#fff] bg-primary w-full" data-btn="Complaints" type="button">Завершил с рекламацией</button>
                        <button class="flex gap-2 font-montserrat font-semibold text-sm justify-center px-4 py-2 rounded-md border-[#FFFFFF] items-center text-[#fff] bg-primary w-full" data-btn="addWork" type="button">Доделка</button>
                    </div>
                </div>`);
                
            $controlsHtml.find('button').on('click', function(){
                const typeBtn = $(this).data('btn');
                if(typeBtn === "Work"){
                    
                    order.status = "Completed";
                    const oldCountStartedWork = Number($('[orderstatus="StartedWork"] > p:eq(1)').text() !== undefined ? $('[orderstatus="StartedWork"] > p:eq(1)').text() : "0");
    
                    if(oldCountStartedWork > 0){
                        $('[orderstatus="StartedWork"] > p:eq(1)').text(oldCountStartedWork - 1);
                    }
                    
                }else if(typeBtn === "Complaints"){
                    order.status = "Complaint";
                    const oldCountStartedWork = Number($('[orderstatus="StartedWork"] > p:eq(1)').text() !== undefined ? $('[orderstatus="StartedWork"] > p:eq(1)').text() : "0");
                    const oldCountComplaint = Number($('[orderstatus="Complaint"] > p:eq(1)').text() !== undefined ? $('[orderstatus="Complaint"] > p:eq(1)').text() : "0");
    
                    if(oldCountStartedWork > 0){
                        $('[orderstatus="StartedWork"] > p:eq(1)').text(oldCountStartedWork - 1);
                    }
                    $('[orderstatus="Complaint"] > p:eq(1)').text(oldCountComplaint + 1);
                }else if(typeBtn === "addWork"){
                    order.status = "Extended";
                    const oldCountStartedWork = Number($('[orderstatus="StartedWork"] > p:eq(1)').text() !== undefined ? $('[orderstatus="StartedWork"] > p:eq(1)').text() : "0");
                    const oldCountExtended = Number($('[orderstatus="Extended"] > p:eq(1)').text() !== undefined ? $('[orderstatus="Extended"] > p:eq(1)').text() : "0");
    
                    if(oldCountStartedWork > 0){
                        $('[orderstatus="StartedWork"] > p:eq(1)').text(oldCountStartedWork - 1);
                    }
                    $('[orderstatus="Extended"] > p:eq(1)').text(oldCountExtended + 1);
                }

                $('[ordercardid="'+ order.id +'"]').remove();
                $('#Order').dialog('close');
            });
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
                         <div id="map" class="w-full h-full"></div>
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
                            <p class="font-montserrat font-semibold text-black">Услуги: </p>
                            <div class="flex flex-col gap-2 px-1 py-2">
                                ${servicesMarkup()}
                            </div>
                        </div>` : ""}
                </div>
                <div cardContent="History" class="hidden flex-col gap-2">
                </div>
                <div cardContent="Actions" class="hidden flex-col gap-2">
                </div>
            </div>`);

        $body.find('[cardContent="Actions"]').append($controlsHtml);

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

        $('input[type="file"]').on('change', function(){
            const $item = $(this);
            const blockName = $item.attr('id');
            const $block = $('['+ blockName +'Block]');
            if($block.length > 0){
                const files = $item.get(0).files;
                for (let i = 0; i < files.length; i++){
                    const imgUrl = URL.createObjectURL(files[i]);
                    const $img = $(`<div ImgCard="" class="w-full h-full relative">
                            <img class=" object-cover w-full h-full " src="${imgUrl}" alt="Картинка" />
                            <buttom removeImg="" class="w-5 h-5 absolute right-0 top-0 rounded-full bg-white flex items-center justify-center p-[0.125rem] cursor-pointer">
                                <img class="w-full h-full object-contain filter-red-600" src="./local/templates/furnitureAssembly/img/icons/X.svg" alt="иконка" />
                            </ buttom>
                        </div>`)
                    $img.find('buttom').on('click', function(){
                        const $item = $(this);
                        $item.closest('[ImgCard]').remove();
                    })
                    $block.append($img)
                }
            }
        });
        setTimeout(function(){
            $('#Order').dialog('open');
        },10)
        
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


});
