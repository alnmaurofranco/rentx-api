import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImages } from './UploadCarImages';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const images = request.files as IFiles[];

      const images_name = images.map((file) => file.filename);

      const uploadCarImage = container.resolve(UploadCarImages);

      await uploadCarImage.execute({
        car_id: id,
        images_name,
      });

      return response.status(201).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UploadCarImagesController };
