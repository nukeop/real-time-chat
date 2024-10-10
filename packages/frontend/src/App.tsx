import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConnectionStatus } from './components/ConnectionStatus/ConnectionStatus';
import { StatusBar } from './components/StatusBar/StatusBar';
import { UserMenu } from './components/UserMenu/UserMenu';
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
        <UserMenu />
      </StatusBar>
      <div className="relative flex max-h-full w-full max-w-screen-lg flex-row items-start justify-center pt-16">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
