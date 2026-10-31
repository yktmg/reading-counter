# 読了カウンター（練習用アプリ）

読んだ本・観た映画のタイトルを手入力して、月ごとの冊数/本数を棒グラフで見るだけのシンプルなアプリです。
本番の読書・映画記録アプリを作る前の練習用。ログインなし・API連携なし、データは端末内（AsyncStorage）に保存します。

- Expo SDK 58 / React Native / TypeScript
- 画面: 「記録」タブ（追加・一覧・削除）と「グラフ」タブ（今月/累計の数、直近6か月の積み上げ棒グラフ）

## 動かし方

前提: Node.js 20 以上（Windows でも可）。

```bash
npm install
npx expo start
```

- **iPhone で見る**: App Store で「Expo Go」を入れ、ターミナルに出る QR コードを iPhone のカメラで読む。
  PC と iPhone が別のネットワークのときは `npx expo start --tunnel`。
- **ブラウザで見る**: `npx expo start` の後に `w` キー（または `npm run web`）。

型チェック: `npx tsc --noEmit`

## フォルダ構成

```
App.tsx                      タブ切り替えだけ
src/
  types.ts                   記録の型（ReadingRecord）
  theme.ts                   色・余白
  storage/recordsRepository  保存先（いまは AsyncStorage。差し替え可能）
  hooks/useRecords           一覧・追加・削除のロジック
  utils/date, utils/stats    日付処理と月別集計（純粋関数）
  components/                フォーム、一覧、棒グラフ、おすすめカード
  screens/                   記録画面、グラフ画面
  api/recommendations        案3「今月のおすすめ」API の窓口（未設定なら何もしない）
```

## 案3「今月のおすすめ」を足すとき

アプリ側はすでに準備済みです。

1. AWS に API Gateway + Lambda を作り、次の形の JSON を返す GET エンドポイントを用意する
   ```json
   { "items": [{ "kind": "book", "title": "三体", "reason": "SF好きなあなたに" }] }
   ```
   （ブラウザから呼ぶ場合は CORS を許可する）
2. `.env.example` を `.env` にコピーし、`EXPO_PUBLIC_RECOMMENDATION_API_URL` に URL を書く
3. `npx expo start` し直すと、グラフ画面の下に「今月のおすすめ」カードが出る

## 今後いじりやすいところ

- 色を変える → `src/theme.ts`
- グラフの月数を変える → `src/screens/StatsScreen.tsx` の `MONTHS`
- 保存先を SQLite に変える → `src/storage/recordsRepository.ts` に同じインターフェースの実装を足す
