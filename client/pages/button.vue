<template lang="pug">
.flex.flex-col.items-center.justify-center.w-screen.h-screen
  .max-w-3xl
    .flex.flex-row.items-center.mb-2
      .mr-2 size:
      div
        PushButton.mr-2(size="xs") size: xs
        PushButton.mr-2(size="s") size: s
        PushButton.mr-2(size="m") size: m
        PushButton.mr-2(size="l") size: l
        PushButton.mr-2(size="xl") size: xl
    .flex.flex-row.items-center.mb-2
      .mr-2 theme:
      div
        PushButton(theme="white").mr-2 white
        PushButton(theme="indigo").mr-2 indigo
        PushButton(theme="indigo-light").mr-2 indigo-light
        PushButton(theme="red").mr-2 red
        PushButton(theme="text").mr-2 text
    .flex.flex-row.items-center.mb-2
      .mr-2 state: loading
      div
        PushButton(state="loading").mr-2 white
        PushButton(state="loading", theme="indigo").mr-2 indigo
        PushButton(state="loading", theme="indigo-light").mr-2 indigo-light
        PushButton(state="loading", theme="red").mr-2 red
    .flex.flex-row.items-center.mb-2
      .mr-2 progress:
      div
        PushButton(theme="white", :progress="25").mr-2: .mx-4 25
        PushButton(theme="indigo", :progress="50").mr-2: .mx-4 50
        PushButton(theme="indigo-light", :progress="75").mr-2: .mx-4 75
        PushButton(theme="red", :progress="100").mr-2: .mx-4 100
</template>
