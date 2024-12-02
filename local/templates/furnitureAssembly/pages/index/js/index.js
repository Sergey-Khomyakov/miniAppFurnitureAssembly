$(document).ready( async function() {
    try {
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.disableVerticalSwipes();
        if(!window.Telegram.WebApp.isVersionAtLeast("8.0")){
            window.Telegram.WebApp.showAlert('Ваша версия телеграма устарела. Пожалуйста, обновите телеграм.');
        }else{
            if(window.Telegram.WebApp.initDataUnsafe !== null){
                const lastName = window.Telegram.WebApp.initDataUnsafe?.user?.last_name || "";
                const firstName = window.Telegram.WebApp.initDataUnsafe?.user?.first_name || "";
                const userPhoto = window.Telegram.WebApp.initDataUnsafe?.user?.photo_url || "";
                $('[userName]').text(lastName + " " + firstName);
                $('img[userPicture]').attr('src', userPhoto);
            }
        }
    } catch (e) {
        console.log(e)
    }
});