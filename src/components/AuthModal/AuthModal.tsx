'use client';

import { Fragment, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '@/stores/AuthContext';
import { useForm } from 'react-hook-form';
import { getFirebaseErrorMessage } from '@/utils/error_map_utils';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface Props {
  show: boolean;
}

export default function AuthModal({ show }: Props) {
  const { auth, setShowAuthModal } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      phone: '',
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState('');

  const signInWithGoogle = useCallback(async () => {
    setFirebaseError('');
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      setFirebaseError(getFirebaseErrorMessage(e?.code));
    } finally {
      setIsLoading(false);
    }
  }, [auth]);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => {
          if (isLoading) return;
          setShowAuthModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex min-h-full h-full justify-center text-center items-center p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='overflow-visible relative transform md:rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg h-full md:h-fit'>
                <div className='bg-transparent h-full divide-y'>
                  <header className='flex justify-between'>
                    <Dialog.Title
                      as='h1'
                      className='font-semibold leading-6 text-gray-900 px-4 py-3 text-xl flex items-center'
                    >
                      Iniciar sesión
                    </Dialog.Title>
                    <button
                      className='bg-transparent p-4 text-back text-2xl transition hover:text-gray-600/75 ring-0'
                      onClick={() => {
                        if (isLoading) return;
                        setShowAuthModal(false);
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                  </header>
                  <section className='max-w-full bg-transparent pt-0 pb-12 px-4 block h-[calc(100%-56px)] overflow-visible divide-y'>
                    <section>
                      <div className='mt-4'>
                        <div className='max-w-full bg-white pt-4 pb-4 grid grid-cols-1 gap-4 h-fit px-2'>
                          <picture className='h-12 flex items-center min-w-[60px] mx-auto mb-3'>
                            <span className='sr-only'>Home</span>
                            <Image
                              src='/images/Logo.png'
                              height={810}
                              width={1913}
                              className='object-cover object-top h-full w-auto my-auto block'
                              alt='logo'
                            />
                          </picture>
                          <label className='font-semibold text-center w-full text-xl my-2 text-primary'>
                            Empieza a simplificar la<br/>gestión de tu condominio
                          </label>
                          {firebaseError && (
                            <span className='text-base text-alizarin-crimson px-1 w-full text-center'>
                              {firebaseError}
                            </span>
                          )}
                          <div className='flex flex-col gap-6 items-center justify-center mt-2'>
                            <button
                              className='mx-4 w-full bg-white border border-gray-50 text-black text-base font-semibold flex gap-4 items-center justify-start focus:outline-none rounded pl-5 pr-6 h-11 hover:bg-gray-50 shadow-md max-w-[310px]'
                              onClick={signInWithGoogle}
                            >
                              <Image
                                src='/images/google-icon.png'
                                height={25}
                                width={25}
                                className='object-cover'
                                alt='Google Icon'
                              />
                              <span>Continuar con Google</span>
                            </button>
                            {/*<button
                                className='mx-4 w-full bg-white border border-gray-300 text-black text-base font-semibold flex gap-4 items-center justify-center focus:outline-none rounded px-5 h-11 hover:bg-gray-50'
                                onClick={signInWithGoogle}
                              >
                                <Image
                                  src='/images/apple-icon.png'
                                  height={25}
                                  width={25}
                                  className='object-cover'
                                  alt='Apple Icon'
                                />
                                <span>Continuar con Apple</span>
                              </button>
                              <button
                                className='mx-4 w-full bg-white border border-gray-300 text-black text-base font-semibold flex gap-4 items-center justify-center focus:outline-none rounded px-5 h-11 hover:bg-gray-50'
                                onClick={signInWithGoogle}
                              >
                                <Image
                                  src='/images/facebook-icon.png'
                                  height={25}
                                  width={25}
                                  className='object-cover'
                                  alt='Facebook Icon'
                                />
                                <span>Continuar con Facebook</span>
                            </button>*/}
                          </div>
                        </div>

                        <div className='w-full text-center px-10 py-2 max-w-[400px] mx-auto text-gray-500 my-6 leading-5'>
                          Al ingresar usted acepta los{' '}
                          <span
                            className='text-blue-500 underline font-semibold'
                            onClick={() => {
                              setShowAuthModal(false);
                              router.push('/terminos-condiciones');
                            }}
                          >
                            Términos y condiciones
                          </span>{' '}
                          de Resix.
                        </div>
                      </div>
                    </section>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
