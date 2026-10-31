// 記録の保存・読み込み。
// 画面からは RecordsRepository（インターフェース）だけを使うので、
// 将来 SQLite やクラウド（DynamoDB など）に変えるときはこのファイルを差し替えるだけで済む。
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReadingRecord } from '../types';

export interface RecordsRepository {
  loadAll(): Promise<ReadingRecord[]>;
  saveAll(records: ReadingRecord[]): Promise<void>;
}

const STORAGE_KEY = 'reading-counter/records/v1';

export const asyncStorageRepository: RecordsRepository = {
  async loadAll() {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? (parsed as ReadingRecord[]) : [];
    } catch {
      return [];
    }
  },
  async saveAll(records) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  },
};
