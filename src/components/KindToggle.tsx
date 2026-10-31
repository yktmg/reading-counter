import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KIND_LABEL, type RecordKind } from '../types';
import { colors, spacing } from '../theme';

type Props = { value: RecordKind; onChange: (kind: RecordKind) => void };

export function KindToggle({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {(['book', 'movie'] as const).map((kind) => {
        const selected = kind === value;
        return (
          <Pressable
            key={kind}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(kind)}
            style={[styles.chip, selected && { backgroundColor: colors[kind], borderColor: colors[kind] }]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{KIND_LABEL[kind]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  label: { fontSize: 15, color: colors.text },
  labelSelected: { color: '#fff', fontWeight: '600' },
});
