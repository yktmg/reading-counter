// 記録の一覧・追加・削除をまとめたフック。画面はこれを呼ぶだけ。
import { useCallback, useEffect, useState } from 'react';
import type { NewRecordInput, ReadingRecord } from '../types';
import { asyncStorageRepository, type RecordsRepository } from '../storage/recordsRepository';

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function sortNewestFirst(records: ReadingRecord[]): ReadingRecord[] {
  return [...records].sort((a, b) =>
    a.finishedOn === b.finishedOn
      ? b.createdAt.localeCompare(a.createdAt)
      : b.finishedOn.localeCompare(a.finishedOn),
  );
}

export function useRecords(repo: RecordsRepository = asyncStorageRepository) {
  const [records, setRecords] = useState<ReadingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repo.loadAll().then((loaded) => {
      setRecords(sortNewestFirst(loaded));
      setLoading(false);
    });
  }, [repo]);

  const persist = useCallback(
    (next: ReadingRecord[]) => {
      const sorted = sortNewestFirst(next);
      setRecords(sorted);
      repo.saveAll(sorted);
    },
    [repo],
  );

  const addRecord = useCallback(
    (input: NewRecordInput) => {
      const record: ReadingRecord = {
        ...input,
        title: input.title.trim(),
        id: newId(),
        createdAt: new Date().toISOString(),
      };
      persist([record, ...records]);
    },
    [records, persist],
  );

  const removeRecord = useCallback(
    (id: string) => persist(records.filter((r) => r.id !== id)),
    [records, persist],
  );

  return { records, loading, addRecord, removeRecord };
}
