// src/utils/config.ts

import dotenv from 'dotenv';
import { BytePlusConfig, BlackBoxConfig } from '../types';
import { logger } from './logger';

dotenv.config();

export class ConfigLoader {
  private static instance: ConfigLoader;

  private constructor() {}

  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  getBytePlusConfig(): BytePlusConfig {
    const apiKey = process.env.BYTEPLUS_API_KEY;
    const endpoint = process.env.BYTEPLUS_ENDPOINT;

    if (!apiKey) {
      throw new Error('BYTEPLUS_API_KEY environment variable is not set');
    }

    if (!endpoint) {
      throw new Error('BYTEPLUS_ENDPOINT environment variable is not set');
    }

    return {
      apiKey,
      endpoint,
      model: process.env.BYTEPLUS_MODEL || 'default-model',
      timeout: parseInt(process.env.REQUEST_TIMEOUT || '30000', 10)
    };
  }

  getBlackBoxConfig(): BlackBoxConfig {
    const apiKey = process.env.BLACKBOX_API_KEY;

    if (!apiKey) {
      throw new Error('BLACKBOX_API_KEY environment variable is not set');
    }

    return {
      apiKey,
      timeout: parseInt(process.env.REQUEST_TIMEOUT || '30000', 10)
    };
  }

  validateEnvironment(): boolean {
    const requiredVars = ['BYTEPLUS_API_KEY', 'BYTEPLUS_ENDPOINT', 'BLACKBOX_API_KEY'];
    const missing = requiredVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
      logger.error('Missing required environment variables', { missing });
      return false;
    }

    logger.debug('All environment variables validated successfully');
    return true;
  }
}

export const config = ConfigLoader.getInstance();
