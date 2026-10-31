import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRecords } from './src/hooks/useRecords';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { colors, spacing } from './src/theme';

type Tab = 'records' | 'stats';

export default function App() {
  const [tab, setTab] = useState<Tab>('records');
  const { records, loading, addRecord, removeRecord } = useRecords();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        <Text style={styles.appTitle}>読了カウンター</Text>
        <View style={styles.body}>
          {loading ? (
            <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />
          ) : tab === 'records' ? (
            <RecordsScreen records={records} onAdd={addRecord} onDelete={removeRecord} />
          ) : (
            <StatsScreen records={records} />
          )}
        </View>
        <View style={styles.tabBar}>
          <TabButton label="記録" active={tab === 'records'} onPress={() => setTab('records')} />
          <TabButton label="グラフ" active={tab === 'stats'} onPress={() => setTab('stats')} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={styles.tab}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      <View style={[styles.tabIndicator, active && styles.tabIndicatorActive]} />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  body: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tab: { flex: 1, alignItems: 'center', paddingBottom: spacing.xl },
  tabIndicator: { height: 3, alignSelf: 'stretch', marginBottom: spacing.sm },
  tabIndicatorActive: { backgroundColor: colors.primary },
  tabLabel: { fontSize: 14, color: colors.subText },
  tabLabelActive: { color: colors.primary, fontWeight: '600' },
});
