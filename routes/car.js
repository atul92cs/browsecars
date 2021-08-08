let db=require('../config/database');
let express=require('express');
let multer=require('multer');
let router=express.Router();
let cloudinary=require('cloudinary');
let storage=multer.diskStorage({
    filename:(req,file,callback)=>{
        callback(null,Date.now()+file.originalname);
    }
});
let upload=multer({storage:storage});
cloudinary.config({
    cloud_name:'dkhk4gyey',
    api_key:'459656749761335',
    api_secret:'AS_y6ZzH7FAjeoIxF1IjtMFKzQg'
    });
router.post('/add',upload.single('picture'),(req,res)=>{
    let {name,company,status}=req.body;
    cloudinary.v2.uploader.upload(req.file.path).then((image)=>{
        let sql='insert into car set ?';
        let body={name:name,company:company,status:status,picture:image.secure_url};
        db.query(sql,body,(err,result)=>{
            if(!err)
            {
                res.status(200).json({
                    msg:'car created'
                });
            }
            else
            {
                res.status(401).json({
                    msg:'error occured',
                    error:err
                });
            }
        });
    }).catch(ex=>{
        res.status(402).json({
            msg:'error occured',
            error:ex
        });
    });
});
router.delete('/:id',(req,res)=>{
    let {id}=req.params;
    let params=[id];
    let sql='delete from car where id=?';
    db.query(sql,params,(err,result)=>{
        if(err)
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
        else
        {
            res.status(200).json({
                msg:'car deleted'
            });
        }
    });
});
router.get('/',(req,res)=>{
    let sql='select car.name as name ,company.name as company,car.status as status,car.picture as picture from car join company on car.company=company.id';
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
        else
        {
            res.status(200).json({
                companies:result
            });
        }
    });
});
router.get('/:id',(req,res)=>{
    let {id}=req.params;
    let sql='select car.name as name ,company.name as company,car.status as status,car.picture as picture from car join company on car.company=company.id where car.id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(err)
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
        else
        {
            res.status(200).json({
                companies:result
            });
        }
    });
});
router.get('/com/:id',(req,res)=>{
    let {id}=req.params;
    let sql='select car.name as name ,company.name as company,car.status as status,car.picture as picture from car join company on car.company=company.id where car.company=?'
    let param=[id];
    db.query(sql,param,(err,result)=>{
        if(err)
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
        else
        {
            res.status(200).json({
                cars:result
            });
        }
    });
});
router.put('/:id',(req,res)=>{
    let {id}=req.params;
    let {name,origin,found}=req.body;
    let sql='update company set name=?,origin=?,found=? where id=?';
    let params=[name,origin,found,id];
    db.query(sql,params,(err,result)=>{
        if(err)
            {
                res.status(401).json({
                    msg:'error occured',
                    error:err
                });
            }
        else
            {
                res.status(200).json({
                    msg:'company updated'
                });
            }
    });
});
module.exports=router;