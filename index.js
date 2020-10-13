const express = require('express')
const router = express.Router()

//schemas
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VentilatorSchema = new Schema({
    hId: String,
    ventilatorId: String,
    name: String,
    status: String
})

const Ventilator = mongoose.model('Ventilator',VentilatorSchema)

const HospitalSchema = new Schema({
    hId: String,
    name: String,
    contactNo: String,
    address: String
})
const Hospital = mongoose.model('Hospitals',HospitalSchema)


//list of hospitals
router.get('/hospitals',(req,res,next)=>{

    Hospital.find()
    .then((hospital)=>{
        res.send({hospital});
    })
    .catch(next);
    
});

//list of Ventilators
router.get('/ventilators',(req,res,next)=>{

    Ventilator.find()
    .then((ventilator)=>{
        res.send({ventilator});
    })
    .catch(next);
});

//search Ventilators by status and hospital name
router.get('/ventilators/:status/:name',(req,res,next)=>{

    const { status, name } = req.params

    Ventilator.find({status: status,name: name})
    .then((ventilator)=>{
        res.send({ventilator});
    })
    .catch(next);
   
});

//search hospitals by name
router.get('/hospitals/:name',(req,res,next)=>{

    Hospital.find({name:req.params.name})
    .then((hospital)=>{
        res.send({hospital});
    })
    .catch(next);

});

//update Ventilators by id
router.put('/ventilators/:ventid',(req,res,next)=>{

    Ventilator.findOneAndUpdate({ventilatorId:req.params.ventid},req.body)
    .then((vent)=>{
        res.send({vent});
    })
    .catch(next);
    
});

//adding new Hospital
router.post('/hospitals',(req,res,next)=>{

    Hospital.create(req.body)
    .then((hosp)=>{
        res.send({hosp});
    }).catch(next);

});

//adding new ventilators
router.post('/ventilators',(req,res,next)=>{

    Ventilator.create(req.body)
    .then((vent)=>{
        res.send({vent});
    })
    .catch(next);

});

//delete Ventilators by id
router.delete('/ventilators/:ventid',(req,res,next)=>{

    Ventilator.findOneAndRemove({ventilatorId:req.params.ventid})
    .then((vent)=>{
        res.send({vent});
    })
    .catch(next);

});

module.exports = router