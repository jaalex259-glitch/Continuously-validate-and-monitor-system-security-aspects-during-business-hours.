// src/types/index.ts

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
}

export interface Choice {
  index: number;
  message: ChatMessage;
  finish_reason: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface BytePlusConfig {
  apiKey: string;
  endpoint: string;
  model?: string;
  timeout?: number;
}

export interface BlackBoxConfig {
  apiKey: string;
  timeout?: number;
}

export interface LoggerOptions {
  level?: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}
