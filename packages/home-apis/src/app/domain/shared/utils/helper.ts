export class InvalidFileProvided extends Error { }

export const ALLOWED_MIMETYPES = [
  'application/pdf', //pdf
  'application/msword', //doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
];

export const csvFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    req.fileValidationError = 'Only csv files are allowed!';
    callback(null, false);
  }
  callback(null, true);
};
export const pdfFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(pdf)$/i)) {
    req.fileValidationError = 'Only pdf document files are allowed![*.pdf]';
    callback(null, false);
  }
  callback(null, true);
};
export const FileFilter = (req: any, file: any, callback: any) => {
  if (ALLOWED_MIMETYPES.indexOf(file.mimetype) === -1) {
    req.fileValidationError = 'Only pdf/docs document files are allowed![*.pdf/.docs]';
    callback(null, false);
  }
  callback(null, true);
};
