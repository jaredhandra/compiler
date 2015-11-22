//Template.newQuestion.helpers({
//  tags: function() {
//    return Tags.find().fetch().map(function(it){ return it.name; });
//  }
//});
//Template.newQuestion.rendered = function() {
//	Meteor.typeahead.inject($('.typeahead'));
//}
Template.newQuestion.events({
  'submit .new-question': function(event) {
    var title = event.target.title.value;
    var questionText = event.target.questionText.value;
    var userId = Meteor.user()._id;
    var username = Meteor.user().username;
    var comments = [];

    Questions.insert({
      userId : userId,
      title : title,
      questionText : questionText,
      createdAt : new Date(),
      username : username,
      comments : comments
    });

    event.target.title.value ="";
    event.target.questionText.value="";
    document.getElementById("new-question").reset();
    Router.go('/dashboard');
    return false;
  }
});
Template.newQuestion.helpers({
  tags: function() {
    return Tags.find().fetch().map(function(it){ return it.name; });
  }
});
Template.newQuestion.rendered = function() {
	Meteor.typeahead.inject($('.typeahead'));
}
