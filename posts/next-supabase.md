---
title: "Nextjs+Supabase+TypeScriptでログイン認証をする"
date: "2021-04-21"
category: "web"
description: "SupabaseはFirebaseの代替プラットフォームとして注目されているプラットフォームです。その中のSupabase AuthenticationとNextjsを組み合わせたログイン認証のやり方を説明します。"
update: "2021-04-21"
tag: "TypeScript,Nextjs,Supabase"
---

SupabaseはFirebase の代替プラットフォームとして注目されているプラットフォームです。

その中のSupabaseAuthenticationとNextjsを組み合わせたログイン認証のやり方を説明します。

- [インストール](#インストール)
- [コード](#コード)
  - [設定ファイル](#設定ファイル)
  - [サインアップ](#サインアップ)
  - [サインイン](#サインイン)
  - [ユーザーページ](#ユーザーページ)
  - [ユーザー管理](#ユーザー管理)
- [最後に](#最後に)

## インストール

### Nextjs

まずNextjsのインストールをします。

```js
npx create-next-app
```

### Supabase

Supabaseを使うためのSupabase-js をインストール

```js
npm i @supabase/supabase-js
```

### TypeScript

今回はTypeScriptで書くのでインストール

```js
npm install --save-dev typescript @types/react @types/node
```

### その他

デザインのためにTailwindCSSやSupabase ui

form作成にReactHookFormを使用しています。

## コード

### 設定ファイル

**next.configjs**を作成し、SupabaseのURLとKEYを記述します。

KEYやURLはSupabaseのSettingのAPIを確認してください。

```js
module.exports = {
  env: {
    SUPABASE_URL: "[URL]",
    SUPABASE_KEY: "[KEY]",
  },
};
```

supabase の設定ファイルを追加します。

**supabase/supabase.ts**を作成します

```js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
```

### サインアップ

Supabaseログイン方法はこちら

```js
const res = await supabase.auth.signUp({
  email,
  password,
});
```

**pages/signup.tsx**を作成

サインアップページです。この状態はまだユーザーページには遷移しません。

```js
import { Button, IconKey, IconMail } from "@supabase/ui";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@supabase/ui";
import { supabase } from "../supabase/supabase";
import { useRef } from "react";
import Link from "next/link";
const signup = () => {
  type formData = {
    email: string,
    password: string,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const runSignup = async ({ email, password }: formData) => {
    const res = await supabase.auth.signUp({
      email,
      password,
    });
  };
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <form onSubmit={handleSubmit(runSignup)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="email"
                label="Email"
                icon={<IconMail />}
                error={errors.email ? errors.email.message : ""}
                placeholder="メールアドレス"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスが不適切です。",
              },
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="password"
                icon={<IconKey />}
                label="Password"
                error={errors.password ? errors.password.message : ""}
                placeholder="パスワード(8文字以上)"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: "パスワードは8文字以上です。",
              },
            }}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="password"
                icon={<IconKey />}
                label="ConfirmPassword"
                error={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                placeholder="パスワード(確認用)"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: "パスワードは8文字以上です。",
              },
              validate: (value) =>
                value === password.current || "パスワードが一致しません。",
            }}
          />
          <div className="h-4" />
          <Button block>送信</Button>
          <div className="h-4" />
          <Link href="/signin">
            <a className=" font-bold hover:text-gray-500">サインインはこちら</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default signup;
```

### サインイン

Supabase のログイン方法はこちら

```js
const res = await supabase.auth.signIn({
  email,
  password,
});
```

**pages/signin.tsx**を作成

ログインページです。この状態はまだユーザーページには遷移しません。

```js
import { Button, IconKey, IconMail } from "@supabase/ui";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@supabase/ui";
import { supabase } from "../supabase/supabase";
import Link from "next/link";
const signin = () => {
  type formData = {
    email: string,
    password: string,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const runSignin = async ({ email, password }: formData) => {
    const res = await supabase.auth.signIn({
      email,
      password,
    });
  };
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <form onSubmit={handleSubmit(runSignin)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="email"
                label="Email"
                icon={<IconMail />}
                error={errors.email ? errors.email.message : ""}
                placeholder="メールアドレス"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスが不適切です。",
              },
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="password"
                icon={<IconKey />}
                label="Password"
                error={errors.password ? errors.password.message : ""}
                placeholder="パスワード(8文字以上)"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: "パスワードは8文字以上です。",
              },
            }}
          />
          <div className="h-4" />
          <Button block>送信</Button>
          <div className="h-4" />
          <Link href="/signup">
            <a className=" font-bold hover:text-gray-500">
              サインアップはこちら
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default signin;
```

### ユーザーページ

ここにはログインしている時だけは入れるようにします。

とりあえず今はログアウトボタンだけ配置します。

Supabaseのログアウト方法はこちら

```js
supabase.auth.signOut();
```

**pages/index.tsx**を作成

```js
import { Button } from "@supabase/ui";
import { supabase } from "../supabase/supabase";

export default function Home() {
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <h2>ログイン中</h2>
        <Button
          block
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          サインアウト
        </Button>
      </div>
    </div>
  );
}
```

### ユーザー管理

ログイン状態をonAuthStateChangeで監視できます。

ログインやサインイン、ログアウトをした時に実行されます。

```js
supabase.auth.onAuthStateChange((event, session) => {
  //処理
});
```

sessionでセッション情報を取得できます。

```js
const session = supabase.auth.session();
```

今回はReactContextを使ってユーザを管理します。

UserContextではUser情報とSession情報を管理します。

**util/UserContext.ts**を作成

```js
import { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";
type value = {
    user: User | null
    session:Session | null
}
export const UserContext = createContext<value >({user: null, session: null})
```

**\_app.tsx**を作成

\_app での記述はすべてのページで実行されます。

ここではsessionとonAuthStateChangeを使ってユーザーのログインのチェックをしています。

Context.Providerで子要素でuser情報とsession情報を使えるようにしています。

```js
import { Session, User } from "@supabase/supabase-js";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/supabase";
import { UserContext } from "../util/UserContext";
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = (useState < User) | (null > null);
  const [session, setSession] = (useState < Session) | (null > null);
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider value={{ user, session }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
```

**index.tsx**に追記

useContextでUser情報を取得しています。

ログイン状態じゃない状態でindexに入った時にsigninに返しています。

```js
import { useContext, useEffect } from "react";
import { UserContext } from "../util/UserContext";
import { useRouter } from "next/router";

const { user, session } = useContext(UserContext);
const { replace } = useRouter();

useEffect(() => {
  if (!user) {
    replace("/signin");
  }
}, [user]);
```

**signin.tsx**+**signup.tsx**に追記

ログインしている状態で入った時にindexに返しています。

```js
import { useContext, useEffect } from "react";
import { UserContext } from "../util/UserContext";
import { useRouter } from "next/router";

const { user, session } = useContext(UserContext);
const { replace } = useRouter();

useEffect(() => {
  if (user) {
    replace("/");
  }
}, [user]);
```

## 最後に

SupabaseはFirebaseよりもシンプルにログイン認証ができると感じました。

まだ日本語の記事は少なめですが、とても便利なので使ってみてはいかかですか？

### 参考にした記事

[公式ドキュメント](https://supabase.io/docs)

[VercelGitHub](https://github.com/vercel/nextjs-subscription-payments)
