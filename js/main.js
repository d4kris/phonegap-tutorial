var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    initialize: function() {
        var self = this;
        //this.store = new MemoryStore();
        this.store = new WebSqlStore(function () {
            //self.showAlert('Store initialized', 'All went well...');
            self.renderHomeView();
        });
        //this.store = new LocalStorageStore();
        this.homeTpl = Handlebars.compile($('#home-tpl').html());
        this.employeeLiTpl = Handlebars.compile($('#employee-li-tpl').html());
    }, 

    showAlert : function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert((title)?title + ': '+message : message);
        }
    }, 

    renderHomeView : function () {
        $('body').html(this.homeTpl);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();