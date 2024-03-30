import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationUrl;
        if (req.body.type == 'profile') {
            destinationUrl = `./static/profile/${req.params.uid}`;
        } else if (req.body.type == 'product') {
            destinationUrl = `./static/products/${req.params.uid}`;
        } else if (req.body.type == 'document') {
            destinationUrl = `./static/documents/${req.params.uid}`;
        }else{
            throw new Error('the files type are document, product or profile')
        }

        fs.mkdir(destinationUrl, { recursive: true }, (err) => {
            if (err) {
                console.error('Error al crear el directorio:', err);
                cb(err);
            } else {
                cb(null, destinationUrl);
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

export const upload = multer({ storage: storage });
