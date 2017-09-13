import AppRoot from '../client/app'
import GraphsAndFeedback from '../client/components/programSelector'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/graphs/:program',
        exact: true,
        component: GraphsAndFeedback
      }
    ]
  }
]

export default routes
