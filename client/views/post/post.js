Template.post.rendered = function(){
  var converter = new Markdown.Converter();
  var editor = new Markdown.Editor(converter);
  editor.run();
  smoothScroll.init({
    speed: 400
  });
}
Template.post.events({
    'click #answerQuestion': function () {
      $("#userComment").toggle();
    },
    'submit .new-comment': function (event) {
        var commentId = Random.id();
        var converter1 = new Markdown.Converter();
        var commentText = converter1.makeHtml(event.target.commentText.value);
        var user = Meteor.user();
        var username = Meteor.user().username;
        var questionId = findQuestionIdFromUrl(window.location.pathname);
        var usersVoted = [];
        Comments.insert({
          commentId : commentId,
          questionId : questionId,
          user : user,
          createdAt : new Date(),
          username : username,
          commentText : commentText,
          reputation : 0,
          usersVoted : usersVoted
        });
        document.getElementById("new-comment").reset();
        $("#userComment").toggle();
        return false;
    },
    'click #upVoteArrow': function(e) {
      var comment = Comments.find({ commentId: this.commentId}).fetch();
      var user = comment[0].user;
      Meteor.call('commentUpvoted', user, comment[0], function(err,response) {
			if(err) {
				console.log('serverDataResponse', "Error:" + err.reason);
				return;
			}
      $("#upVoteArrow").addClass("upvoteClicked");
      $("#downVoteArrow").removeClass("downvoteClicked");
			console.log('serverDataResponse', response);
		});
    },
    'click #downVoteArrow': function(e) {
      var comment = Comments.find({ commentId: this.commentId}).fetch();
      var user = comment[0].user;
      Meteor.call('commentDownVoted', user, comment[0], function(err,response) {
      if(err) {
        console.log('serverDataResponse', "Error:" + err.reason);
        return;
      }
      $("#upVoteArrow").removeClass("upvoteClicked");
      $("#downVoteArrow").addClass("downvoteClicked");
      console.log('serverDataResponse', response);
    });
    },
    'click #questionUpVoteArrow': function(e) {
      var question = Questions.findOne(this);
      Meteor.call('questionUpvoted', question, function(err,response) {
			if(err) {
				console.log('serverDataResponse', "Error:" + err.reason);
				return;
			}
			console.log('serverDataResponse', response);
      $("#questionUpVoteArrow").addClass("upvoteClicked");
      $("#questionDownVoteArrow").removeClass("downvoteClicked");
		});
    },
    'click #questionDownVoteArrow': function(e) {
      var question = Questions.findOne(this);
      Meteor.call('questionDownvoted', question, function(err,response) {
			if(err) {
				console.log('serverDataResponse', "Error:" + err.reason);
				return;
			}
			console.log('serverDataResponse', response);
      $("#questionUpVoteArrow").removeClass("upvoteClicked");
      $("#questionDownVoteArrow").addClass("downvoteClicked");
		});
    },
      'click #chooseBestAnswer': function(e) {
        Questions.update(
            {_id: this.questionId},
            {$set: {bestAnswer: this.commentId}}
        )
    },
});
Template.post.helpers({
    questionDate: function () {
        var date = new Date(Questions.findOne(this).createdAt);
        return moment(date).fromNow();
    },
    askerAvatarURL: function () {
        var askerUserId = Questions.findOne(this).userId;
        var asker = Meteor.users.findOne({'_id':askerUserId});
        if (asker.avatar != null) {
            return asker.avatar;
        }
        if (asker.profile.avatar_url != null) {
            return asker.profile.avatar_url;
        }
        if (asker.services.google.picture != null) {
            return asker.services.google.picture;
        }
    },
    commentReputation: function(){
      var comment = Comments.findOne({commentId:this.commentId});
      return comment.reputation;
    },
    questionReputation: function(){
      var question = Questions.findOne(this);
      return question.reputation;
    },
    commenterAvatarURL: function(){
        var question = Questions.findOne(this.questionId);
        var commenter;
        if(isBestAnswerFunc(question, this.commentId)){
          var bestAnswerId = Questions.findOne(this.questionId).bestAnswer;
          var comment = Comments.find({ commentId: bestAnswerId}).fetch();
          commenter = comment[0].user;
        }
        else{
          commenter = this.user;
        }
        if (commenter.avatar != null) {
            return commenter.avatar;
        }
        if (commenter.profile != null && commenter.profile.avatar_url != null) {
            return commenter.profile.avatar_url;
        }
        if (commenter.services != null && commenter.services.google != null && commenter.services.google.picture != null) {
            return commenter.services.google.picture;
        }
        return null;
    },
    commentDate: function(){
        var date = new Date(this.createdAt);
        return moment(date).fromNow();
    },
    isCurrentUserAsker: function(){
      var posterId = Questions.findOne(this.questionId).userId;
      var currentUserId = Meteor.user()._id;
      if(currentUserId === posterId){
        return true;
      }
      return false;
    },
    questionComments: function(){
      var question = Questions.findOne(this._id);
      var bestAnswerId = question.bestAnswer;
      return Comments.find({ questionId: this._id, commentId: { $not: bestAnswerId }}).fetch();
    },
    bestAnswer: function(){
      var question = Questions.findOne(this._id);
      var bestAnswerId = question.bestAnswer;
      return Comments.find({ commentId: bestAnswerId}).fetch();
    }
});
//Couldn't get the question id from the dom
//For now pulling it from the url..
function findQuestionIdFromUrl(pathname) {
    return pathname.substring(10, pathname.length);
}
function isBestAnswerFunc(question, commentId){
  if(question.bestAnswer === commentId){
    return true;
  }
  return false;
}
