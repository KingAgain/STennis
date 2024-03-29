import {
  createHashRouter,
  Navigate,
} from "react-router-dom";
import PHome from '../pages/home'
import PBc from '../pages/bracket_challenge'
import PBcM from '../pages/bracket_challenge_main'
import CCAnalytics from '../components/CAnalytics/CAnalytics'




const router = createHashRouter([
  {
    path: '/',
    element: <PHome />,
    children:[{
      path:"/bc/:bcid",
      element: <PBc />,
      children:[{
        index:true,
        element: <PBcM />,
      },{
        path:"/bc/:bcid/analytics",
        element: <CCAnalytics />,
      },]
    }]
  },
  {
    path: 'test',
    element: <PBc/>,
  },
  {
    path: '*',
    element: <Navigate to="/bc/1" />
  },
])

export default router