import { ClientEvent, ServerEvent } from '@real-time-chat/core';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ApiClient } from '../api/client';
import { RoomsTable } from '../components/RoomsTable/RoomsTable';
import { useBackendSocket } from '../hooks/useBackendSocket';
import { useBackendSocketSubscription } from '../hooks/useBackendSocketSubscription';

export const Rooms = () => {
  const socket = useBackendSocket();
  const navigate = useNavigate();
  useBackendSocketSubscription(
    ServerEvent.ROOM_CREATED,
    ({ id }: { id: string }) => {
      navigate(`/rooms/${id}`);
    },
  );
  const [rooms, setRooms] = useState<
    Awaited<ReturnType<(typeof ApiClient)['getRooms']>>
  >([]);

  useEffect(() => {
    ApiClient.getRooms().then(setRooms);
  }, []);

  const onJoinRoom = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      maxUsers: 3,
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Room name is required'),
      maxUsers: Yup.number()
        .required('Max users is required')
        .min(1, 'Must be at least 1'),
      password: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      socket?.emit(ClientEvent.CREATE_ROOM, {
        name: values.name,
        maxUsers: values.maxUsers,
        password: values.password,
      });
    },
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex h-screen w-full flex-row bg-slate-900 text-white"
      >
        <div className="flex-grow overflow-y-auto p-4 flex-1 w-2/3">
          <RoomsTable rooms={rooms} onJoinRoom={onJoinRoom} />
        </div>
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Create a New Room</h2>
          <form
            className="bg-slate-800 p-4 rounded-lg"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor={formik.getFieldProps('name').name}
                className="block text-sm font-medium text-slate-400"
              >
                Room Name
                <input
                  type="text"
                  placeholder="Room Name"
                  required
                  className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-indigo-500 focus:bg-slate-600 focus:ring-0 px-2 py-1 text-white"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor={formik.getFieldProps('password').name}
                className="block text-sm font-medium text-slate-400"
              >
                Password (optional)
                <input
                  type="text"
                  placeholder="Password (optional)"
                  className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-indigo-500 focus:bg-slate-600 focus:ring-0 px-2 py-1 text-white"
                  {...formik.getFieldProps('password')}
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor={formik.getFieldProps('maxUsers').name}
                className="block text-sm font-medium text-slate-400"
              >
                Max Users
                <input
                  type="number"
                  placeholder="Max Users"
                  className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-indigo-500 focus:bg-slate-600 focus:ring-0 px-2 py-1 text-white"
                  {...formik.getFieldProps('maxUsers')}
                />
                {formik.touched.maxUsers && formik.errors.maxUsers ? (
                  <div className="text-red-500">{formik.errors.maxUsers}</div>
                ) : null}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Create Room
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
