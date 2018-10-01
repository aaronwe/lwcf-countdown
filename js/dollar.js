(function($) {

  	/**
  	 * Dollar Clock Face
  	 *
  	 * This class will generate a dollar flip counter, a la the
     * U.S. national debt clock.
     * clock.increment() and clock.decrement() have been added.
  	 *
  	 * @param  object  The parent FlipClock.Factory object
  	 * @param  object  An object of properties to override the default
  	 */

  	FlipClock.DollarFace = FlipClock.Face.extend({

  		/**
  		 * Tells the counter clock face if it should auto-increment
  		 */

  		shouldAutoIncrement: false,

  		/**
  		 * Constructor
  		 *
  		 * @param  object  The parent FlipClock.Factory object
  		 * @param  object  An object of properties to override the default
  		 */

  		constructor: function(factory, options) {

  			if(typeof options != "object") {
  				options = {};
  			}

  			factory.autoStart = options.autoStart ? true : false;

  			if(options.autoStart) {
  				this.shouldAutoIncrement = true;
  			}

  			factory.increment = function(inc) {
  				factory.countdown = false;
  				factory.setTime(factory.getTime().getTimeSeconds() + inc);
  			};

  			factory.decrement = function() {
  				factory.countdown = true;
  				var time = factory.getTime().getTimeSeconds();
  				if(time > 0) {
  					factory.setTime(time - 1);
  				}
  			};

  			factory.setValue = function(digits) {
  				factory.setTime(digits);
  			};

  			factory.setCounter = function(digits) {
  				factory.setTime(digits);
  			};

  			this.base(factory, options);
  		},

  		/**
  		 * Build the clock face
  		 */

  		build: function() {
  			var t        = this;
  			var children = this.factory.$el.find('ul');
  			var time 	 = this.factory.getTime().digitize([this.factory.getTime().time]);

  			if(time.length > children.length) {
  				$.each(time, function(i, digit) {
  					var list = t.createList(digit);

  					list.select(digit);
  				});

  			}

  			$.each(this.lists, function(i, list) {
  				list.play();
  			});

         this.createDivider('',"flip-clock-comma", true);
         this.createDivider('','flip-clock-comma', true);
         this.createDivider('','flip-clock-dollar', true);

         $(this.dividers[0]).insertBefore(this.lists[this.lists.length - 3].$el);
         $(this.dividers[1]).insertBefore(this.lists[this.lists.length - 6].$el);
         $(this.dividers[2]).insertBefore(this.lists[0].$el);

  			this.base();
  		},

  		/**
  		 * Flip the clock face
  		 */

  		flip: function(time, doNotAddPlayClass) {
  			if(this.shouldAutoIncrement) {
  				this.autoIncrement();
  			}

  			if(!time) {
  				time = this.factory.getTime().digitize([this.factory.getTime().time]);
  			}

  			this.base(time, doNotAddPlayClass);
  		},

  		/**
  		 * Reset the clock face
  		 */

  		reset: function() {
  			this.factory.time = new FlipClock.Time(
  				this.factory,
  				this.factory.original ? Math.round(this.factory.original) : 0
  			);

  			this.flip();
  		}
  	});

  }(jQuery));
