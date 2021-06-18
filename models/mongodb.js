const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Smile',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=>{
    console.log('Connected to DB!');
})
.catch(err=>{
    console.log(err);
})

require('./kidsModel');