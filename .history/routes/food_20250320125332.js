import { Router } from 'express';

import { verifyJWT } from '../middleware/verifyJWT';

import { insert, inserts, updateById, deleteById, getById, getByQuery, incrementPopularityById } from '../controllers/food';

const router = Router();

router.post("/", insert);

router.post("/all", inserts);

router.put("/:id", updateById);

router.get("/increment", incrementPopularityById);

router.delete("/:id", deleteById);

router.get("/:id", getById);

router.get("/", getByQuery);

export default router;