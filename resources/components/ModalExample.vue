<template lang="pug">
transition(name="animodal")
  .modal.is-active
    .modal-background(@click="close")
    .modal-card
      header.modal-card-head
        p.modal-card-title Modal Title
      section.modal-card-body
        p This is the body of the modal
        p This is the body of the modal
        p This is the body of the modal
      footer.modal-card-foot
        .button.button.is-primary.is-pulled-right(@click-"close") OK
    button.modal-close.is-large(@click="close")
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
      required: true,
    }
  }
}
</script>
