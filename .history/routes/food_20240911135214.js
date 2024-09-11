const express = require('express');

const verifyJWT = require('../middleware/verifyJWT');

const {insert, inserts, updateById, deleteById, getById, getByQuery} = require('../controllers/food');

const router = express.Router();

router.post("/:id", verifyJWT, insert);

router.post("/", verifyJWT, inserts);

router.put("/:id", verifyJWT, updateById);

router.delete("/:id", verifyJWT, deleteById);

router.get("/:id", verifyJWT, getById);

router.get("/", verifyJWT, getByQuery);

module.exports = router;