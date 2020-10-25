import {NextFunction, Request, Response} from "express";
import * as multer from "multer";
import imageFilter from "../helper/imageFilter";
import * as path from "path";
import { getServerDetails } from "../config";

export default class ImageController {

    uploadImage(req: Request, res: Response, next: NextFunction) {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'static/uploads/');
            },
        
            filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        const upload = multer({ storage: storage, fileFilter: imageFilter }).single('image');

        upload(req, res, function(err: any) {
            if (!req.file) {
                res.status(400).send('Please select an image to upload')
            }
            else if (err instanceof multer.MulterError) {
                res.status(400).send(err.message);
            }
            else if (err) {
                res.status(500).send(err.message);
            }
            else res.send({ imageUrl: getServerDetails().BASE_URL + "/" + path.relative(process.cwd(), req.file.path) })
        });
    }

}