const storage = multer.diskStorage({
  destination: (req, res, c) => {
    c(null, "./uploads");
  },
  filename: (req, res, c) => {
    const filename = `pdf-${Data.now()}-${file.originalname}`;
    c(null, filename);
  },
});

const fileFilter=(req,file,c)=>
{
    if(file.mimetype==='pdf/pdf')
    {
        c(null,true)
    }
    else
    {
        c(null,false)
        return c(new Error('Only Upload PDF files...')))
    }
}

const multerConfig=multer({
    storage,fileFilter
})
