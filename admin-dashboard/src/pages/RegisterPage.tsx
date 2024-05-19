import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/http/api';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log('Register successful.');
      navigate('/dashboard/home');
    },
  });

  const handleRegisterSubmit = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      return alert('Invalid input.');
    }

    mutation.mutate({ name, email, password });
  };
  return (
    <section className='flex justify-center items-center h-screen'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account <br />
            {mutation.isError && (
              <span className='text-red-500 text-sm'>
                {mutation.error.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='first-name'>Name</Label>
              <Input ref={nameRef} id='first-name' placeholder='Max' required />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                ref={emailRef}
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input ref={passwordRef} id='password' type='password' />
            </div>
            <Button
              onClick={handleRegisterSubmit}
              type='submit'
              className='w-full'
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className='animate-spin' />}
              Create an account
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to={'/auth/login'} className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
