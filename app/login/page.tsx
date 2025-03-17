"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from "react-hot-toast";
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import zod from "zod";

const Login = () => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get form data from the form elements
    const formData = {
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      password: (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value
    };
    
    try {
      // Validate form data against schema
      schema.parse(formData);
      
      // If validation passes, proceed with login
      toast.success("Logged in successfully! Welcome back to SalesCoach.guru.");
      // Redirect to dashboard
      navigate.push('/dashboard');
    } catch (error) {
      if (error instanceof zod.ZodError) {
        // Extract and set validation errors
        const newErrors = { email: '', password: '' };
        
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof typeof newErrors;
          if (path in newErrors) {
            newErrors[path] = err.message;
          }
        });
        
        setErrors(newErrors);
        toast.error("Please fix the form errors");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              asChild
            >
              <Link href="/" className="flex items-center text-navy-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to home
              </Link>
            </Button>
            
            <h1 className="text-2xl font-bold text-navy-800 mb-2">Welcome back</h1>
            <p className="text-gray-600">Log in to your SalesCoach.guru account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" required />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgotPassword" className="text-sm text-[#0284c7] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Log in
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-gray-500 text-sm">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast.success("This would connect to Google OAuth in the full implementation.");
                navigate.push('/dashboard');
              }}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                </g>
              </svg>
              Log in with Google
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#0284c7] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
