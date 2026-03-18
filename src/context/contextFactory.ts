import { createContext, useContext } from 'react'

export const contextFactory = <CtxState, DispatchReducer>(
  initialState: CtxState
) => {
  const context = createContext<{
    state: CtxState
    dispatch: () => DispatchReducer | null
  }>({
    state: initialState,
    dispatch: () => null,
  })

  const useCtx = () => {
    const ctx = useContext(context)

    if (ctx === undefined) {
      throw new Error(
        'useContext must be used inside of a Provider with a value.'
      )
    }

    return ctx
  }

  return [useCtx, context] as const
}
