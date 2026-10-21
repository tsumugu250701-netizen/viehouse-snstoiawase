# GA4 設定

1. GA4 管理 → データ ストリーム → ウェブで、この公開サイト用のストリームを作成し、G- から始まる測定IDを取得。
2. Vercel の本番環境変数 NEXT_PUBLIC_GA_MEASUREMENT_ID に測定IDを設定し、再デプロイ。未設定・不正形式なら計測スクリプトは読み込まれません。Preview には本番IDを設定しないでください。
3. GA4 ストリームの拡張計測で「ブラウザの履歴イベントに基づくページの変更」と「フォームの操作」を無効化。この実装がページ閲覧とフォーム操作を独自計測するためです。
4. 本番サイトを開いて、GA4 リアルタイムで受信を確認。

## イベント
| イベント | 意味 |
| --- | --- |
| page_view | 初回表示・パス変更。予約アンカー移動は除外 |
| reservation_click | 予約CTAクリック。cta_location で配置を識別 |
| reservation_form_view | フォーム表示 |
| reservation_form_start | 初回の入力変更（フォーカスのみでは発火しない） |
| reservation_step_complete | 入力チェック通過。step_number は1〜3 |
| reservation_submit_attempt | 同意後の送信試行 |
| reservation_submit_unverified | Googleフォームへのno-cors送信が戻った状態。受理確認ではない |
| reservation_submit_error | 通信エラー |
| youtube_click | 動画・チャンネルへのクリック |

cta_location（文字列）と step_number（数値）は必要ならイベントスコープのカスタムディメンションに登録。再訪・戻る操作でステップイベントは複数回発生しうるため、ファネルはユーザー単位で評価します。

## 問い合わせ件数について
現在のGoogleフォーム送信は opaque 応答で、入力拒否・保存成否を確認できません。
reservation_submit_unverified や自動 form_submit を「受理済み問い合わせ」のキーイベントにしないでください。
実件数はGoogleフォームの回答と照合してください。受理確認ができるAPIに改修した段階で generate_lead を追加します。

氏名・メール・電話・住所・自由記入・予算はイベントに送りません。
ページURLはクエリ・ハッシュを除いたものを明示します。広告流入のUTM分析は導入後に実データで確認してください。

## 動作確認
- 測定IDなし: gtag.jsへのリクエストがないこと。
- 測定IDあり: gtag.js読み込み、初回と会社案内遷移のpage_view各1回、アンカー移動は追加なし。
- CTAの配置、フォーム表示、初回入力、各ステップ通過をリアルタイム/DebugViewで確認。
- 実送信テストは担当者と調整し、Googleフォームへの保存を別途確認。
