type UploadCarImageRequest = {};

type UploadCarImageResponse = void;

class UploadCarImage {
  constructor(private carsImageRepository: ICarsImageRepository) {}

  async execute({}: UploadCarImageRequest): Promise<UploadCarImageResponse> {}
}

export { UploadCarImage };
