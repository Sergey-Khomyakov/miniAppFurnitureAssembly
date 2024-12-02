$(document).ready( async function() {
    try {
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.disableVerticalSwipes();
        if(!window.Telegram.WebApp.isVersionAtLeast("8.0")){
            window.Telegram.WebApp.showAlert('Ваша версия телеграма устарела. Пожалуйста, обновите телеграм.');
        }
    } catch (e) {
        console.log(e)
    }
});