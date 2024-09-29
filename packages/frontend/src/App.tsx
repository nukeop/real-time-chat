import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConnectionStatus } from './components/ConnectionStatus/ConnectionStatus';
import { StatusBar } from './components/StatusBar/StatusBar';
import { Chat } from './Views/Chat';
import { Connect } from './Views/Connect';
import { Rooms } from './Views/Rooms';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Rooms />,
  },
  {
    path: '/rooms/:id',
    element: <Chat />,
    loader: async ({ params }) => {
      return {
        roomId: params.id,
      };
    },
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
