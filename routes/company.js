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
    let {name,origin,found}=req.body;
    cloudinary.v2.uploader.upload(req.file.path).then((image)=>{
        let sql='insert into company set ?';
        let body={name:name,origin:origin,found:found,picture:image.secure_url};
        db.query(sql,body,(err,result)=>{
            if(!err)
            {
                res.status(200).json({
                    msg:'company created'
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
    let sql='delete from company where id=?';
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
                msg:'company deleted'
            });
        }
    });
});
router.get('/',(req,res)=>{
    let sql='select * from company';
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