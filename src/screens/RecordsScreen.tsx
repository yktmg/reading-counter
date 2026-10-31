import type { NewRecordInput, ReadingRecord } from '../types';
import { RecordForm } from '../components/RecordForm';
import { RecordList } from '../components/RecordList';

type Props = {
  records: ReadingRecord[];
  onAdd: (input: NewRecordInput) => void;
  onDelete: (id: string) => void;
};

export function RecordsScreen({ records, onAdd, onDelete }: Props) {
  return <RecordList records={records} onDelete={onDelete} header={<RecordForm onSubmit={onAdd} />} />;
}
