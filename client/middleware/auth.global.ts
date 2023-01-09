export default defineNuxtRouteMiddleware(to => {
  const api = useApi()
  if (api && to.path !== api.config.redirect.logout && to.path !== '/invalid' && api.loggedIn.value === false)
    return navigateTo(api.config.redirect.logout)
})
