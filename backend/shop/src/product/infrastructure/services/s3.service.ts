import { Injectable } from '@nestjs/common';
import multer from 'multer'; // Importar correctamente multer
import multerS3 from 'multer-s3'; // Importar multer-s3
import { S3Client } from '@aws-sdk/client-s3'; // Importar el cliente de S3
import { config } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
config();

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    // Crear instancia del cliente de S3
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME; // Nombre del bucket
  }

  // Función para obtener la configuración de multer-s3
  getMulterS3Config() {
    // Configuración de multer usando multer-s3
    return multer({
      storage: multerS3({
        s3: this.s3Client, // Cliente S3
        bucket: this.bucketName, // Nombre del bucket
        //acl: 'public-read', // Define permisos de acceso al archivo (puedes modificarlo según tu necesidad)
        key: (req, file, cb) => {
          // Define la clave (nombre del archivo) en el bucket S3
          cb(null, `uploads/${Date.now()}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg']; // Tipos permitidos
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true); // El archivo es válido
        } else {
          cb(null, false); // El archivo no es válido
        }
      },
    });
  }

}
