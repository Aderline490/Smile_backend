const express = require('express');
const Kids = require('../models/kidsModel');
const Joi = require('joi');
const { response } = require('express');
const router = express.Router();
const Joi = require('joi');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(new Error('message'),false)
    }
}
const upload = multer({
    storage:storage,
    limits:{
    fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
});
const Kid = require('../models/kidsModel');

router.get('/',(req,res)=>{
    Kid.find({},(err,kids)=>{
        if(err){    
            res.status(500).json({errmsg:err});
        }
        res.status(200).json({msg:kids})
    });
});

router.get('/:id',(req,res)=>{
    Kid.find(req.params.id)
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
    Kid.find({
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

router.post('/registerKid', upload.single('image'), (req,res)=>{
    // const result = schema.validate(req.body);
    // if(result.error){
    //         res.status(404).send(result.error.details[0].message);
    //         return;
    // }
    console.log(req.file);
    const newKid = new Kid({
        name: req.body.name,
        gender:req.body.gender,
        dob:req.body.dob,
        country:req.body.country,
        description:req.body.description,
        image: req.file.path
    })
    console.log( "new Kid: "+ newKid);
    newKid.save()
    .then(kidSaved=>{
        console.log("kid Saved:" +kidSaved);
        res.send(kidSaved).status(201);
    })
    .catch((error) =>{
        console.log("posting failed! ");
        res.send(error).status(404);
    })
})

// router.post('/update',(req,res)=>{
    // const result = schema.validate(req.body)
    // if(result.error){
    //     res.status(404).send(result.error.details[0].message);
    //     return;
    // }
//     Kids.updateOne({_id:req.body._id}, {
//         name:req.body.name,
//         gender:req.body.gender,
//         country:req.body.country,
//         description:req.body.description,
//         dob:req.body.dob
//     })
//     .then(kidUpdated=>{
//         console.log(req.body._id);
//         console.log(kidUpdated);
//         res.status(201).send(kidUpdated);
//     })
//     .catch(err=>{
//         res.status(400).send(err);
//     })
// })
// router.put('/update', (req,res)=>{
    // Kids.findById(req.body._id,(err,kid)=>{
    //     if(err){
    //         res.status(500).json({errmsg:err});
    //     }
    // Kids.findOneAndUpdate({_id:req.body._id}, req.body, {new:true})
    // .then(kidUpdated=>{
    //     res.status(201).send(kidUpdated);
    // })
    // .catch(err=>{
    //     res.status(400).send(err);
    // })
        // kid.name = req.body.name
        // kid.gender = req.body.gender
        // kid.dob = req.body.dob
        // kid.country = req.body.country
        // kid.description = req.body.description
        // kid.save((err,kid)=>{
        //     if(err){
        //         res.status(500).json({errmsg:err});
        //     }
        //     res.status(200).json({msg:kid});
        // });
    // });
// });
router.put('/update',(req, res, next)=>{
    Kid.findById(req.body._id,(err,kid)=>{
     if(err){
         res.status(500).json({errmsg:err});
     }
     console.log(kid);
     kid.name = req.body.name
     kid.gender = req.body.gender
     kid.country = req.body.country
     kid.dob= req.body.dob
     kid.description= req.body.description
     kid.save((err,kid)=>{
         if(err){
             res.status(500).json({errmsg:err});
         }
         res.status(200).json({msg:kid});
     });
    })
 });
router.delete('/:id',(req,res)=>{
    Kid.findOneAndDelete(req.params.id)
    .then(kid=>{
        res.send(kid);
    })
    .catch(err =>{
        res.send(err).status(400);
    })
})

const schema = Joi.object({
    _id:Joi.string(),
    name:Joi.string().required(),
    gender:Joi.string().required(),
    dob:Joi.date().required(),
    country:Joi.string().required(),
    description:Joi.string().required()
});

module.exports = router;