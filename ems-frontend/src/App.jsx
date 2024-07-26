import './App.css';
import { RouterProvider } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle.jsx';
import router from './Router.jsx';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
  );
}

export default App;
