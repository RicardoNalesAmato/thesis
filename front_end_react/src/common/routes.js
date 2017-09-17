import AppRoot from '../client/app'
import ProgramSelector from '../client/components/programSelector'
import TutorialPage from '../client/components/tutorialPage'
import ProgramSelection from '../client/components/programSelection'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/graphs/:program',
        exact: true,
        component: ProgramSelector
      },
      {
        path: '/program_selection',
        exact: true,
        component: ProgramSelection
      },
      {
        path: '/',
        exact: true,
        component: TutorialPage
      }
    ]
  }
]

export default routes
