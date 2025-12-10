import app from './app.js';  
import dotenv from 'dotenv'
import connectDB from './db/connectdb.js';

dotenv.config()
connectDB();

app.listen(3000, () => {  
  console.log('Server running at port  3000');
});  