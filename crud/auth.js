const express = require('express');
const router = express.Router();
const Credentials =require('../schema/Credentials')
const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');

// const secret ="IndiaIsGreat";
router.post('/createuser', async(req,res)=>{

    let check = await Credentials.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ error: "Email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

        const newuser = await Credentials.create({
        name: req.body.name,
        password: hashedpassword,
        email: req.body.email,
      });

      // const token_creater = {
      //   user: {
      //       id: newuser.id
      //     }
      // }
      // const token = jwt.sign(token_creater, secret);
      const id_new = newuser.id;
      const success = true;
      res.json({ success, id_new});
});

router.post('/login', async(req,res)=>{

  const {email,password} =req.body;
  let existing_user = await Credentials.findOne({ email: email });
  if (!existing_user) {
    return res.status(400).json({ error: "Email not registered" })
  }

  const Compare_password = await bcrypt.compare(password,existing_user.password);
  if (!Compare_password) {
    const success = false;
    return res.status(400).json({ success, error: " Invalid Credentials" });
  }
    // const token_creater = {
    //   user: {
    //       id: newuser.id
    //     }
    // }
    // const token = jwt.sign(token_creater, secret);
    const id_new = existing_user.id;
    const success = true;
    res.json({ success, id_new});
})

router.post('/getuser',async (req, res) => {

  try {
   const userId = req.header('id');
    console.log(userId)
    let existing_user = await Profile.findOne({ user: userId });
    const user = await Credentials.findById(userId).select("-password")
    const user_info = [user,existing_user]
    res.send(JSON.stringify(user_info))
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router
