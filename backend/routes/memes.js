const express = require("express");
const router = express.Router();
const { Meme, validate, validateUpdatedMeme } = require("../models/meme");
var mongoose = require('mongoose');

/**
 *  @swagger
 *    definitions:
 *      Id:
 *        type: string
 *        example: 602417b60645ac0ba866685d
 *      Name:
 *        type: string
 *        example: ashok kumar
 *      Caption:
 *        type: string
 *        example: This is a meme
 *      Url:
 *        type: string
 *        example: https://i.pinimg.com/236x/d3/10/9b/d3109b34cc06328c6a27937174ce91b1.jpg
 *      Error:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *            example: "Something went Wrong"
 *      Meme: 
 *        type: object
 *        properties:
 *          name:
 *            $ref: '#definitions/Name'
 *          caption:
 *            $ref: '#definitions/Caption'
 *          url:
 *            $ref: '#definitions/Url'
 *      MemewithId:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#definitions/Id'
 *          name:
 *            $ref: '#definitions/Name'
 *          caption:
 *            $ref: '#definitions/Caption'
 *          url:
 *            $ref: '#definitions/Url'
 *      Memes:
 *        type: array
 *        items:
 *          $ref: '#definitions/MemewithId'
 */

/**
 * @swagger
 *   paths:
 *     /memes:
 *       get:
 *         tags: [memes]
 *         description: Gets list of Memes(100)
 *         responses:
 *          '200': 
 *            description: A successful response
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Memes'
 *          '500': 
 *            description: Internal Server Error
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
*/

router.get("/", async (req, res) => {
    try {
        const memes = await Meme.find({}, { name: 1, url: 1, caption: 1 })
            .sort({ _id: -1 })
            .limit(100);
        res.status(200).send(memes);
    }
    catch (err) {
        res.status(500).send({ error: 'Error: ' + err });
    }
});

/**
 * @swagger
 *   paths:
 *     /memes:
 *       post:
 *         tags: [memes]
 *         description: Creates a new Meme
 *         requestBody: 
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#definitions/Meme'
 *         responses:
 *          '200': 
 *            description: Meme is saved in the database
 *            content: 
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      $ref: '#definitions/Id'
 *          '500': 
 *            description: Internal Server Error
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '422': 
 *            description: Invalid data was sent
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '409': 
 *            description: Duplicate Payload was sent
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
*/

router.post("/", (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    
    let meme = new Meme({
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url
    });
    
    Meme.exists({ name: req.body.name, caption: req.body.caption, url: req.body.url }, (err, found) => {
        if (err) {
            return res.status(500).send({ error: 'Error: ' + err });
        }
        if (found) {
            return res.status(409).send({ error: "Similar Post was found!" });
        }
        else {
            meme.save()
                .then(() => res.status(200).send({ id: meme._id }))
                .catch((err) => res.sattus(500).send({ error: "Meme was not saved.\n Error: " + err}));
        }
    }); 
});

/**
 * @swagger
 *   paths:
 *     /memes/{id}:
 *       get:
 *         tags: [memes/<id>]
 *         description: Gets the Meme with that particular id
 *         parameters:
 *         - in: path
 *           name: id
 *           description: MemeId :12 byte Hexadecimal String
 *           required: true
 *           schema:
 *             $ref: '#definitions/Id'
 *         responses:
 *          '200': 
 *            description: Meme with the id was found
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/MemewithId'
 *          '404': 
 *            description: Meme with the id was not found
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '422': 
 *            description: Invalid Object Id
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '500': 
 *            description: Internal Server Error
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
*/

router.get("/:id", (req, res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (valid) {                                                                                //first check if id is valid object id
        const id = req.params.id;
        Meme.findById(id, { name: 1, url: 1, caption: 1 }, function (err, found) {              //Check if tha MemeId in Params exists
            if (err) {
                return res.status(500).send({ error: 'Error: ' + err }).end();
            }
            if (found) {
                return res.status(200).send(found);                                             //Meme Founded 
            }
            else {
                return res.status(404).send({ error: "The Meme with the given ID was not found." })
            }
        });
    }
    else {
        res.status(422).send({ error: "Invalid ObjectId." });
    }
});

/**
 * @swagger
 *   paths:
 *     /memes/{id}:
 *       patch:
 *         tags: [memes/<id>]
 *         description: Updates the Meme with that particular id
 *         parameters:
 *         - in: path
 *           name: id
 *           description: MemeId :12 byte Hexadecimal String
 *           required: true
 *           schema:
 *             $ref: '#definitions/Id'
 *         requestBody: 
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 parameters:
 *                   caption:
 *                      type: string
 *                   url:
 *                      type: string
 *                 example:
 *                   caption: This is a meme
 *                   url: https://i.pinimg.com/236x/d3/10/9b/d3109b34cc06328c6a27937174ce91b1.jpg
 *         responses:
 *          '200': 
 *            description: Meme with the id was Updated Successfully
 *          '404': 
 *            description: Meme with the id was not found
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '422': 
 *            description: Invalid ID/data was sent 
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '500': 
 *            description: Internal Server Error
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
 *          '409': 
 *            description: Similar Meme is already posted by the same owner
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#definitions/Error'
*/

router.patch("/:id", (req, res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (valid) {                                                                                //first check if id is valid object id
        const { error } = validateUpdatedMeme(req.body);                                        //Body Validation
        if (error) return res.status(422).send({ error: error.details[0].message });
        
        const id = req.params.id;
        Meme.findById(id, { name: 1, url: 1, caption: 1 }, function (err, meme) {              //Check if tha MemeId in Params exists
            if (err) return res.status(500).send({ error: 'Error: ' + err });
            
            if (!meme) return res.status(404).send({ error: "The Meme with the given ID was not found." });
            else {
                var caption = meme.caption, url = meme.url;
                if (req.body.caption)   caption = req.body.caption
                if (req.body.url)   url = req.body.url
                
                Meme.exists({ name: meme.name, caption: caption, url: url }, function (err, found) {  //Findig for Similar Post
                    if (err) return res.status(500).send({ error: 'Error: ' + err });
                    
                    if (found)  return res.status(409).send({ error: "Similar Post was found!" });
                    else {
                        Meme.findByIdAndUpdate({ "_id": id }, {                                 //Everything is Good to be updated
                            $set: {
                                "caption": caption,
                                "url": url
                            }
                        },
                            (err, saved) => {
                                if (err) return res.status(500).send({ error: 'Error: ' + err });

                                if (saved) return res.status(200).end();
                                else    return res.status(404).send({ error: "The Meme with the given ID was not found." });
                            }
                        );
                    }
                });
            }
        });
    }
    else {
        return res.status(422).send({ error: "Invalid ObjectId." });
    }
})

module.exports = router;
// curl --location --request POST 'http://127.0.0.1:3000/memes' \ --header 'Content-Type : application/json' \ --data-raw '{ "name": "ashok kumar", "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg", "caption": "This is a meme" }'
// curl --location --request POST 'http://localhost:3000/memes' \ --header 'Content-Type : application/json' \ --data-raw '{ "name": "ashok kumar", "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg", "caption": "This is a meme" }'