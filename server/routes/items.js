const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const upload = require("../config/cloudinaryConfig");

//Items routes

router.get("/api/items", (req, res, next) => {
    Item.find()
        .then((itemDocument) => {
            res.status(200).json(itemDocument);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get("/api/items/:id", (req, res, next) => {
    Item.findById(req.params.id)
        .then((itemDocument) => {
            res.status(200).json(itemDocument);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post("/api/items", upload.single("image"), (req, res, next) => {
    const {
        name,
        description,
        image,
        category,
        quantity,
        location,
        address,
        id_user,
        timestamps,
    } = req.body;
    const newItem = {
        name,
        description,
        category,
        quantity,
        location,
        address,
        id_user,
        timestamps,
    };
    if (req.file) {
        newItem.image = req.file.secure_url;
    }

    Item.create(newItem)
        .then((itemDocument) => {
            res.status(201).json(itemDocument);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.patch("/api/items/:id", (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .then((itemDocument) => {
            res.status(200).json(itemDocument);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.delete("/api/items/:id", (req, res, next) => {
    Item.findByIdAndRemove(req.params.id)
        .then((itemDocument) => {
            if (itemDocument === null) {
                res.status(404).json({
                    message: "Item not found"
                });
            } else {
                res.status(204).json(itemDocument);
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

//User route 

router.patch("/api/user/me", (req, res, next) => {
    User.findByIdAndUpdate(req.session.currentUser._id, req.body, {
            new: true,
        })
        .then((userDocument) => {
            res.status(200).json(userDocument);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

module.exports = router;