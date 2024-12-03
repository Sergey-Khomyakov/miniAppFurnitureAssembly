$(document).ready(function() {
    $('div[data-select]').on('click', 'div[data-value]', function(e){
        e.stopPropagation();
        const $item = $(this);
        const $parent = $item.closest('div[data-select]');

        //const value = $item.attr('data-value');
        const text = $item.text().trim();
        $parent.find('input').val(text).attr('value', text)
        if(text !== ""){
            $parent.find('label').removeClass('top-[0.675rem] text-base');
            $parent.find('label').addClass('-top-[0.675rem] text-sm');
        }else{
            $parent.find('label').addClass('top-[0.675rem] text-base');
            $parent.find('label').removeClass('-top-[0.675rem] text-sm');
        }
    })
});