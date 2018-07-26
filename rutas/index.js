express = require('express')
router = express.Router();
var Plantas = require('../modelos/plantas')

router.get('/', (req,res)=>{
    res.render('index')
})
router.post('/', (req,res)=>{
    var n_plantas= new Plantas({
        Titulo:req.body.vegetal,
        Descipcion:req.body.descripcion,
        Pasos: req.body.pasos
    })
    n_plantas.save((error, listo)=>{
        res.render('index', {success_msg:'Listo'})
    })
})

router.post('/data-planta', (req,res)=>{
    console.log('llega')
    Plantas.find().where({Titulo: req.body.nombre}).exec((error, plantas)=>{
        res.send(plantas)
    })
})
router.get('/registros', (req,res)=>{
    Plantas.find((error, plantas)=>{
        res.render('registros', {plantas: plantas})
    })
})

module.exports = router;