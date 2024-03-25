import {
  createHashRouter,
  Navigate,
} from "react-router-dom";
import PHome from '../pages/home'
import PBc from '../pages/bracket_challenge'

const router = createHashRouter([
  {
    path: '/',
    element: <PHome />,
    children:[{
      path:"/bc/:bcid",
      element: <PBc />,
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