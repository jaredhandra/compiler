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
    var user = Meteor.user();

    Questions.insert({
      title : title,
      questionText : questionText,
      createdAt : new Date(),
      user : user
    });

    event.target.title.value ="";
    event.target.questionText.value="";
    document.getElementById("new-question").reset();
    return false;
  }
});
Template.newQuestion.rendered = function() {
	Meteor.typeahead.inject($('.typeahead'));
}

Template.newQuestion.events({
	'submit .new-question': function(event) {
		var title = event.target.title.value;
		var questionText = event.target.questionText.value;
		var user = Meteor.user();

		Questions.insert({
			title : title,
			questionText : questionText,
			createdAt : new Date(),
			user : user
		});

		event.target.title.value ="";
		event.target.questionText.value="";
		document.getElementById("new-question").reset();
         $('#newQuestion').modal('hide');
		return false;
	}
});