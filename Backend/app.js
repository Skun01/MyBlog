const express = require('express')
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const cors = require('cors');
const passport = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/myblog/', userRouter);
app.use('/myblog/posts', postRouter)

app.listen(process.env.PORT || 5000, ()=>{
    
    console.log('my server is running...', process.env.PORT);
});