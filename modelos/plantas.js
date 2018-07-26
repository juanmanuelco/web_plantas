//Es necesario siempre hacer referencia al API de mongodb
mongoose = require('mongoose');

//Se crea el esquema necesario_______________________________________________________________________________________________________________
var plantaSchema = mongoose.Schema({
    Titulo:String,
    Descipcion:String,
    Pasos: String
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var planta=module.exports=mongoose.model('planta',plantaSchema);
