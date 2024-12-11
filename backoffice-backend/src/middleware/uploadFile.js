import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { OpagoArchivos } from "../db/index.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adjuntosPath = path.join(__dirname, '../', 'archivos', 'adjuntos');

export const FILES_PATH = adjuntosPath 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, adjuntosPath + "/");
    },
    filename: async function (req, file, cb) {
        const orderId = await OpagoArchivos.max("Id");
        const newId = orderId +1
        const splitted = file.originalname.split(".")
        const extension = splitted[splitted.length-1]
        cb(null, `OP${newId}.${extension}`);
    }
});

const fileFilter = (req, file, cb) => {
    // Acepta PDF y archivos de imagen
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no soportado. Solo se permiten PDF e imágenes.'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB límite
    }
}); 