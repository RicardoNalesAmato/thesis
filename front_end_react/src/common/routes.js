import AppRoot from '../client/app'
import ProgramSelector from '../client/components/programSelector'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/graphs/:program',
        exact: true,
        component: ProgramSelector
      }
    ]
  }
]

export default routes
