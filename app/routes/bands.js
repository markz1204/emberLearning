import Ember from 'ember';

//import wait from '../utils/wait';

export default Ember.Route.extend({
	model: function() {
		//return wait(this.store.findAll('band'), 3000);
		return this.store.findAll('band');
	},

	afterModel: function(model){
	  var bands = model;

	  if(bands.length ===1 ){
	    this.transitionTo('bands.band', bands.get('firstObject'));
	  }

	},

  actions: {

    didTransition: function(){
      document.title = 'Bands - Rock & Roll';
    },

    createBand: function(){
      var route = this,
          controller = this.get('controller');

      var band = this.store.createRecord('band', controller.getProperties('name'));
      band.save().then(function(){
          controller.set('name', '');
          route.transitionTo('bands.band.songs', band);
      });
    }

  }
});
