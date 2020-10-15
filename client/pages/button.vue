<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="max-w-3xl">
      <div class="flex flex-row items-center mb-2">
        <div class="mr-2">
          size:
        </div>
        <div>
          <PushButton class="mr-2" size="xs">
            size: xs
          </PushButton>
          <PushButton class="mr-2" size="s">
            size: s
          </PushButton>
          <PushButton class="mr-2" size="m">
            size: m
          </PushButton>
          <PushButton class="mr-2" size="l">
            size: l
          </PushButton>
          <PushButton class="mr-2" size="xl">
            size: xl
          </PushButton>
        </div>
      </div>
      <div class="flex flex-row items-center mb-2">
        <div class="mr-2">
          theme:
        </div>
        <div>
          <PushButton class="mr-2" theme="white">
            white
          </PushButton>
          <PushButton class="mr-2" theme="indigo">
            indigo
          </PushButton>
          <PushButton class="mr-2" theme="indigo-light">
            indigo-light
          </PushButton>
          <PushButton class="mr-2" theme="red">
            red
          </PushButton>
          <PushButton class="mr-2" theme="text">
            text
          </PushButton>
        </div>
      </div>
      <div class="flex flex-row items-center mb-2">
        <div class="mr-2">
          state: loading
        </div>
        <div>
          <PushButton class="mr-2" state="loading">
            white
          </PushButton>
          <PushButton class="mr-2" state="loading" theme="indigo">
            indigo
          </PushButton>
          <PushButton class="mr-2" state="loading" theme="indigo-light">
            indigo-light
          </PushButton>
          <PushButton class="mr-2" state="loading" theme="red">
            red
          </PushButton>
        </div>
      </div>
      <div class="flex flex-row items-center mb-2">
        <div class="mr-2">
          progress:
        </div>
        <div>
          <PushButton class="mr-2" theme="white" :progress="25">
            <div class="mx-4">
              25
            </div>
          </PushButton>
          <PushButton class="mr-2" theme="indigo" :progress="50">
            <div class="mx-4">
              50
            </div>
          </PushButton>
          <PushButton class="mr-2" theme="indigo-light" :progress="75">
            <div class="mx-4">
              75
            </div>
          </PushButton>
          <PushButton class="mr-2" theme="red" :progress="100">
            <div class="mx-4">
              100
            </div>
          </PushButton>
        </div>
      </div>
    </div>
  </div>
</template>
