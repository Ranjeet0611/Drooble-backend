const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const indexRoute = require('./routes/index');
const userRouter = require('./routes/user');
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});
// app.use('/',indexRoute);
app.use('/auth',authRoutes);
app.use('/auth/me',userRouter);
app.use((error,req,res,next) => {
    console.log(error);
    const status = error.status || 500;
    const message =error.message
    res.status(status).json({message:message});
})
mongoose.connect('mongodb+srv://Ranjeet0611:hLxL2j2f9Tvud4ap@cluster0.rspqn.mongodb.net/Drooble?retryWrites=true&w=majority')
.then(result=>{
    app.listen(process.env.PORT || 8080);
}).
catch(err => console.log(err));


