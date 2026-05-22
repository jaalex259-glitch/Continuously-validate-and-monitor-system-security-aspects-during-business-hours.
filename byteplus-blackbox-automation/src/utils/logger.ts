// src/utils/logger.ts

import { LoggerOptions } from '../types';

export class Logger {
  private level: string;
  private prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.prefix = options.prefix || '🤖';
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  private formatMessage(message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    let formatted = `[${timestamp}] ${this.prefix} ${message}`;
    
    if (data !== undefined) {
      formatted += '\n' + JSON.stringify(data, null, 2);
    }
    
    return formatted;
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage(`🐛 ${message}`, data));
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage(`ℹ️ ${message}`, data));
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage(`⚠️ ${message}`, data));
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage(`❌ ${message}`, error));
    }
  }

  success(message: string, data?: any): void {
    console.log(this.formatMessage(`✅ ${message}`, data));
  }
}

// Export singleton instance
export const logger = new Logger({
  level: process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error' || 'info',
  prefix: '🤖 BytePlus-BlackBox'
});
