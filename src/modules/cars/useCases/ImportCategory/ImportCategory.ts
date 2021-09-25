import csvParse from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type ImportCategoryRequest = {
  file: Express.Multer.File;
};

type ImportCategoryResponse = void;

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategory {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async loadCategories({
    file,
  }: ImportCategoryRequest): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // Estamos criando uma stream deste arquivo que é recebido, e passamos por parametro qual caminho vai ser pegado.

      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile); // Pegar todos os pedaços que foram lidos e fazer alguma coisa, isto é a função do PIPE no stream.

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (error) => reject(error));
    });
  }

  async execute({
    file,
  }: ImportCategoryRequest): Promise<ImportCategoryResponse> {
    const categories = await this.loadCategories({ file });

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name
      );

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategory };
