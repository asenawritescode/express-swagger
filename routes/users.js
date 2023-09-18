const express = require('express')
const router = express.Router()
const cache = require("../config/store")

const generateId = () => {
    const randomId = Math.random().toString(36);
    return randomId.slice(2, 11);
  };


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 * /api/users/new:
 *   post:
 *     summary: Create a new 
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user
 *       400:
 *         description: Bad Request - Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * 
 */
router.post("/new", async(req, res, next) => {
    const { name, age } = req?.body
    try {
        //generate a new id for the user
        const id = await generateId();
        //add the user to the cache
        cache[id] = {
            name: name,
            age: age
        }
        res.send({ id });
        return 
    } catch (error) {
        console.log(error);
        next();
    }
});


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 * /api/users/data/:id:
 *   get:
 *     summary: Get user data by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 age:
 *                   type: integer
 *                   description: The age of the user
 *       404:
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/data/:id", (req, res, next) => {
    try {
        const id = req.params.id;
        user = cache[id];
        if(user) {
            res.send(user);
            return;
        }
    } catch (error) {
        next();
    }
});

module.exports = router;