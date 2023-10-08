interface ConfirmParams {
  title: string
  message: string
  label: string
  action: Function
}

const confirming = ref<boolean>(false)

const params = ref<ConfirmParams>({
  title: 'Title',
  message: 'Description',
  label: 'Confirm',
  action: () => {},
})

export const useConfirm = () => {
  function confirm (title: string, message: string, label: string, action: Function) {
    params.value = { title, message, label, action }
    confirming.value = true
  }

  return { confirm, confirming, params }
}
