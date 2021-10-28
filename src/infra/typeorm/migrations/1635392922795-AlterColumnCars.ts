import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnCars1635392922795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cars',
      'avaliable',
      new TableColumn({
        name: 'available',
        type: 'boolean',
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cars', 'available');
  }
}
