import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('bdj82tehpzwfuhiz4yku', 'ustsugj44vgi70li', 'keJ9mfLgW07tm592dYUE', {
    host: 'bdj82tehpzwfuhiz4yku-mysql.services.clever-cloud.com',
    port: "3306",
    dialect: "mysql"
});

export async function checkDBConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export async function syncDBConnection() {
    try {
        const result = await sequelize.sync({ alter: false, force: false });
        console.log({ result });
        console.log('Connection has sync established successfully.');
    } catch (error) {
        console.error('Unable to sync to the database:', error);
    }
}



