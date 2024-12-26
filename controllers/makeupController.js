const Makeup = require("../models/Makeup");
const { success } = require("../utils/message");
const cloudinary = require("../utils/cloudinary");

module.exports.add_makeup_service = async (req, res) => {
    try{
        const userId = req.user._id;
        if(req.files !==undefined){
            const formImage = req.files.image;
            const imagePath = formImage.tempFilePath;
            if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                const image = await cloudinary.upload_image(imagePath);
                const makeup = new Makeup({
                title: req.body.title,
                price: req.body.price,
                duration: req.body.duration,
                image: image
            });
                const result = await makeup.save();
                res.json(success("Makeup Service with Image Added Successfully", result));
            } else {
                res.json(failure("Must be png, jpg or jpeg"));
            }
        } else {
            const makeup = new Makeup({
                title: req.body.title,
                price: req.body.price,
                duration: req.body.duration
            });
            const result = await makeup.save();
            res.json(success("Makeup Service Added Successfully", result));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}
