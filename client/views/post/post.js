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
      var buttonRow = document.getElementById('wmd-button-row-answer');
      if(buttonRow == null){
          var converter = new Markdown.Converter();
          var options = {};
          var answerEditor = new Markdown.Editor(converter, "-answer", options);
          answerEditor.run();
        }
    },
    'submit .editQuestionSection': function(event){
      var question = Questions.findOne(this);
      var editText = (event.target.editText.value);
      Questions.update(this._id, {
        $set: {questionText: editText}
      });
      document.getElementById('questionTextSection').style.display = 'block';
      document.getElementById('editQuestion').style.display = 'block';
      document.getElementById('editQuestionSection').style.display = 'none';
      return false;
    },
    'submit .editCommentSection': function(event){
      var comment = Comments.findOne(this);
      var editText = (event.target.editText.value);
      Comments.update(comment._id, {
        $set: {commentText: editText}
      });
      document.getElementById('commentText-'+this.commentId).style.display = 'block';
      document.getElementById('editButton-'+this.commentId).style.display = 'block';
      document.getElementById('editCommentDiv-'+this.commentId).style.display = 'none';
      return false;
    },
    'submit .new-comment': function(event){
        var commentId = Random.id();
        var commentText = (event.target.commentText.value);
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
    'click #editQuestion': function(){
      document.getElementById('questionTextSection').style.display = 'none';
      document.getElementById('editQuestion').style.display = 'none';
      document.getElementById('editQuestionSection').style.display = 'block';
    },
    'click #editComment': function(event){
      document.getElementById('commentText-'+this.commentId).style.display = 'none';
      document.getElementById('editButton-'+this.commentId).style.display = 'none';
      document.getElementById('editCommentDiv-'+this.commentId).style.display = 'block';

      var buttonRow = document.getElementById('wmd-button-row-'+this.commentId);
      if(buttonRow == null){
          var converter = new Markdown.Converter();
          var options = {};
          var commentEditor = new Markdown.Editor(converter, "-"+this.commentId, options);
          commentEditor.run();
        }
    },
    'click #upVoteArrow': function(e) {
      var comment = Comments.find({ commentId: this.commentId}).fetch();
      var user = comment[0].user;
      Meteor.call('commentUpvoted', user, comment[0], function(err,response) {
			if(err) {
				console.log('serverDataResponse', "Error:" + err.reason);
				return;
			}
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
		});
    },
    'click #findAnExpert': function(e) {
      var question = Questions.findOne(this);
      var questionCategory = question.tags;
      var listOfUserExtWithTagListed = UserExtensions.find({"languages":questionCategory}).fetch();
      var listOfUserIDsPossibleExperts = [];

      listOfUserExtWithTagListed.forEach( function (userExtObj)
      {
        listOfUserIDsPossibleExperts.push(userExtObj.userId);
      });
      var expertID = listOfUserIDsPossibleExperts[Math.floor(Math.random() * listOfUserIDsPossibleExperts.length)]
      var expertExt = UserExtensions.findOne({'userId':expertID});
      var expertRep = expertExt.reputation;
      var expertUser = Meteor.users.findOne(expertID);
      Meteor.call('fetchEmail', expertID, function(err,response) {
			if(err) {
				console.log('serverDataResponse', "Error:" + err.reason);
				return;
			}
			console.log('serverDataResponse', response);
      console.log('test');
      $('#findAnExpertModal').modal('show');
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
        if(date != null){
          return moment(date).fromNow();
      }
    },
    askerAvatarURL: function () {
        var askerUserId = Questions.findOne(this).userId;
        var asker = Meteor.users.findOne({'_id':askerUserId});
        if (asker.avatar != null) {
            return asker.avatar;
        }
        if (asker.profile != null && asker.profile.avatar_url != null) {
            return asker.profile.avatar_url;
        }
        if (asker.service != null && asker.services.google != null && asker.services.google.picture != null) {
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
      var question =  Questions.findOne(this.questionId) || Questions.findOne(this._id);
        if(question != null && question.userId != null){
          var posterId = question.userId;
          var currentUserId = Meteor.user()._id;
          if(currentUserId === posterId){
            return true;
        }
      }
      return false;
    },
    questionComments: function(){
      var question = Questions.findOne(this._id);
      if(question != null && question.bestAnswer != null){
        var bestAnswerId = question.bestAnswer;
        return Comments.find({ questionId: this._id, commentId: { $not: bestAnswerId }}).fetch();
      }
      return "";
    },
    bestAnswer: function(){
      var question = Questions.findOne(this._id);
      if(question != null && question.bestAnswer != null){
        var bestAnswerId = question.bestAnswer;
        if(bestAnswerId != null){
          return Comments.find({ commentId: bestAnswerId}).fetch();
        }
      }
      return "";
    },
    isCurrentUserPoster: function(){
      var comment = Comments.findOne({commentId:this.commentId});
      if(comment.user._id === Meteor.user()._id){
        return true;
      }
      return false;
    },
    fetchCommentText: function(){
      var comment = Comments.findOne({commentId:this.commentId});
      return comment.commentText;
    },
    fetchQuestionText: function(){
      var question = Questions.findOne(this._id);
      return question.questionText;
    },
    questionTextHtml: function(){
      var converter1 = new Markdown.Converter();
      var question = Questions.findOne(this._id);
      if(question != null && question.questionText != null){
        var htmlText = converter1.makeHtml(question.questionText);
        return htmlText;
      }
    },
    commentTextHtml: function(){
      var comment = Comments.findOne({commentId:this.commentId});
      var converter1 = new Markdown.Converter();
      var commentHtml = converter1.makeHtml(comment.commentText);

      return commentHtml;
    },
    isCurrentUserVoteUp: function(){
      var user = Meteor.user();
      var comment = Comments.findOne({commentId:this.commentId});
      var usersVoted = comment.usersVoted;

      if(user != null && comment != null && usersVoted != null && usersVoted.length > 0){
        vote = findUserVote(usersVoted,user._id)
        if(vote[1].vote === "+"){
          return true;
        }
      }
      return false;
    },
    isCurrentUserVoteDown: function(){
      var user = Meteor.user();
      var comment = Comments.findOne({commentId:this.commentId});
      var usersVoted = comment.usersVoted;

      if(user != null && comment != null && usersVoted != null && usersVoted.length > 0){
        vote = findUserVote(usersVoted,user._id)
        if(vote[1].vote === "-"){
          return true;
        }
      }
      return false;
    },
    isCurrentUserQuestionVoteUp: function(){
      var user = Meteor.user();
      var question = Questions.findOne({_id:this._id});
      var usersVoted = question.usersVoted;

      if(user != null && question != null && usersVoted != null && usersVoted.length > 0){
          vote = findUserVote(usersVoted,user._id)
          if(vote[1].vote === "+"){
            return true;
          }
      }
      return false;
    },
    isCurrentUserQuestionVoteDown: function(){
      var user = Meteor.user();
      var question = Questions.findOne({_id:this._id});
      var usersVoted = question.usersVoted;

      if(user != null && question != null && usersVoted != null && usersVoted.length > 0){
          vote = findUserVote(usersVoted,user._id)
          if(vote[1].vote === "-"){
            return true;
          }
      }
      return false;
    }
  });

function findQuestionIdFromUrl(pathname) {
    return pathname.substring(10, pathname.length);
}
function isBestAnswerFunc(question, commentId){
  if(question.bestAnswer === commentId){
    return true;
  }
  return false;
}

function findUserVote(array, value) {
	for (var i = 0, l = array.length; i < l; i++) {
    var obj = array[i];
    if(obj[0].userId === value){
			return obj;
		}
	}
	return false;
}
