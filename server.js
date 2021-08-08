let company=require('./routes/car');
let car=require('./routes/car')
let express=require('express');
let app=express();
let port=process.env.PORT||8080;
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
app.use('/',car);
app.use('/genre',company);

app.listen(port,()=>{
    console.log('server started on'+port);
});