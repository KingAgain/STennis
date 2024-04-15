import {
  createHashRouter,
  Navigate,
} from "react-router-dom";
import PHome from '../pages/home'
import PBc from '../pages/bracket_challenge'
import PBcM from '../pages/bracket_challenge_main'
import CCAnalytics from '../components/CAnalytics/CAnalytics'
import CCRank from '../components/CRank/CRank'
import PRank from '../pages/rank/rank'




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
      },{
        path:"/bc/:bcid/rank",
        element: <CCRank />,
      },]
    },{
      path:"/rank",
      element: <PRank />,
      children:[
      {
        path:"/rank/syear",
        element: <PRank />
      },
      {
        path:"/rank/dyear",
        element: <PRank />
      },
      {
        path:"/rank/srace",
        element: <PRank />
      },
      {
        path:"/rank/drace",
        element: <PRank />
      },
      {
        path:"/rank/stats",
        element: <PRank />
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