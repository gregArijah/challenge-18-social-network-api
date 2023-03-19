const { User,Thought } = require('../models');module.exports = {
  getAllUsers(req, res) {   //get all users
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {     //get single user
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {      //create user
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {     //update user
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
  .catch((err) =>res.status(500).json(err));
},
deleteUser(req, res) {      //delete user
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user found with that ID :('  })
        : Thought.deleteMany({ _id: { $in: user.thoughts}})
    )
    .then(() => res.json({ message: 'User has been deleted'}) )
    .catch((err) => res.status(500).json(err))
},
addFriend(req, res) {       //add friend
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ?  res.status(404).json({ message: 'No user found with that ID :('  })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err)); 
},
deleteFriend(req, res) {        //delete friend
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user found with that ID :('  })
        : res.json(user) 
    )
    .catch((err) => res.status(500).json(err))
    }
};

