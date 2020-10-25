import {NextFunction, Request, Response} from "express";
import { getRepository } from "typeorm";
import { Image } from "../entity/Image";
import * as multer from "multer";
import imageFilter from "../helper/imageFilter";
import * as path from "path";
import { getServerDetails } from "../config";


export default class ImageController {

    private repository = getRepository(Image);

    async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            // const storage = multer.diskStorage({
            //     destination: function(req, file, cb) {
            //         cb(null, 'uploads/');
            //     },
            
            //     // By default, multer removes file extensions so let's add them back
            //     filename: function(req, file, cb) {
            //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            //     }
            // });

            const upload = multer({ dest: "static/uploads/" }).single('image');

            upload(req, res, function(err: any) {
                if (!req.file) {
                    throw new Error('Please select an image to upload');
                }
                else if (err instanceof multer.MulterError) {
                    throw err;
                }
                else if (err) {
                    throw err;
                }
                
                res.send({ imageUrl: getServerDetails().BASE_URL + "/" + path.relative(process.cwd(), req.file.path) })
            });

        } catch (err) {
            
            next(err);
        }
    }

    async getImage(req: Request, res: Response, next: NextFunction) {
        
    }

}