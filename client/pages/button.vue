<template lang="pug">
  .flex.flex-col.items-center.justify-center.w-screen.h-screen
    .max-w-3xl
      .flex.justify-start.items-center
        PushButton.mr-2(size="xs") size: xs
        PushButton.mr-2(size="s") size: s
        PushButton.mr-2(size="m") size: m
        PushButton.mr-2(size="l") size: l
        PushButton.mr-2(size="xl") size: xl
      .flex.justify-start.items-center.mt-4
        PushButton(theme="text").mr-2 theme: text
        PushButton(theme="white").mr-2 theme: white
        PushButton(theme="indigo").mr-2 theme: indigo
        PushButton(theme="indigo-light").mr-2 theme: indigo-light
        PushButton(theme="red").mr-2 theme: red
      .flex.justify-start.items-center.mt-4
        PushButton(state="loading").mr-2 state: loading
        PushButton(state="loading", theme="indigo").mr-2 theme: indigo
        PushButton(state="loading", theme="indigo-light").mr-2 theme: indigo-light
        PushButton(state="loading", theme="red").mr-2 theme: red
      .flex.justify-start.items-center.mt-4
        PushButton(theme="white", :progress="25").mr-2 progress: 25
        PushButton(theme="indigo", :progress="50").mr-2 progress: 50
        PushButton(theme="indigo-light", :progress="50").mr-2 progress: 50
        PushButton(theme="red", :progress="75").mr-2 progress: 75
</template>
