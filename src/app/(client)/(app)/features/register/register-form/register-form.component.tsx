'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/app/(client)/(app)/shared/ui/form'
import { Input } from '../../../shared/ui/input'
import { Button } from '../../../shared/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IRegisterForm, RegisterFormSchema } from './register-form.interface'
import { registerMutationOptions } from '../../../entities/api/auth/auth.mutations'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { authClient } from '@/pkg/integrations/better-auth/lib/auth-client'
import { Github } from 'lucide-react'

export default function RegisterFormComponent() {
  const t = useTranslations('register')
  const { mutateAsync: register, isPending } = useMutation(registerMutationOptions())
  const router = useRouter()

  const form = useForm<IRegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterFormSchema),
  })

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const response = await register(data)

      if (response.success) {
        router.push('/')
      } else if (response?.error?.message) {
        setError('root', {
          message: response.error.message,
        })
      }
    } catch (error: unknown) {
      toast.error(error as string)
    }
  }

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({ provider: 'github' })
  }

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    })
  }
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex max-w-md min-w-[60%] flex-col items-center justify-center space-y-4 rounded-lg border bg-white p-6 shadow-sm md:min-w-[40%]'
        >
          <h1 className='mb-4 text-2xl font-bold'>{t('title')}</h1>

          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{t('name')}</FormLabel>

                <FormControl>
                  <Input placeholder={t('name')} {...field} />
                </FormControl>

                <FormMessage className='text-sm text-red-500'>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{t('email')}</FormLabel>

                <FormControl>
                  <Input type='email' placeholder={t('email')} {...field} />
                </FormControl>

                <FormMessage className='text-sm text-red-500'>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{t('password')}</FormLabel>

                <FormControl>
                  <Input type='password' placeholder={t('password')} {...field} />
                </FormControl>

                <FormMessage className='text-sm text-red-500'>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{t('password')}</FormLabel>

                <FormControl>
                  <Input type='password' placeholder={t('confirm_password')} {...field} />
                </FormControl>

                <FormMessage className='text-sm text-red-500'>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          {errors.root && <p className='text-sm text-red-500'>{errors.root.message}</p>}

          <Button type='submit'>{isPending ? t('signingUp') : t('signUpButton')}</Button>

          <p className='mt-2 text-sm'>
            {t('haveAccount')}

            <Link href='/login' className='text-blue-600 hover:underline'>
              {t('login')}
            </Link>
          </p>

          <Button type='button' onClick={handleGoogleSignIn}>
            <FcGoogle /> Sign in with Google
          </Button>

          <Button type='button' onClick={handleGithubSignIn}>
            Sign in with GitHub <Github />
          </Button>
        </form>
      </Form>
    </div>
  )
}
