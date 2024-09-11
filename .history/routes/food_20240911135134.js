const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const {getById, getByQuery, insert, inserts, updateById, deleteById} = require('../controllers/food');

const router = express.Router();

router.get("/:id", verifyJWT, getById);

router.get("/", verifyJWT, getByQuery);

router.post("/:id", verifyJWT, insert);

router.post("/", verifyJWT, inserts);

router.put("/:id", verifyJWT, updateById);

router.delete("/:id", verifyJWT, deleteById);

module.exports = router;