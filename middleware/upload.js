const util = require("util");
const multer = require("multer");
const path = require('path');
const maxSize = 2 * 1024 * 1024;

/* 
  El middleware son funciones que se ejecutan durante el ciclo de vida de una solicitud HTTP 
  y pueden modificar el objeto de solicitud (req), el objeto de respuesta (res), o 
  finalizar la solicitud (por ejemplo, enviando una respuesta al cliente).
*/

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__basedir, '/resources/static/assets/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;