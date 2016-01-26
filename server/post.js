Meteor.startup(function () {
	Meteor.methods({
	  commentUpvoted: function (user, comment) {
      var usersVotedT = comment.usersVoted;
      var reputation = findUserReputation(user);
      var commentReputation = comment.reputation;
			var userVote = findUserVote(usersVotedT, user._id);
      if(userVote === false){
        usersVotedT.push([
					{"userId":user._id},
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
		usersVotedT = removeUserVote(usersVotedT, user._id);
		if(userVote[1].vote === "+"){
    	reputation -= 1;
    	commentReputation -= 1
		}
		//user changed vote
		else{
			reputation +=2;
			commentReputation += 2
			usersVotedT.push([
				{"userId":user._id},
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
			var userVote = findUserVote(usersVotedT, user._id);
      if(userVote === false){
				usersVotedT.push([
					{"userId":user._id},
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
		usersVotedT = removeUserVote(usersVotedT, user._id);
		if(userVote[1].vote != "+"){
    	reputation += 1;
    	commentReputation += 1
		}
		//user changed vote
		else{
			reputation -=2;
			commentReputation -= 2
			usersVotedT.push([
				{"userId":user._id},
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
