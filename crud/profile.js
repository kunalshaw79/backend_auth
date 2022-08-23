const express = require('express');
const Profile = require('../schema/Profile');
const router = express.Router();

router.post('/addprofile', async (req, res) => {
        try {
            const { age, gender, mobile } = req.body;
            const savedProfile = await Profile.create({
                age: age,
                gender: gender,
                mobile: mobile,
                user: req.header('id'),
              });

            res.json(savedProfile)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    })

    router.put('/updateprofile/:id', async (req, res) => {
        const { age, gender, mobile } = req.body;
       
            // Create a newProfile object
            const newProfile = {};
            if (age) { newProfile.age = age };
            if (gender) { newProfile.gender = gender };
            if (mobile) { newProfile.mobile = mobile };
    
            // Find the note to be updated and update it
            let profile = await Profile.findById(req.params.id);
            if (!profile) { return res.status(404).send("Not Found") }
    
            if (profile.user.toString() !== req.header('id')) {
                return res.status(401).send("Not Allowed");
            }
            updatedprofile = await Profile.findByIdAndUpdate(req.params.id, { $set: newProfile }, { new: true })
            res.json({ updatedprofile });
     
    })
    

module.exports =router