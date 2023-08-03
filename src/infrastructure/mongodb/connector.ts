import { Logger } from '@infra/logger';
import mongoose, { Mongoose } from 'mongoose';

let mongodbClient: Mongoose;
Logger.init();
const logger = Logger.createLogger();

export async function initializeMongoDB(): Promise<void> {
  const mongoHost = process.env.MONGODB_HOST || 'localhost';
  const mongoPort = process.env.MONGODB_PORT || '27017';
  const mongoUser = process.env.MONGODB_USER || '';
  const mongoPwd = process.env.MONGODB_PASSWORD;
  const mongoDb = process.env.MONGODB_DB || 'alvstech';
  const params = 'authMechanism=SCRAM-SHA-256&connectTimeoutMS=10000&authSource=admin';
  mongodbClient = await mongoose.connect(
    `mongodb://${mongoUser}:${mongoPwd}@${mongoHost}:${mongoPort}/${mongoDb}?${params}`
  );
  logger.info('MongoDB connection has been established.');
}

export function getMongoDBClient(): Mongoose {
  return mongodbClient;
}
