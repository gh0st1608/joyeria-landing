// file-upload.interceptor.ts
import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { S3Service } from './s3.service';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private readonly s3Service: S3Service) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Usamos el FileInterceptor con la configuración de multer-s3 que tenemos en el servicio
    const request = context.switchToHttp().getRequest();
    const upload = this.s3Service.getMulterS3Config().single('file'); // Configuración de multer-s3

    return new Observable(observer => {
      upload(request, request.res, (error: any) => {
        if (error) {
          // Si ocurre un error durante la carga del archivo, lo manejamos aquí
          return observer.error(error);
        }
        // Si no hay error, pasamos el control al siguiente interceptor o controlador
        return next.handle().subscribe(observer);
      });
    });
  }
}
