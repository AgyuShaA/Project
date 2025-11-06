'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/app/(client)/(app)/shared/ui/form'
import { Input } from '../../../shared/ui/input'
import { Button } from '../../../shared/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ILoginForm, LoginFormSchema } from './login-form.interface'
import { useMutation } from '@tanstack/react-query'
import { loginMutationOptions } from '../../../entities/api/auth/auth.mutations'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { authClient } from '@/pkg/integrations/better-auth/lib/auth-client'
import { FcGoogle } from 'react-icons/fc'

export default function LoginFormComponent() {
  const t = useTranslations('login')
  const { mutateAsync: login, isPending } = useMutation(loginMutationOptions())
  const router = useRouter()

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    })
  }

  const form = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  })

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form

  const onSubmit = async (data: ILoginForm) => {
    try {
      const res = await login(data)

      if (res.success) {
        router.push('/')
      } else if (res?.error?.message) {
        setError('root', {
          message: res.error.message,
        })
      }
    } catch (error: unknown) {
      toast.error(error as string)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex max-w-md min-w-[60%] flex-col items-center justify-center space-y-4 rounded-lg border bg-white p-6 shadow-sm md:min-w-[35%]'
        >
          <h1 className='mb-4 text-2xl font-bold'>{t('title')}</h1>

          <FormField
            name='email'
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

          {errors.root && <p className='text-sm text-red-500'>{errors.root.message}</p>}

          <Button type='submit' disabled={isPending}>
            {isPending ? t('signingIn') : t('signInButton')}
          </Button>

          <p className='mt-2 text-sm'>
            {t('noAccount')}

            <Link href='/register' className='text-blue-600 hover:underline'>
              {t('register')}
            </Link>
          </p>
          <Button type='button' onClick={handleSignIn}>
            <FcGoogle /> Sign in with
          </Button>
        </form>
      </Form>
    </div>
  )
}
