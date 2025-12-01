import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import FoodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app config
const app = express();
const port =process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api routes endpoints
app.use('/api/food', FoodRouter);
app.use('/images', express.static('uploads'));   //make the upload folder publically available
app.use('/api/user',userRouter);
 app.use('/api/cart',cartRouter);
 app.use('/api/order',orderRouter);
app.get('/', (req, res) => {
    res.status(200).send('API working!')
});

//listen
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));


//gnigGBI7iWCKgAQ6
//tamalkumarkhan006_db_user
//mongodb+srv://tamalkumarkhan006_db_user:gnigGBI7iWCKgAQ6@cluster0.pswxhtz.mongodb.net/?appName=Cluster0