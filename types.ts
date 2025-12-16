export interface ProcessedImage {
  data: string; // Base64 string
  mimeType: string;
}

export enum AppMode {
  ACTION_SWAP = 'action_swap',
  GENERAL_EDIT = 'general_edit',
}

export interface HistoryItem {
  id: string;
  thumbnail: string;
  timestamp: number;
}