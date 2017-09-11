$(".bookmark-delete").click(function () {

    $.ajax({
        type: 'DELETE',
        url: "/?id=" + $(this).data("id"),
        dataType: "application/json",
        success: function (resultData) {
            alert("Deleted");
        }
    });

});


if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('/service-worker.js')
        .then(function (swReg) {
            console.log('Service Worker is registered', swReg);
        })
        .catch(function (error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
}


