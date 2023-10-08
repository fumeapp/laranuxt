
const loginModal = ref(false)

export const useModal = () => {

  const loginModalOn = () => loginModal.value = true
  const loginModalOff = () => loginModal.value = false
  const loginModalToggle = () => loginModal.value = !loginModal.value

  return {
    loginModal,
    loginModalOn,
    loginModalOff,
    loginModalToggle,
  }

}
