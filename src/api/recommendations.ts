// 「今月のおすすめ」API（案3）の窓口。
// いまは API の URL が未設定なので何もしない。
// AWS に Lambda + API Gateway を作ったら、.env に
//   EXPO_PUBLIC_RECOMMENDATION_API_URL=https://xxxx.execute-api.ap-northeast-1.amazonaws.com/prod/recommendations
// を書くだけで、統計画面におすすめカードが表示される。
import type { RecordKind } from '../types';

export type Recommendation = {
  kind: RecordKind;
  title: string;
  reason?: string;
};

const API_URL = process.env.EXPO_PUBLIC_RECOMMENDATION_API_URL;

export const isRecommendationEnabled = Boolean(API_URL);

/** 期待するレスポンス: { "items": [{ "kind": "book", "title": "...", "reason": "..." }] } */
export async function fetchRecommendations(): Promise<Recommendation[]> {
  if (!API_URL) return [];
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`おすすめの取得に失敗しました (${res.status})`);
  const body = (await res.json()) as { items?: Recommendation[] };
  return body.items ?? [];
}
