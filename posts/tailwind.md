---
title: "CSSフレームワーク「Tailwind CSS」の基本的な使い方メモ"
date: "2021-03-09"
category: "web"
description: "TailwindCSSは簡単にデザインを構築できるユーティリティーファーストのCSSのフレームワークです。CSSを書かずにデザインを作ることができ、コード量と時間を節約することができます。"
update: "2021-03-09"
tag: ["TailwindCSS","CSS"]
---

TailwindCSSは簡単にデザインを構築できるユーティリティーファーストのCSSのフレームワークです。

CSSを書かずにデザインを作ることができ、コード量と時間を節約することができます。

[公式サイト](https://tailwindcss.com/)

## インストール方法

公式サイトの[インストール方法](https://tailwindcss.com/docs/installation#2-add-tailwind-to-your-css)を参考に自分の使っている環境を選択してインストールしてください。

CDN 版もあるので軽く触ってみたいという人はCDN版をためしてみてください。

## クラス

ここからよく使うクラスを紹介していきます。

### width height

```html
//width 50%
<div class="w-1/2"></div>
//width 100%
<div class="w-full"></div>
//height 1.5rem
<div class="h-6"></div>
```

先頭の文字はwidthならw、heightならhになります。

パーセントは1/3を指定すれば 33.333%に、1/4を指定すれば25%になります。

remは1上がる毎に0.25remずつ上がっていきます。

詳しくは[こちら](https://tailwindcss.com/docs/width)

### margin pedding

```html
//margin 1.5rem
<div class="m-6"></div>
//margin top
<div class="mt-6"></div>
//margin bottom
<div class="mb-6"></div>
//margin right
<div class="mr-6"></div>
//margin left
<div class="ml-6"></div>
//margin top bottom
<div class="my-6"></div>
//margin right left
<div class="mx-6"></div>
```

頭文字をpにすればpaddingになります。

mの次に指定したい方向の頭文字を付けますtopならt上下はx左右はyになります。

詳しくは[こちら](https://tailwindcss.com/docs/margin)

### font

```html
//font-size
<p class="text-xs">test</p>
//font-weight
<p class="font-bold">test</p>
//font-famiry serif
<p class="font-serif">test</p>
```

詳しくはこちら

[font-size](https://tailwindcss.com/docs/font-size)

[font-weight](https://tailwindcss.com/docs/font-weight)

[font-famiry](https://tailwindcss.com/docs/font-family)

### color

```html
//黒
<p class="text-black">test</p>
//白
<p class="bg-white">test</p>
//他濃さ指定
<p class="bg-red-400">test</p>
```

色の濃さの指定は50から900までの数値があり、数値が上がるほど濃くなります。

詳しくは[こちら](https://tailwindcss.com/docs/background-color)

### flex

```html
//display flex
<div class="flex"></div>
//Align Items center
<div class="items-center"></div>
//Justify Content center
<div class="justify-center"></div>
```

centerの部分をaroundやstartなどにすると変更できます。

flexboxは多くて載せきれないのでよく使うcenterだけを記載しました。

詳しくは調べてみてください。

### レスポンシブ

```html
//min-width:640px
<div class="w-full sm:w-1/2"></div>
//min-width:1024px
<div class="w-full lg:1/4"></div>
```

初期では画面幅は

sm = 640px

md = 768px

lg = 1024px

xl = 1280px

2xl = 1536px

のようになっています。

指定したい幅の後に：をつけてそのあとに適用さてたいCSSを付け加えます。

詳しくは[こちら](https://tailwindcss.com/docs/responsive-design)

## カスタム

tailwind.config.jsに好きな値を設定することにより自分が使いたいスタイルをつくることができます。

```javascript
module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
};
```

### theme

Theme 内に設定をすると規定値を上書きしてしまいます。

規定値を残さずに自分で作りたい場合はthemeを使いましょう。

```javascript
module.exports = {
  theme: {
    colors: {
      test: "#F5DF4D",
    },
  },
};
```

### extend

規定値を残して設定を拡張したいという場合はextendを使います。

extendはtheme内に記述します。

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        test: "#F5DF4D",
      },
    },
  },
};
```

### variants

hoverなどの疑似クラスなどを追加できるようになります

```javascript
module.exports = {
  variants: {
    extend: {
      padding: ["hover"],
    },
  },
};
```

## 最後に

是非TailWindCSSを使ってデザイン作ってみてください。
