import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'pos_db',
    process.env.DB_USER || 'fresa',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

// export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true, // Render generalmente requiere SSL
//             rejectUnauthorized: false, // Permite certificados autofirmados
//         },
//     },
// });