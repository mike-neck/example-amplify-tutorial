# example-amplify-tutorial
Learning AWS Amplify.

Memo
===

Prerequisites
---

- `amplify configure` はブラウザーを立ち上げて IAM ユーザーを作成した後に `aws configure` と同じく CLI のクレデンシャルを登録する

Setup
---

- amplify init で対話的にアプリケーションのセットアップをする
- amplify コマンドで追加される設定などは `src/aws-exports.js` に出力される。 `index.ts` にて次のコードを埋め込んでおくと、それらの設定変更が児童で反映される

```ts
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);
```
