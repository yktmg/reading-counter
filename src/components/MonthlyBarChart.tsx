// 月ごとの積み上げ棒グラフ。グラフ用ライブラリを使わず View の高さだけで描く
// （Expo Go でもブラウザでもそのまま動く）。
import { StyleSheet, Text, View } from 'react-native';
import type { MonthlyCount } from '../utils/stats';
import { colors, spacing } from '../theme';

type Props = { data: MonthlyCount[]; height?: number };

export function MonthlyBarChart({ data, height = 180 }: Props) {
  const max = Math.max(1, ...data.map((d) => d.book + d.movie));
  // 目盛りは 0 / 半分 / 最大 の3本
  const ticks = [max, Math.round(max / 2), 0].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <View>
      <View style={[styles.plot, { height }]}>
        {ticks.map((t) => (
          <View key={t} style={[styles.gridLine, { bottom: (t / max) * height }]}>
            <Text style={styles.tickLabel}>{t}</Text>
          </View>
        ))}
        <View style={styles.bars}>
          {data.map((d) => {
            const total = d.book + d.movie;
            return (
              <View
                key={d.month}
                style={styles.barSlot}
                accessible
                accessibilityLabel={`${Number(d.month.slice(5))}月 本${d.book} 映画${d.movie}`}
              >
                {total > 0 && <Text style={styles.valueLabel}>{total}</Text>}
                <View style={[styles.bar, { height: (total / max) * height }]}>
                  {/* 上が映画、下が本 */}
                  <View style={{ flex: d.movie, backgroundColor: colors.movie }} />
                  <View style={{ flex: d.book, backgroundColor: colors.book }} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.xAxis}>
        {data.map((d) => (
          <Text key={d.month} style={styles.xLabel}>{Number(d.month.slice(5))}月</Text>
        ))}
      </View>
      <View style={styles.legend}>
        <LegendItem color={colors.book} label="本" />
        <LegendItem color={colors.movie} label="映画" />
      </View>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendSwatch, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  plot: { marginLeft: 24, marginTop: spacing.lg },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  tickLabel: { position: 'absolute', left: -24, top: -8, width: 20, textAlign: 'right', fontSize: 11, color: colors.subText },
  bars: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-end' },
  barSlot: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '55%', maxWidth: 28, borderTopLeftRadius: 4, borderTopRightRadius: 4, overflow: 'hidden' },
  valueLabel: { fontSize: 11, color: colors.text, marginBottom: 2 },
  xAxis: { flexDirection: 'row', marginLeft: 24, marginTop: spacing.xs },
  xLabel: { flex: 1, textAlign: 'center', fontSize: 11, color: colors.subText },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, marginTop: spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  legendSwatch: { width: 10, height: 10, borderRadius: 2 },
  legendText: { fontSize: 12, color: colors.subText },
});
