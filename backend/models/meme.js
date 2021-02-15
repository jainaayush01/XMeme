const Joi = require("joi");
const mongoose = require("mongoose");

var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
var regex = new RegExp(expression);
var urlexp = /\.(jpeg|jpg|jpe|jif|jfif|pjpeg|pjp|avif|apng|jfi|gif|png|webp|svg)$/; //image extensions supported by all web browsers
var urlregex = new RegExp(urlexp);

const Meme = mongoose.model("Memes", new mongoose.Schema({
    name: {
        type: String,
        required: "Name of person can't be empty",
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    caption: {
        type: String,
        required: "Caption can't be empty",
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    url: {
        type: String,
        required: "Image URL can't be empty",
        trim: true,
        minlength: 5,
        maxlength: 500,
    },
}));

function validateMeme(meme) {

    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        caption: Joi.string().min(1).max(255).required(),
        url: Joi.string().pattern(regex, 'url').pattern(urlregex, 'url').min(5).max(500).required()
    });

    return schema.validate(meme);
}

function validateUpdatedMeme(meme) {
    
    const schema = Joi.object({
        caption: Joi.string().min(1).max(255),
        url: Joi.string().pattern(regex, 'url').pattern(urlregex, 'url').min(5).max(500)
    });

    return schema.validate(meme);
}

exports.Meme = Meme;
exports.validate = validateMeme;
exports.validateUpdatedMeme = validateUpdatedMeme;
