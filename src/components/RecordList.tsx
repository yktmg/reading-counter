import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { KIND_LABEL, type ReadingRecord } from '../types';
import { colors, spacing } from '../theme';

type Props = {
  records: ReadingRecord[];
  onDelete: (id: string) => void;
  header?: React.ReactElement;
};

function confirmDelete(record: ReadingRecord, onDelete: (id: string) => void) {
  const message = `「${record.title}」を削除しますか？`;
  if (Platform.OS === 'web') {
    // ブラウザでは Alert のボタンが使えないので confirm を使う
    if (window.confirm(message)) onDelete(record.id);
    return;
  }
  Alert.alert('記録の削除', message, [
    { text: 'キャンセル', style: 'cancel' },
    { text: '削除', style: 'destructive', onPress: () => onDelete(record.id) },
  ]);
}

export function RecordList({ records, onDelete, header }: Props) {
  return (
    <FlatList
      data={records}
      keyExtractor={(r) => r.id}
      ListHeaderComponent={header ? <View style={styles.header}>{header}</View> : undefined}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      ListEmptyComponent={
        <Text style={styles.empty}>まだ記録がありません。最初の1冊（1本）を登録してみましょう。</Text>
      }
      renderItem={({ item }) => (
        <Pressable
          onLongPress={() => confirmDelete(item, onDelete)}
          style={styles.row}
          accessibilityHint="長押しで削除"
        >
          <View style={[styles.badge, { backgroundColor: colors[item.kind] }]}>
            <Text style={styles.badgeText}>{KIND_LABEL[item.kind]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.date}>{item.finishedOn.replaceAll('-', '/')}</Text>
          </View>
          <Pressable
            onPress={() => confirmDelete(item, onDelete)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}を削除`}
          >
            <Text style={styles.delete}>削除</Text>
          </Pressable>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 48 },
  header: { marginBottom: spacing.lg },
  empty: { color: colors.subText, textAlign: 'center', marginTop: spacing.xl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: { borderRadius: 6, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  title: { fontSize: 16, color: colors.text },
  date: { fontSize: 12, color: colors.subText, marginTop: 2 },
  delete: { color: colors.subText, fontSize: 13 },
});
