// アプリ全体で使う型の定義

export type RecordKind = 'book' | 'movie';

export type ReadingRecord = {
  id: string;
  kind: RecordKind;
  title: string;
  /** 読み終えた/観終えた日（YYYY-MM-DD） */
  finishedOn: string;
  /** 登録した日時（ISO文字列） */
  createdAt: string;
};

export type NewRecordInput = Pick<ReadingRecord, 'kind' | 'title' | 'finishedOn'>;

export const KIND_LABEL: Record<RecordKind, string> = {
  book: '本',
  movie: '映画',
};
