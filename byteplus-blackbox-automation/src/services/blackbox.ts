// src/services/blackbox.ts

import axios, { AxiosInstance } from 'axios';
import { BlackBoxConfig, ServiceResponse } from '../types';
import { logger } from '../utils/logger';

export class BlackBoxService {
  private client: AxiosInstance;
  private config: BlackBoxConfig;

  constructor(config: BlackBoxConfig) {
    this.config = config;
    
    this.client = axios.create({
      baseURL: 'https://www.blackbox.ai/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      timeout: config.timeout
    });

    logger.info('BlackBox service initialized');
  }

  async query(prompt: string): Promise<ServiceResponse<string>> {
    try {
      logger.debug('Sending query to BlackBox', { 
        promptLength: prompt.length 
      });

      const response = await this.client.post('/chat', {
        message: prompt,
        stream: false
      });

      const content = typeof response.data === 'string' 
        ? response.data 
        : response.data?.message || JSON.stringify(response.data);

      logger.success('BlackBox response received');

      return {
        success: true,
        data: content,
        timestamp: Date.now()
      };

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      
      logger.error('BlackBox API request failed', {
        status: error.response?.status,
        message: errorMessage
      });

      return {
        success: false,
        error: errorMessage,
        timestamp: Date.now()
      };
    }
  }

  async validate(content: string, criteria?: string): Promise<ServiceResponse<boolean>> {
    const validationPrompt = criteria
      ? `Validate the following content based on these criteria: ${criteria}\n\nContent:\n${content}`
      : `Review and validate the following content for accuracy and quality:\n${content}`;

    try {
      const response = await this.query(validationPrompt);
      
      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error,
          timestamp: Date.now()
        };
      }

      // Simple heuristic: check for positive validation keywords
      const positiveKeywords = ['valid', 'correct', 'accurate', 'good', 'excellent', '✓', '✅'];
      const isValid = positiveKeywords.some(keyword => 
        response.data!.toLowerCase().includes(keyword)
      );

      logger.info('Validation complete', { isValid });

      return {
        success: true,
        data: isValid,
        timestamp: Date.now()
      };

    } catch (error: any) {
      logger.error('Validation failed', error);
      
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  async generateCode(prompt: string, language?: string): Promise<ServiceResponse<string>> {
    const enhancedPrompt = language
      ? `Generate ${language} code for: ${prompt}. Provide only the code with minimal explanation.`
      : `Generate code for: ${prompt}. Provide only the code with minimal explanation.`;

    return this.query(enhancedPrompt);
  }

  async explainCode(code: string, language?: string): Promise<ServiceResponse<string>> {
    const prompt = language
      ? `Explain this ${language} code step by step:\n\`\`\`${language}\n${code}\n\`\`\``
      : `Explain this code step by step:\n\`\`\`\n${code}\n\`\`\``;

    return this.query(prompt);
  }
}
