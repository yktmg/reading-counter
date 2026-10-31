import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NewRecordInput, RecordKind } from '../types';
import { isValidDateString, today } from '../utils/date';
import { colors, spacing } from '../theme';
import { KindToggle } from './KindToggle';

type Props = { onSubmit: (input: NewRecordInput) => void };

export function RecordForm({ onSubmit }: Props) {
  const [kind, setKind] = useState<RecordKind>('book');
  const [title, setTitle] = useState('');
  const [finishedOn, setFinishedOn] = useState(today());
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!title.trim()) return setError('タイトルを入力してください');
    if (!isValidDateString(finishedOn)) return setError('日付は 2026-10-31 の形で入力してください');
    onSubmit({ kind, title, finishedOn });
    setTitle('');
    setError(null);
  };

  return (
    <View style={styles.card}>
      <KindToggle value={kind} onChange={setKind} />
      <TextInput
        style={styles.input}
        placeholder={kind === 'book' ? '読んだ本のタイトル' : '観た映画のタイトル'}
        placeholderTextColor={colors.subText}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={submit}
        returnKeyType="done"
      />
      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>読了日</Text>
        <TextInput
          style={[styles.input, styles.dateInput]}
          value={finishedOn}
          onChangeText={setFinishedOn}
          placeholder="YYYY-MM-DD"
          keyboardType="numbers-and-punctuation"
          maxLength={10}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <Pressable accessibilityRole="button" style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>記録する</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  dateLabel: { fontSize: 14, color: colors.subText, flexShrink: 0 },
  dateInput: { flex: 1 },
  error: { color: colors.danger, fontSize: 13 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
