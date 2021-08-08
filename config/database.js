const mysql=require('mysql');
let db=mysql.createConnection({
    host:'bitsnivauwjyfh6nm0pb-mysql.services.clever-cloud.com',
    user:'uoipk7ztdxzpbjgr',
    database:'bitsnivauwjyfh6nm0pb',
    password:'Vj9lCvn7M8rjVCHm9YNa',
    port:3306,
    multipleStatements:true
});
db.connect(err=>{
    if(err)
    {
        console.log(`error occured ${err}`);
    }
    else
    {
        console.log('Database connected');
    }
});

module.exports=db;