import { Request, Response } from 'express';

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {} = request.body;

      return response.json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UploadCarImageController };
