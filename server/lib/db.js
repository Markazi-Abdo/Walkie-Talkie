import mongoose from 'mongoose'
import { dbLogger } from '../logs/functions/db.log.js'

export const connectToDatabase = async (uri)=>{
    try {
        await mongoose.connect(uri);
        dbLogger.info('Coonected to Database')
    } catch (error) {
        dbLogger.info('Failed to connect to Database');
        process.exit(1);
    }
}