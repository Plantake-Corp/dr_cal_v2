const Food = require('../models/food');
const asyncHandler = require('express-async-handler');

// @desc insert
// @route POST /foods/{id}
// @access private
// @required fields {name}
// @return Food
const insert = asyncHandler(async (req, res) => {
    
    const body = req.body;

    if (!body || !body.revisionId) {
        return res.status(400).json({message: "revisionId is required"});
    }

    body

    try {
        const response = await Food.create(body);

        if (!response){
            return res.status(422).json({error: "Unable to insert data!"});
        }

        res.status(201).json({data: response});

    } catch (error) {
        res.status(500).json({error});
    }
});

// @desc inserts
// @route POST /foods/all
// @access private
// @required body {}
// @return Food
const inserts = asyncHandler(async (req, res) => {
    
    const body = req.body;

    if (!body) {
        return res.status(400).json({message: "Body is required"});
    }

    try {
        const response = await Food.insertMany(body);
        if (!response) { 
            return res.status(422).json({error: "Unable to insert foods"});
        }
        res.status(201).json({data: response});
    } catch (error) {
        return res.status(500).json({error});
    }

});

// @desc delete by id
// @route DELETE /foods/{id}
// @access private
// @required params {id}
// @return Food
const deleteById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id){
        return res.status(400).json({
            error: "Id param is required!"
        });
    }

    try {
        const response = await Food.deleteOne({revisionId: id});

        if (!response){
            return res.status(404).json({error: "Not found!"});
        }

        res.status(200).json({data: response});
        
    } catch (error) {
        res.status(500).json({error});
    }
});

// @desc update by id
// @route PUT /foods/{id}
// @access private
// @required params {id}
// @return Food
const updateById = asyncHandler(async (req, res) => {
    
    const id = req.params.id;

    if (!id){
        return res.status(400).json({error: "Id param is required!"});
    }

    const body = req.body;
    
    if (!body){
        return res.status(400).json({error: "Body is required!"});
    }

    const fields = {
        revisionId: id,
    };

    const updates = {
        $set: body,
    };

    const options = {
        new: true, // to provide updated value
        useFindAndModify: false,
    };

    try {
        const response = await Food.findByIdAndUpdate(fields, updates, options);
    
        if (!response){
            return res.status(404).json({error: "Not Found!"});
        }

        res.status(200).json({data: response});
        
    } catch (error) {
        res.status(500).json({error});
    }
});

// @desc get by id
// @route GET /foods/{id}
// @access private
// @required params {id}
// @return Food
const getById = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id){
        return res.status(400).json({error: "Id param is required!"});
    }

    try {
        
        const response = await Food.find({revisionId: id});
        if (!response){
            return res.status(404).json({error: "Not Found!"});
        }
        res.status(200).json({data: response});

    } catch (error) {
        res.status(500).json({error});
    }
});

// @desc get by query
// @route GET /foods?q={query_terms}&&limit={limit}
// @access private
// @return Foods
const getByQuery = asyncHandler(async (req, res) => {
    
    const search = req.query.q;
    const limit = Number(req.query.limit) ?? 10;

    try {
        
        let results;
        if (search){
            results = await Food.aggregate([
                {
                  $search: {
                    index: "default", 
                    compound: {
                      should: [
                        {
                          autocomplete: {
                            query: search,
                            path: "name", 
                            fuzzy: {
                              maxEdits: 2,
                              prefixLength: 2
                            }
                          }
                        }
                      ]
                    }
                  }
                },
                { $limit: limit }
              ]);
        } else {
            results = await Food.find().limit(limit);
        }
    
        let data = results;

        res.status(200).json({data: data});

    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = {
    insert,
    inserts,
    incrementPopularityById,
    deleteById,
    updateById,
    getById,
    getByQuery,
}
