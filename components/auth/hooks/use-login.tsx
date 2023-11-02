'use client';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify';

import useForms from '@/hooks/useForm';
import ModalContext from '@/context/modal-context';
import { inputProps } from '../auth-form';
import { LoginMutation } from '@/types/apolloComponent';
import { loginMutation } from '@/lib/graphql/users';
import {
  getAuthBioSuccess,
  getAuthImgSuccess,
  getAuthNameSuccess,
  initAuth,
} from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function useLogin() {
  const router = useRouter();
  const [inputs, handleChange] = useForms({
    username: '',
    password: '',
  } as inputProps);
  const { IsClose, SetIsClose, mode, SetMode } = useContext(ModalContext);

  const dispatch = useDispatch();
  const client = useApolloClient();

  const validateUsername = (value: string) => {
    return value.match(/^[a-z0-9]{5,20}$/);
  };

  const validatePassword = (value: string) => {
    return value.length > 5;
  };

  const Passwordhelper = React.useMemo(() => {
    if (!inputs.password)
      return {
        text: '',
        color: '',
        state: 'idle',
      };
    const isValid = validatePassword(inputs.password);
    return {
      text: isValid ? 'Correct password' : '5자리 이상 입력해주세요.',
      color: isValid ? 'success' : 'error',
      state: inputs.password ? 'on' : 'idle',
    };
  }, [inputs.password]);

  const Usernamehelper = React.useMemo(() => {
    if (!inputs.username)
      return {
        text: '',
        color: '',
        state: 'idle',
      };
    const isValid = validateUsername(inputs.username);
    return {
      text: isValid
        ? 'Correct username'
        : '5~20자 사이의 영문 소문자 또는 숫자를 입력해주세요.',
      color: isValid ? 'success' : 'error',
      state: inputs.username ? 'on' : 'idle',
    };
  }, [inputs.username]);

  const [signIn, { error: LoginError }] = useMutation<LoginMutation>(loginMutation, {
    onCompleted(signIn) {
      SetIsClose(false);

      dispatch(
        getAuthImgSuccess(
          signIn?.login?.profile?.thumbnail ? signIn?.login?.profile?.thumbnail : '',
        ),
      );
      dispatch(
        getAuthNameSuccess(
          signIn?.login?.profile?.profile_name ? signIn.login?.profile?.profile_name : '',
        ),
      );
      dispatch(
        getAuthBioSuccess(signIn?.login?.profile?.bio ? signIn?.login?.profile?.bio : ''),
      );

      dispatch(initAuth(signIn.login) as any);
      toast.success('로그인 완료!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      inputs.username = '';
      inputs.password = '';
      client.resetStore();
      router.push('/');
    },
  });

  const Submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn({
      variables: {
        username: inputs.username,
        password: inputs.password,
      },
    });
  };

  const handleSubmit = useDebouncedCallback(Submit, 200);

  return {
    username: inputs.username,
    password: inputs.password,
    signIn,
    handleSubmit,
    LoginError,
    handleChange,
    Passwordhelper,
    Usernamehelper,
    SetMode,
  };
}