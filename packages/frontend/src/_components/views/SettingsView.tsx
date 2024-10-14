'use client';

import { useFormik } from 'formik';
import { FC } from 'react';
import { useUserProfile } from '../../_hooks/useUserProfile';
import Button from '../Button/Button';
import Input from '../Input/Input';

export const SettingsView: FC = () => {
  const { username, setUsername } = useUserProfile();
  const formik = useFormik({
    initialValues: {
      username,
    },

    onSubmit: (values) => {
      if (values.username) {
        setUsername(values.username);
      }
    },
  });

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-2xl font-bold">Settings</h1>
      <hr className="my-4 border-slate-700" />
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          {...formik.getFieldProps('username')}
        />
        <div className="mt-4 block">
          <Button
            type="submit"
            variant="success"
            isLoading={formik.isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
