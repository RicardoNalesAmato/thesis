import AppRoot from '../client/app'
import GraphsAndFeedback from '../client/graphsAndFeedback'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/graphs',
        exact: true,
        component: GraphsAndFeedback
      }
    ]
  }
]

export default routes
