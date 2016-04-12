Tags = new Mongo.Collection('tags');
Tags.attachSchema(new SimpleSchema({
	name:{
		type: String,
		label: "Name",
		max: 200
	},
	description:{
		type: String,
		label: "Description",
		max: 200
	}
	// tagColor: {
	// 	type: String,
	// 	label: "tagColor",
	// 	max: 200
	// }
}));
if (Meteor.isServer) {
	if (Tags.find({}).count() === 0){
		Tags.insert({
			'name':'IT',
			'description':'Descriping IT'
		});
		Tags.insert({
			'name':'AR',
			'description':'Descriping AR'
		});
		Tags.insert({
			'name':'AP',
			'description':'Descriping AP'
		});
		Tags.insert({
			'name':'Payroll',
			'description':'Descriping Payroll'
		});
		Tags.insert({
			'name':'Sales',
			'description':'Descriping Sales'
		});
		Tags.insert({
			'name':'Marketing',
			'description':'Descriping Marketing'
		});
		Tags.insert({
			'name':'Admin',
			'description':'Descriping Admin'
		});
	}
	Meteor.publish('tags', function(){
		return Tags.find();
	});
}
if (Meteor.isClient){
	Meteor.subscribe("tags");
}