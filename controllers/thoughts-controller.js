const { Thoughts, User } = require("../models");

const thoughtsController = {
	
	getAllThoughts(req, res) {
		Thoughts.find({})
			.then(dbThoughtsData => res.json(dbThoughtsData))
			.catch(err => res.json(err));
	},


	getthoughtById({ params }, res) {
		Thoughts.findOne({ _id: params.id })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thoughts found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	
	createThought({ body }, res) {
		Thoughts.create(body)
			.then(({ _id }) => {
				console.log(_id);
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	
	updateThought({ params, body }, res) {
		Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	=
	deleteThought({ params }, res) {
		Thoughts.findOneAndDelete({ _id: params.id })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},


	createReaction({ params, body }, res) {
		Thoughts.findOneAndUpdate(
			{ _id: params.id },
			{ $addToSet: { reactions: body } },
			{ new: true }
		)
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},


	deleteReaction({ params }, res) {
		Thoughts.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then(dbThoughtsData => res.json(dbThoughtsData))
			.catch(err => res.json(err));
	},
};

module.exports = thoughtsController;
