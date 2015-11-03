Template.newQuestion.helpers({
  tags: function() {
    return Tags.find().fetch().map(function(it){ return it.name; });
  }
});
Template.newQuestion.rendered = function() {
	Meteor.typeahead.inject($('.typeahead'));
}