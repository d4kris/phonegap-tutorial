var HomeView  = function (store) {
	
	this.initialize = function() {
		this.el = $('<div/>');
 	  this.el.on('keyup', '.search-key', this.findByName);
 	};

  this.render = function () {
    this.el.html(HomeView.homeTpl);
    return this;
  };

  this.findByName = function() {
        console.log('findByName');
        store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.employeeLiTpl(employees));
            if (self.iscroll) {
            	console.log('Refresh iScroll');
            	self.iscroll.refresh();
            } else {
            	console.log('New iScroll');
            	self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false});
            }
        });
    };

	this.initialize();
}
HomeView.homeTpl = Handlebars.compile($('#home-tpl').html());
HomeView.employeeLiTpl = Handlebars.compile($('#employee-li-tpl').html());
