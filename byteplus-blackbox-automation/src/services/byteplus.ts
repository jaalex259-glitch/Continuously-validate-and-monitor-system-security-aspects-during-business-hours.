// src/services/byteplus.ts

import axios, { AxiosInstance } from 'axios';
import { BytePlusConfig, ChatMessage, ChatResponse, ServiceResponse } from '../types';
import { logger } from '../utils/logger';

export class BytePlusService {
  private client: AxiosInstance;
  private config: BytePlusConfig;

  constructor(config: BytePlusConfig) {
    this.config = config;
    
    this.client = axios.create({
      baseURL: config.endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      timeout: config.timeout
    });

    logger.info('BytePlus service initialized', { 
      endpoint: config.endpoint,
      model: config.model 
    });
  }

  async chat(prompt: string, systemPrompt?: string): Promise<ServiceResponse<string>> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: prompt });

    try {
      logger.debug('Sending chat request to BytePlus', { 
        messageCount: messages.length,
        promptLength: prompt.length 
      });

      const response = await this.client.post('', {
        model: this.config.model || 'default-model',
        messages,
        temperature: 0.7,
        max_tokens: 2048
      });

      const data = response.data as ChatResponse;
      const content = data.choices[0]?.message?.content || '';

      logger.success('BytePlus response received', {
        tokensUsed: data.usage?.total_tokens,
        finishReason: data.choices[0]?.finish_reason
      });

      return {
        success: true,
        data: content,
        timestamp: Date.now()
      };

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      
      logger.error('BytePlus API request failed', {
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

  async chatWithHistory(
    messages: ChatMessage[]
  ): Promise<ServiceResponse<string>> {
    try {
      logger.debug('Sending chat with history to BytePlus', {
        messageCount: messages.length
      });

      const response = await this.client.post('', {
        model: this.config.model || 'default-model',
        messages,
        temperature: 0.7,
        max_tokens: 2048
      });

      const data = response.data as ChatResponse;
      const content = data.choices[0]?.message?.content || '';

      logger.success('BytePlus response received', {
        tokensUsed: data.usage?.total_tokens
      });

      return {
        success: true,
        data: content,
        timestamp: Date.now()
      };

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      
      logger.error('BytePlus API request failed', {
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

  async generateCode(prompt: string, language?: string): Promise<ServiceResponse<string>> {
    const systemPrompt = language 
      ? `You are an expert ${language} developer. Generate clean, efficient, and well-commented code.`
      : 'You are an expert software developer. Generate clean, efficient, and well-commented code.';

    return this.chat(prompt, systemPrompt);
  }
}
