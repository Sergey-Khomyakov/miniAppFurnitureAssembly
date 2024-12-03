$(document).ready( async function() {

    $('#Phone').mask('+7 (000) 000-00-00');
    $('#DopPhone').mask('+7 (000) 000-00-00');

    $('button[data-btn="save"]').on('click', function(){
        const $item = $(this);
        $item.append(`<img class="w-6 h-6 object-contain filter invert sepia-0 saturate-0 hue-rotate-[94deg] brightness-[1.06] contrast-[20]" src="./local/templates/furnitureAssembly/img/other/loading2.gif" alt="иконка">`)
        setTimeout(() => {
            $item.find('img').remove();
        }, 500);
    })

    if(window.Telegram.WebApp.initDataUnsafe !== null){
        
        window.Telegram.WebApp.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.location.href= "https://sergey-khomyakov.github.io/miniAppFurnitureAssembly/";
        });
    }

});