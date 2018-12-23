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
  footer.card-footer
    a.card-footer-item
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
}
</script>
