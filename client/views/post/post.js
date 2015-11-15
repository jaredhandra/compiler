Template.post.events({
  'submit .new-comment': function(event) {
    var userId = Meteor.user()._id;
    var comment = event.target.commentText.value;
    var username = Meteor.user().username;
    var questionId = findQuestionIdFromUrl(window.location.pathname);
    var newComment = [
    {"commentText":comment},
    {"userId":userId},
    {"username":username}
    ];

    Questions.update(
      { _id: questionId},
      { $push: { comments: newComment }}
      )

    document.getElementById("new-comment").reset();
    return false;
  }
});

//Couldn't get the question id from the dom
//For now pulling it from the url..
function findQuestionIdFromUrl(pathname){
  return pathname.substring(10, pathname.length);
}