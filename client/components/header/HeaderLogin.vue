<template>
  <div>
    <push-button
      class="w-full lg:w-20 justify-center"
      theme="indigo"
      @click="show"
    >
      <div
        v-if="authed === null"
        key="waiting"
      >
        <icon-spinner
          class="w-5 h-5"
          primary="text-fuchsia-200"
          secondary="text-fuchsia-300"
        />
      </div>
      <div
        v-else-if="authed === false"
        key="login"
      >
        Log In
      </div>
      <div
        v-else-if="authed === true"
        key="user"
      >
        <icon-home
          class="w-5 h-5"
          primary="text-fuchsia-200"
          secondary="text-fuchsia-300"
        />
      </div>
    </push-button>
    <modal-base v-if="modal" ref="modal" :destroyed="modalOff">
      <modal-login :modal-off="modalOff" />
    </modal-base>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      authed: null as null|boolean,
      modal: false,
    }
  },
  computed: {
    loggedIn (): boolean { return this.$auth.loggedIn },
  },
  watch: {
    loggedIn (after) {
      this.authed = after
    },
  },
  async mounted () {
    await this.$sleep(200)
    this.authed = this.$auth.loggedIn
  },
  methods: {
    modalOn (): void {
      this.modal = true
    },
    modalOff (): void {
      this.modal = false
    },
    show () {
      if (this.authed) this.$router.push('/home')
      else this.modal = true
    },
  },
})
</script>
