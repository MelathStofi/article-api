import {NextFunction, Request, Response} from "express";
import * as multer from "multer";
import imageFilter from "../helper/imageFilter";
import * as path from "path";
import { getServerDetails } from "../config";
import Err from "../error/Err";

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
            try {
                if (!req.file) {
                    throw new Err("ValidationError", "Please select an image to upload");
                }
                else if (err instanceof multer.MulterError) {
                    throw new Err("ValidationError", err.message);
                }
                else if (err) {
                    throw new Error(err.message);
                }
                else res.send({ imageUrl: getServerDetails().BASE_URL + "/" + path.relative(process.cwd(), req.file.path) })

            } catch (err) {
                next(err);
            }
        });
    }

}