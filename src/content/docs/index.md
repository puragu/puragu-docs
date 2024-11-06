---
title: 開発方法
---

## 一連の流れ
issueを立ててから、PRをし、main mergeに至るまでの一連の流れを解説します。

### 1. issueを立てる
タスク管理issueの中から、今から自分が行うタスクを探し、issueを立ててください。
もしタスクがない場合は、自身で作業内容を追加してから、issueを立ててください。

<img src="/develop-method/task-manager.png" alt="">

issueのAssigneesには自分を入れておいてください。

### 2. ブランチを切る
作業を開発する前に必ずブランチを切りましょう。

ブランチの切り方は、`{prefix}/{your_name}/{task_detail}`でお願いします。

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントの変更のみ
style: コードの動作に影響を与えない変更（空白、フォーマット、セミコロンなど）
refactor: リファクタリング（機能追加やバグ修正を含まないコードの変更）
perf: パフォーマンス向上のための変更
test: テストの追加や修正
build: ビルドシステムや外部依存関係に関する変更（例: gulp, npm 関連）
ci: CI設定やスクリプトの変更（例: GitHub Actions、CircleCIなど）
chore: 雑務的な作業（例: ビルドタスクの変更、パッケージマネージャーの設定など）
revert: コミットの取り消し
```

### 3. コミットメッセージ
作業が完了し、ステージングを行ったら、コミットメッセージを書きます。

コミットメッセージは[conventional commits]("https://www.conventionalcommits.org/ja/v1.0.0/")に従ってください。
具体的には`{prefix}: {task_detail}`としてください。`{prefix}`はブランチと同様のものを使用してください。

### 4. Pull Request
pushが完了したら、PRを立てましょう。

PRには実装内容、スクショ、issue、懸念点をテンプレートとして用意しています。スクショはUIを実装した際にお願いします。
merge後にissueが閉じるよう、issueの`close`の後には自分が立てたissue番号を必ず書いてください。


<img src="/develop-method/pr-template.png" alt="">

### 5. レビューを受ける
mergeを行うためには最低1人以上のレビューが必要となります。
レビューコメントには[バッジ](https://zenn.dev/yumemi_inc/articles/review-badge)を使います。
Change Requestを出された場合は、コメントに従って修正し、prefixはfixを使って、コミットを伸ばしてください。

### 6. merge
reviewerから[LGTM](https://lgtmeow.com/)が帰ってきたら、mergeを行いましょう。
最後にissueが閉じていて、タスク管理issueのチェックボックスにチェックが入っているか確認してください。

## linterとformatter
BiomeとLefthookを使用して、コードの保守を行なっています。

### 1. linterを走らす
Tailwind CSSの並び順について、linterにワーニングを吐かれてしまいました。

```ts
export default function Page() {
    //These CSS classes should be sorted.
	return <div className="border text-[10px] font-bold">hello</div>; 
}
```

この場合は、以下のコマンドを実行します。

```
//npm 
$ npm run lint 

//bun
$ bun run lint
```

正しい順番に並び変わりました。

```ts
export default function Page() {
	return <div className="border font-bold text-[10px]">hello</div>;
}
```

### 2. formatterを走らす
インデントなどが崩れた際は、以下のコマンドを実行します。

```
//npm
$ npm run format

//bun
$ bun run format
```

### 3. biome ignore

non-nullアサーション演算子`!`を利用していることをlinterに怒られてしまっています。

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

//Forbidden non-null assertion.
const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
```

これはクイックフィックスを用いることによってlinterのエラーを無視することができます。

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
```

## DB周辺コマンド

```
//マイグレーションファイルの作成
$ bun run db:generate

//dbにスキーマを反映
$ bun run db:migrate

//GUIでDBを確認
$ bun run db:studio
```

