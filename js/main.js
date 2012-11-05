var app = {

    initialize: function() {
        var self = this;
        //this.store = new MemoryStore();
        //this.store = new LocalStorageStore();
        this.store = new WebSqlStore(function () {
            self.route();
        });
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
    }, 

    showAlert : function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert((title)?title + ': '+message : message);
        }
    }, 

    registerEvents: function() {
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            console.log('touch');
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            console.log('mousie mousie');
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
        $(window).on('hashchange', $.proxy(this.route, this));
    }, 

    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            if (!this.HomeView) {
                this.HomeView = new HomeView(this.store);
            }
            $('body').html(this.HomeView.render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                self.currentEmployee = employee;
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    }

};

app.initialize();