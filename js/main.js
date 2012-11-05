var app = {

    initialize: function() {
        var self = this;
        //this.store = new MemoryStore();
        //this.store = new LocalStorageStore();
        this.store = new WebSqlStore(function () {
            //self.showAlert('Store initialized', 'All went well...');
            $('body').html(new HomeView(self.store).render().el);
        });
    }, 

    showAlert : function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert((title)?title + ': '+message : message);
        }
    }

};

app.initialize();