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
    var tags = tempPickedTags;

    Questions.insert({
      userId : userId,
      title : title,
      questionText : questionText,
      createdAt : new Date(),
      username : username,
      comments : comments,
      tags : tags
    });

    event.target.title.value ="";
    event.target.questionText.value="";
    document.getElementById("new-question").reset();
    Router.go('/dashboard');
    return false;
  },
  'click #addTag': function(){
  	tempPickedTags = Session.get("tempPickedTags");
  	//TODO: need to add error checking to make sure the tag is in the collection..
    var tagToAdd =  document.getElementById('tag').value;
    tempPickedTags.push(tagToAdd);
    Session.set("tempPickedTags", tempPickedTags);
    document.getElementById('tag').value = "";
},
});
Template.newQuestion.helpers({
  tags: function() {
    return Tags.find().fetch().map(function(it){ return it.name; });
  }
});
Template.newQuestion.rendered = function() {
	Meteor.typeahead.inject($('.typeahead'));
}
//Temporary session variable to store userpicked tags..
 Session.set("tempPickedTags", []);

Template.userPickedTags.tempPickedTags = function() {
  return Session.get("tempPickedTags");
};