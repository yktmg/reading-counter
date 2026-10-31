import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ReadingRecord } from '../types';
import { countByMonth, totals } from '../utils/stats';
import { MonthlyBarChart } from '../components/MonthlyBarChart';
import { RecommendationCard } from '../components/RecommendationCard';
import { colors, spacing } from '../theme';

const MONTHS = 6;

export function StatsScreen({ records }: { records: ReadingRecord[] }) {
  const monthly = useMemo(() => countByMonth(records, MONTHS), [records]);
  const all = useMemo(() => totals(records), [records]);
  const thisMonth = monthly[monthly.length - 1];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.tiles}>
        <StatTile label="今月の本" value={thisMonth.book} unit="冊" color={colors.book} />
        <StatTile label="今月の映画" value={thisMonth.movie} unit="本" color={colors.movie} />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>直近{MONTHS}か月</Text>
        <MonthlyBarChart data={monthly} />
      </View>
      <View style={styles.tiles}>
        <StatTile label="累計の本" value={all.book} unit="冊" color={colors.book} />
        <StatTile label="累計の映画" value={all.movie} unit="本" color={colors.movie} />
      </View>
      <RecommendationCard />
    </ScrollView>
  );
}

function StatTile({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <View style={[styles.tile, { borderTopColor: color }]}>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileValue}>
        {value}
        <Text style={styles.tileUnit}> {unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 48 },
  tiles: { flexDirection: 'row', gap: spacing.md },
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 4,
  },
  tileLabel: { fontSize: 13, color: colors.subText },
  tileValue: { fontSize: 32, fontWeight: '700', color: colors.text, marginTop: spacing.xs, fontVariant: ['tabular-nums'] },
  tileUnit: { fontSize: 14, fontWeight: '400', color: colors.subText },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
});
