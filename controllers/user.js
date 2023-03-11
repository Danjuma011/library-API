const User = require("../models/User");

const deleteUser = async (req, res) => {
  User.findOneAndDelete({ email: req.body.email }, (err, doc) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      res.status(200).send('Deleted');
    }
  });
  
}
module.exports={deleteUser}