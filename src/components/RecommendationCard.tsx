// 案3「今月のおすすめ」の表示部分。API の URL が未設定なら何も表示しない。
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchRecommendations, isRecommendationEnabled, type Recommendation } from '../api/recommendations';
import { KIND_LABEL } from '../types';
import { colors, spacing } from '../theme';

export function RecommendationCard() {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isRecommendationEnabled) return;
    fetchRecommendations().then(setItems).catch((e: Error) => setError(e.message));
  }, []);

  if (!isRecommendationEnabled) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>今月のおすすめ</Text>
      {error && <Text style={styles.sub}>{error}</Text>}
      {items.map((item, i) => (
        <Text key={i} style={styles.item}>
          [{KIND_LABEL[item.kind]}] {item.title}
          {item.reason ? <Text style={styles.sub}>{`\n${item.reason}`}</Text> : null}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heading: { fontSize: 15, fontWeight: '600', color: colors.text },
  item: { fontSize: 14, color: colors.text },
  sub: { fontSize: 12, color: colors.subText },
});
