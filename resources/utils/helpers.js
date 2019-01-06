export function removeElement (el) {
  if (typeof (el).remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
}

// add the component w/ the specified props
export function spawn(id, propsData, Vue, Component) {
  const instance = Vue.extend(Component)
  return new instance({
    el: document.getElementById(id).appendChild(document.createElement('div')),
    propsData,
  })
}


