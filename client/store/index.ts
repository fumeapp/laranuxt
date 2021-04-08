import type { Context } from '@nuxt/types'
import type { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface RootState {
  description: string
}

export const state = (): RootState => ({
  description: "I'm defined as an initial state"
})

export const getters: GetterTree<RootState, RootState> = {
  reversedName: (state): string => state.description.split('').reverse().join('')
}

export const MutationType = {
  CHANGE_DESCRIPTION: 'changeDescription'
}

export const mutations: MutationTree<RootState> = {
  [MutationType.CHANGE_DESCRIPTION]: (state, newDescription: string) => { state.description = newDescription }
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit ({ commit }, _context: Context) {
    commit(MutationType.CHANGE_DESCRIPTION, "I'm defined by server side")
  }
}
