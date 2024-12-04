$(document).ready( async function() {

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

        $('#Order').dialog('open');
    }

    // --- Orders end ---


});
