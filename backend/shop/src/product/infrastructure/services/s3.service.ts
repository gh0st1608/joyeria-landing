import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // Importa el cliente y los comandos de S3
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

  // Función para subir archivos a S3
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadParams = {
      Bucket: this.bucketName, // Nombre del bucket S3
      Key: `${Date.now()}-${file.originalname}`, // Nombre del archivo (puedes personalizarlo si lo deseas)
      Body: file.buffer, // Contenido del archivo
      ContentType: file.mimetype, // Tipo de contenido del archivo
    };
    console.log('uploadFile',uploadParams)
    try {
      // Ejecuta el comando de carga de archivo
      const command = new PutObjectCommand(uploadParams);
      const response = await this.s3Client.send(command);
      console.log("Archivo subido a S3:", response);
      
      // Retorna la URL del archivo subido
      return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    } catch (error) {
      console.error("Error subiendo el archivo a S3:", error);
      throw new Error("Error subiendo el archivo a S3");
    }
  }
}
