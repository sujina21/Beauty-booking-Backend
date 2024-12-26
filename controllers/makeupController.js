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


exports.update_makeup_service = async (req, res) => {
    try{
        const makeupId = req.params.id;
        const makeup = await Makeup.findById(makeupId);
        if(makeup){
            if(req.files !==undefined){
                const formImage = req.files.image;
                const imagePath = formImage.tempFilePath;
                if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                    const image = await cloudinary.upload_image(imagePath);
                    makeup.title = req.body.title;
                    makeup.price = req.body.price;
                    makeup.duration = req.body.duration;
                    makeup.image = image;
                    const result = await makeup.save();
                    res.json(success("Makeup Service with Image Updated Successfully", result));
                } else {
                    res.json(failure("Must be png, jpg or jpeg"));
                }
            } else {
                makeup.title = req.body.title;
                makeup.price = req.body.price;
                makeup.duration = req.body.duration;
                const result = await makeup.save();
                res.json(success("Makeup Service Updated Successfully", result));
            }
        } else {
            res.json(failure("Makeup Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.delete_makeup_service_by_id = async (req, res) => {
    try{
        const makeupId = req.params.id;
        const makeup = await Makeup.findById(makeupId);
        if(makeup){
            await makeup.delete();
            res.json(success("Makeup Service Deleted Successfully"));
        } else {
            res.json(failure("Makeup Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}
