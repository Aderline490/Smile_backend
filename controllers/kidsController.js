const express = require('express');
const Kids = require('../models/kidsModel');
const Joi = require('joi');
const { response } = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    Kids.find({},(err,kids)=>{
        if(err){    
            res.status(500).json({errmsg:err});
        }
        res.status(200).json({msg:kids})
    });
});

router.get('/:id',(req,res)=>{
    Kids.find(req.params.id)
    .then(kid=>{
        res.send(kid).status(200);
    })
    .catch(err=>{
        res.send(404).send(err);
    })
})

router.get('/searchKid',(req,res)=>{
    const gender = female;
    const lessKids = 1;
    const greatKids = 2;
    const youngKid = 3;
    const oldKid = 10;
    const english = false;
    Kids.find({
        gender: gender,
        kids: {$lt:lessKids, $gt:greatKids},
        age:{$lt:youngKid, $gt:oldKid},
        english: english
    })
    .then(kids=>{
        res.status(200).send(kids);
    })
    .catch(err=>{
        res.status(404).send(err);
    })
})

router.post('/registerKid',(req,res)=>{
    const result = schema.validate(req.body);
    if(result.error){
            res.status(404).send(result.error.details[0].message);
            return;
    }
    const newKid = new Kids({
        name: req.body.name,
        gender:req.body.gender,
        dob:req.body.dob,
        country:req.body.country,
        description:req.body.description
    })
    newKid.save()
    .then(kidSaved=>{
        res.status(201).send(kidSaved);
    })
    .catch(err=>{
        res.send(err).status(404);
    })
})

router.put('/update',(req,res)=>{
    // const result = schema.validate(req.body)
    // if(result.error){
    //     res.status(404).send(result.error.details[0].message);
    //     return;
    // }
    Kids.findOneAndUpdate({_id:req.body.id}, req.body, {new:true})
    .then(kidUpdated=>{
        res.status(201).send(kidUpdated);
    })
    .catch(err=>{
        res.status(400).send(err);
    })
})

router.delete('/:id',(req,res)=>{
    Kids.findOneAndDelete(req.params.id)
    .then(kid=>{
        res.send(kid);
    })
    .catch(err=>{
        res.send(err).status(400);
    })
})

// const schema = Joi.object({
//     _id:Joi.string(),
//     name:Joi.string().required(),
//     gender:Joi.string().required(),
//     dob:Joi.date().required(),
//     country:Joi.string().required(),
//     description:Joi.string().required()
// });

module.exports = router;