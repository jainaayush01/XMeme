const express = require("express");
const router = express.Router();

/**
 * @swagger
 *   definitions:
 *     rootMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Hello from xmeme backend
*/

/**
 *  @swagger
 *    paths:
 *      /:
 *        get:
 *          tags: [root]
 *          description: Backend Server root endpoint
 *          responses:
 *            '200': 
 *             description: Backend is up and running
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#definitions/rootMessage'
*/

router.get("/", (req, res) => {
    res.status(200).send({ message: "Hello from the xmeme backend!"});
});

module.exports = router;
