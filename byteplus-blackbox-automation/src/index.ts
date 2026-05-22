// src/index.ts

import dotenv from 'dotenv';
import { BytePlusService } from './services/byteplus';
import { BlackBoxService } from './services/blackbox';
import { config } from './utils/config';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

async function main() {
  try {
    logger.info('🚀 Starting BytePlus BlackBox Automation...');
    
    // Validate environment configuration
    if (!config.validateEnvironment()) {
      logger.error('Environment validation failed. Please check your .env file.');
      process.exit(1);
    }

    // Initialize services
    const byteplusConfig = config.getBytePlusConfig();
    const blackboxConfig = config.getBlackBoxConfig();
    
    const byteplus = new BytePlusService(byteplusConfig);
    const blackbox = new BlackBoxService(blackboxConfig);
    
    logger.info('✅ Services initialized successfully');
    
    // Example workflow: Generate test cases
    const prompt = "Generate test cases for login functionality";
    logger.info('📝 Sending prompt to BytePlus', { prompt });
    
    const response = await byteplus.chat(prompt);
    
    if (response.success && response.data) {
      logger.success('✅ BytePlus response received', { 
        dataLength: response.data.length 
      });
      
      // Optional: Forward to BlackBox for validation
      logger.info('🔍 Validating response with BlackBox...');
      const validation = await blackbox.validate(response.data);
      
      if (validation.success) {
        logger.success('🎯 Validation complete', { isValid: validation.data });
      } else {
        logger.warn('⚠️ Validation encountered an issue', { error: validation.error });
      }
      
      // Display the generated content
      console.log('\n' + '='.repeat(60));
      console.log('📄 GENERATED CONTENT:');
      console.log('='.repeat(60));
      console.log(response.data);
      console.log('='.repeat(60) + '\n');
      
    } else {
      logger.error('❌ BytePlus request failed', { error: response.error });
    }
    
    logger.info('🏁 Automation workflow completed');
    
  } catch (error: any) {
    logger.error('❌ Execution failed', error);
    process.exit(1);
  }
}

// Run the main function
main();
