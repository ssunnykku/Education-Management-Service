import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login.jsx';
import Mypage from './pages/Mypage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';
import PointPage from './pages/PointPage.jsx';

const Router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
    errorElement: <Error />,
  },
  {
    path: '/point-page',
    element: <PointPage />,
    errorElement: <Error />,
  },
  {
    path: '/attendance-page',
    element: <AttendancePage />,
    errorElement: <Error />,
  },
  {
    path: '/course-page',
    element: <CoursePage />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
export default Router;
