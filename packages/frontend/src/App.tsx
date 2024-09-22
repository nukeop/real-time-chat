import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConnectionStatus } from './components/ConnectionStatus/ConnectionStatus';
import { StatusBar } from './components/StatusBar/StatusBar';
import { Connect } from './Views/Connect';
import { Rooms } from './Views/Rooms';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Rooms />,
  },
  {
    path: '/connect',
    element: <Connect />,
  },
]);

function App() {
  return (
    <>
      <StatusBar>
        <ConnectionStatus />
      </StatusBar>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
