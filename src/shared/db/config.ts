import * as dotenv from 'dotenv';

//Use environment variables to configure the database connection
dotenv.config();

export const DATA_BASE_CONFIG = {
  type: 'postgres' as any,
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT) as number,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
  autoLoadEntities: true,
  synchronize: true,
};
