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
        <PushButton group="middle" theme="white" size="xl" state="loading">
          middle
        </PushButton>
        <PushButton group="right" theme="red" size="xl">
          right
        </PushButton>
      </ButtonGroup>
    </div>
    <div class="my-12">
      <PushButton>
        <IconCheck class="w-5 h-5 mr-2" primary="text-green-300" secondary="text-green-400" />
        Pair with Icons
      </PushButton>
    </div>
  </div>
</template>

<script>
export default {}
</script>
