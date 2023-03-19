const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
          .then((thought) => res.json(thought))   //console.log(thought)//consolelog returns an object array but res.json returns an empty object
          .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No course with that ID' })
            : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                { $push: {thoughts: _id} },
                { runValidators: true, new: true }
            );
          })
          .then((thought) => 
          !thought
            ? res.status(404).json({ message: 'No such user exists' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => 
          !thought
            ? res.status(404).json({ message: 'No thought found with that ID :('  })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { runValidators: true, new: true }
            )
          )
          .then((user) => 
            !user 
              ? res.status(404).json({ message: 'No user found'})
              : res.json({ message: 'Thought deleted'})
          )
          .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
          .then((thought) =>
          !thought
            ?  res.status(404).json({ message: 'No thought found with that ID :('  })
            : res.json(thought)
          )
          .catch((err) => res.status(500).json(err)); 
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )
          .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with that ID :('  })
            : res.json(thought) 
          )
          .catch((err) => res.status(500).json(err)); 
    },
};