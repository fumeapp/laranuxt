<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="max-w-3xl">
      <ButtonGroup>
        <PushButton group="left">
          left
        </PushButton>
        <PushButton group="middle">
          middle
        </PushButton>
        <PushButton group="right">
          right
        </PushButton>
      </ButtonGroup>
      </div>
      <div class="my-12">
      <ButtonGroup>
        <PushButton group="left" theme="indigo-light" size="xl">
          left
        </PushButton>
        <PushButton group="middle" theme="indigo" size="xl" state="loading">
          middle
        </PushButton>
        <PushButton group="right" theme="red" size="xl">
          right
        </PushButton>
      </ButtonGroup>
    </div>
  </div>
</template>

<script>
export default {}
</script>
