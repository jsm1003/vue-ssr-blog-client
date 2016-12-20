import { app, router, store } from './app'
const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  // set router's location
  router.push(context.url)
  // call prefetch hooks on components matched by the route
  const s = isDev && Date.now()

    const matchedComponents = router.getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }


  return Promise.all(matchedComponents.map(component => {
    if (component.preFetch) {
      return component.preFetch(store)
    }
  })).then(() => {
    console.log(`data pre-fetch: ${Date.now() - s}ms`)
    // set initial store on context
    // the request handler will inline the state in the HTML response.
    context.initialState = store.state
    return app
  })
}
