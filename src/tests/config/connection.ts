import {createConnection, getConnection} from 'typeorm';
import { getORMConfig } from '../../main/config';

const connection = {
  async create(){
    const conn = await createConnection(getORMConfig());
    await conn.synchronize();
  },

  async close(){
    const connection = getConnection();
    await connection.close();
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;