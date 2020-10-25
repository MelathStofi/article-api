
import { Request } from "express";
import { FileFilterCallback } from "multer";

const imageFilter = function(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        
        return cb(null, false);
    }
    cb(null, true);
};
export default imageFilter;