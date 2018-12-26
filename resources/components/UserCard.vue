<template lang="pug">
.box
  article.media
    figure.media-left
      figure.image.is-64x64
        img(:src="user.avatar")
    .media-content
      .content
        div
          strong {{ user.name }}
        div
          small {{ user .email }}
  hr
  .field.is-grouped.is-grouped-multiline
    .control
      .tags.has-addons
        span.tag type
        span.tag.is-primary(v-if="verified") admin
        span.tag.is-dark(v-else) user
    .control
      .tags.has-addons
        span.tag verified
        span.tag.is-success(v-if="verified") true
        span.tag.is-danger(v-else) false

</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  computed: {
    verified () {
      return Math.round(Math.random())
    }
  },
}
</script>
