const express = require('express');

const {verifyJWT} = require('../middleware/verifyJWT');

const {insert, inserts, updateById, deleteById, getById, getByQuery, incrementPopularityById} = require('../controllers/food');

const router = express.Router();

router.post("/", insert);

router.post("/all", inserts);

router.put("/:id", updateById);

router.get("/increment", incrementPopularityById);

router.delete("/:id", deleteById);

router.get("/:id", getById);

router.get("/", getByQuery);

module.exports = router;