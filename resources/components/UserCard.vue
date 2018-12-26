<template lang="pug">
.card
  .card-content
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
    .field.is-grouped.is-grouped-multiline
      .control
        .tags.has-addons
          span.tag type
          span.tag.is-dark(v-if="verified") admin
          span.tag.is-primary(v-else) user
      .control
        .tags.has-addons
          span.tag verified
          span.tag.is-success(v-if="verified") true
          span.tag.is-danger(v-else) false

  footer.card-footer
    a.card-footer-item.has-text-primary
      span.icon: i.mdi.mdi-account-card-details
      span Details
    a.card-footer-item.has-text-danger
      span.icon: i.mdi.mdi-delete
      span Delete
    a.card-footer-item.has-text-info
      span.icon: i.mdi.mdi-login
      span Login As
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
