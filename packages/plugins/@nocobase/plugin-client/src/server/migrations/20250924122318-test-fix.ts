import { Migration } from '@nocobase/server';
import { resolve } from 'path';

export default class extends Migration {
  on = 'afterLoad'; // 'beforeLoad' or 'afterLoad'
  appVersion = '<1.9.0';

  async up() {
    await this.db.import({
      directory: resolve(__dirname, '../collections'),
    });

    await this.db.import({
      directory: resolve(__dirname, '../pages'),
      }
}
