import Menu from '@/lib/menu'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const api = useApi()
  await api.checkUser()
  const menu = new Menu(api)
  const item = menu.items().find(item => item.to === to.path)
  // console.log(`loggedIn: ${ api.loggedIn.value } - ${ api.$user.name }`)
  if (item && item.gated === true && api.loggedIn.value === false) {
    useToast().add({ icon: 'i-mdi-lock', color: 'red', title: 'Access Denied', })
    return navigateTo('/')
  }

})
