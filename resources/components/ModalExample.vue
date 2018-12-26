<template lang="pug">
transition(name="animodal")
  .modal.is-active
    .modal-background(@click="close")
    .modal-card
      header.modal-card-head
        p.modal-card-title Modal Title
      section.modal-card-body
        .content
          p Sed et fermentum mi, sed posuere turpis. Sed ultricies nec eros quis finibus. Phasellus elementum scelerisque dui, fermentum maximus nisl bibendum ut.
          p Nulla facilisi. Aliquam dapibus massa metus, a tempus sapien tempus ac. Duis efficitur justo a ligula rhoncus, et sagittis ipsum varius. In semper ligula et sem sagittis, ut maximus tellus vulputate. Sed dictum rutrum nisl, volutpat ultrices diam dictum at.
      footer.modal-card-foot
        .button.is-primary.is-pulled-right(@click="close") OK
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
