<template lang="pug">
.box
  .content
    article.media
      figure.media-left
        figure.image.is-64x64
          img(:src="user.avatar")
      .media-content
        div
          strong {{ user.name }}
        div
          small {{ user .email }}
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
}
</script>
