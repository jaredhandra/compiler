Meteor.startup(function () {
	Meteor.methods({
		findUserVoteServer: function (array, value) {
			return findUserVote(array, value);
		},
		questionUpvoted: function (question) {
			var usersVotedT = question.usersVoted;
			var user = Meteor.users.findOne({_id:question.userId});
			var currentUser = Meteor.user();
			var reputation = findUserReputation(user);
			var questionReputation = question.reputation;
			var userVote = findUserVote(usersVotedT, currentUser._id);
			if(userVote === false){
				usersVotedT.push([
					{"userId":currentUser._id},
					{"vote":"+"}
				]);
				reputation += 1;
				questionReputation += 1
				UserExtensions.update(
					{userId: user._id},
					{$set: {reputation: reputation}}
				)
				Questions.update(
					{_id: question._id},
					{$set: {
									reputation: questionReputation,
									usersVoted: usersVotedT
								}
						}
				)
				return "User Upvoted";
		}
		//user has already voted and removed vote
		usersVotedT = removeUserVote(usersVotedT, currentUser._id);
		if(userVote[1].vote === "+"){
			reputation -= 1;
			questionReputation -= 1
		}
		//user changed vote
		else{
			reputation +=2;
			questionReputation += 2
			usersVotedT.push([
				{"userId":currentUser._id},
				{"vote":"+"}
			]);
		}
		UserExtensions.update(
			{userId: user._id},
			{$set: {reputation: reputation}}
		)
		Questions.update(
			{_id: question._id},
			{$set: {
							reputation: questionReputation,
							usersVoted: usersVotedT
						}
				}
		)
			return "User Action Removed"
		},
		questionDownvoted: function (question) {
			var usersVotedT = question.usersVoted;
			var user = Meteor.users.findOne({_id:question.userId})
			var reputation = findUserReputation(user);
			var currentUser = Meteor.user();
			var questionReputation = question.reputation;
			var userVote = findUserVote(usersVotedT, currentUser._id);
			if(userVote === false){
				usersVotedT.push([
					{"userId":currentUser._id},
					{"vote":"-"}
				]);
				reputation -= 1;
				questionReputation -= 1
				UserExtensions.update(
					{userId: user._id},
					{$set: {reputation: reputation}}
				)
				Questions.update(
					{_id: question._id},
					{$set: {
									reputation: questionReputation,
									usersVoted: usersVotedT
								}
						}
				)
				return "User Downvoted";
		}
		//user has already voted
		usersVotedT = removeUserVote(usersVotedT, currentUser._id);
		if(userVote[1].vote != "+"){
			reputation += 1;
			questionReputation += 1
		}
		//user changed vote
		else{
			reputation -=2;
			questionReputation -= 2
			usersVotedT.push([
				{"userId":currentUser._id},
				{"vote":"-"}
			]);
		}
		UserExtensions.update(
			{userId: user._id},
			{$set: {reputation: reputation}}
		)
		Questions.update(
			{_id: question._id},
			{$set: {
							reputation: questionReputation,
							usersVoted: usersVotedT
						}
				}
		)
			return "User Action Removed"
		},
		fetchEmail: function (userId) {
			  var user = Meteor.users.findOne(userId);
				if(user.emails != null){
					return user.emails[0].address;
			};
			if (user.email != null){
      return user.email;
    } else if(user.profile != null && user.profile.email != null){
      return user.profile.email;
    } else if(user.services.google.family_name != null){
      return user.services.google.family_name;
    }
		},
	  commentUpvoted: function (user, comment) {
      var usersVotedT = comment.usersVoted;
      var reputation = findUserReputation(user);
      var commentReputation = comment.reputation;
			var currentUser = Meteor.user();
			var userVote = findUserVote(usersVotedT, currentUser._id);
      if(userVote === false){
        usersVotedT.push([
					{"userId":currentUser._id},
					{"vote":"+"}
				]);
        reputation += 1;
        commentReputation += 1
        UserExtensions.update(
          {userId: user._id},
          {$set: {reputation: reputation}}
        )
        Comments.update(
          {_id: comment._id},
          {$set: {
                  reputation: commentReputation,
                  usersVoted: usersVotedT
                }
            }
        )
        return "User Upvoted";
    }
    //user has already voted and removed vote
		usersVotedT = removeUserVote(usersVotedT, currentUser._id);
		if(userVote[1].vote === "+"){
    	reputation -= 1;
    	commentReputation -= 1
		}
		//user changed vote
		else{
			reputation +=2;
			commentReputation += 2
			usersVotedT.push([
				{"userId":currentUser._id},
				{"vote":"+"}
			]);
		}
    UserExtensions.update(
      {userId: user._id},
      {$set: {reputation: reputation}}
    )
    Comments.update(
      {_id: comment._id},
      {$set: {
              reputation: commentReputation,
              usersVoted: usersVotedT
            }
        }
    )
      return "User Action Removed"
	  },

		commentDownVoted: function (user, comment) {
			var usersVotedT = comment.usersVoted;
			var reputation = findUserReputation(user);
			var commentReputation = comment.reputation;
			var currentUser = Meteor.user();
			var userVote = findUserVote(usersVotedT, currentUser._id);
      if(userVote === false){
				usersVotedT.push([
					{"userId":currentUser._id},
					{"vote":"-"}
				]);
        reputation -= 1;
        commentReputation -= 1
        UserExtensions.update(
          {userId: user._id},
          {$set: {reputation: reputation}}
        )
        Comments.update(
          {_id: comment._id},
          {$set: {
                  reputation: commentReputation,
                  usersVoted: usersVotedT
                }
            }
        )
        return "User Downvoted";
    }
    //user has already voted
		usersVotedT = removeUserVote(usersVotedT, currentUser._id);
		if(userVote[1].vote != "+"){
    	reputation += 1;
    	commentReputation += 1
		}
		//user changed vote
		else{
			reputation -=2;
			commentReputation -= 2
			usersVotedT.push([
				{"userId":currentUser._id},
				{"vote":"-"}
			]);
		}
    UserExtensions.update(
      {userId: user._id},
      {$set: {reputation: reputation}}
    )
    Comments.update(
      {_id: comment._id},
      {$set: {
              reputation: commentReputation,
              usersVoted: usersVotedT
            }
        }
    )
      return "User Action Removed"
	  }
	});
  });

function findUserReputation(user){
  ext = UserExtensions.find({ userId: user._id}).fetch();
  return ext[0].reputation;
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

function removeUserVote(array, value){
	for (var i = 0, l = array.length; i < l; i++) {
		var obj = array[i];
		if(obj[0].userId === value){
			var index = array.indexOf(i);
		 array.splice(index, 1);
		 return array;
		}
	}
	return array;
}
