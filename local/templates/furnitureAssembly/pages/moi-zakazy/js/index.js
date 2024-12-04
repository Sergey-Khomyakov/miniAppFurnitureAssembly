$(document).ready( async function() {

    if(window.Telegram.WebApp.initDataUnsafe !== null){
        const lastName = window.Telegram.WebApp.initDataUnsafe?.user?.last_name || "";
        const firstName = window.Telegram.WebApp.initDataUnsafe?.user?.first_name || "";
        const userPhoto = window.Telegram.WebApp.initDataUnsafe?.user?.photo_url || "";
        $('[userName]').text(lastName + " " + firstName);
        $('img[userPicture]').attr('src', userPhoto);
        
        window.Telegram.WebApp.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.location.href= "https://sergey-khomyakov.github.io/miniAppFurnitureAssembly/";
        });
    }


    $('[claerSearch]').on('click', function(){
        $('#Search').val('');
    });


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
                    <div orderCardId="${item.id}" class="">

                    </div>`);

                $orderContainer.append($order);
            });
        }
    }
});
