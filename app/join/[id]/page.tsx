"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { ArrowLeft, Building, User, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleSignin from "@/app/login/GoogleSignin";
import zod from "zod";

// Define invitation details type
interface InvitationDetails {
  id: string;
  organizationName: string;
  inviterName: string;
  inviterRole: string;
  invitationMessage?: string;
}

// Define auth response type
interface AuthResponse {
  success: boolean;
  error?: boolean;
  message?: string;
}

const JoinPage = () => {
  const params = useParams();
  const invitationId = params.id as string;

  // State to determine which form to show (login or signup)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [invitationDetails, setInvitationDetails] =
    useState<InvitationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvitationDetails = async () => {
      try {
        // Replace with your actual API call
        const details = await fetchInvitationDetails(invitationId);
        setInvitationDetails(details);
      } catch (error) {
        console.error("Failed to fetch invitation details:", error);
        toast.error("Could not load invitation details");
      } finally {
        setLoading(false);
      }
    };

    if (invitationId) {
      getInvitationDetails();
    }
  }, [invitationId]);

  // Mock function to fetch invitation details - replace with your actual API call
  const fetchInvitationDetails = async (
    invitationId: string
  ): Promise<InvitationDetails> => {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: invitationId,
      organizationName: "SalesCoach Enterprise",
      inviterName: "John Smith",
      inviterRole: "Sales Manager",
      invitationMessage:
        "Join our sales team on SalesCoach.guru to boost your productivity!",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            <p>Loading invitation details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left column: Invitation info */}
            <div>
              <Button variant="ghost" size="sm" className="mb-4" asChild>
                <Link href="/" className="flex items-center text-navy-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to home
                </Link>
              </Button>

              {invitationDetails && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-navy-800 mb-3">
                    Youve been invited to join SalesCoach.guru
                  </h2>

                  <div className="flex items-start space-x-2 mb-2">
                    <Building className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy-700 text-sm">
                        Organization
                      </p>
                      <p className="text-gray-600 text-sm">
                        {invitationDetails.organizationName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-3">
                    <User className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy-700 text-sm">
                        Invited by
                      </p>
                      <p className="text-gray-600 text-sm">
                        {invitationDetails.inviterName} (
                        {invitationDetails.inviterRole})
                      </p>
                    </div>
                  </div>

                  {invitationDetails.invitationMessage && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="italic text-gray-600 text-sm">
                        {invitationDetails.invitationMessage}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Toggle buttons */}
              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  variant={isLoggedIn ? "default" : "outline"}
                  onClick={() => setIsLoggedIn(true)}
                  size="sm"
                  className="w-28"
                >
                  Login
                </Button>
                <Button
                  variant={!isLoggedIn ? "default" : "outline"}
                  onClick={() => setIsLoggedIn(false)}
                  size="sm"
                  className="w-28"
                >
                  Sign Up
                </Button>
              </div>
            </div>

            {/* Right column: Form */}
            <div className="bg-white rounded-lg shadow-md p-5">
              {isLoggedIn ? (
                <LoginForm
                  invitationId={invitationId}
                  invitationDetails={invitationDetails}
                />
              ) : (
                <SignupForm
                  invitationId={invitationId}
                  invitationDetails={invitationDetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Define props for form components
interface FormProps {
  invitationId: string;
  invitationDetails: InvitationDetails | null;
}

// Login Form Component
const LoginForm: React.FC<FormProps> = ({
  invitationId,
  invitationDetails,
}) => {
  console.log(invitationId, invitationDetails);
  const schema = zod.object({
    email: zod.string().email("Please enter a valid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Get form data from the form elements
    const formData = {
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      password: (
        e.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    try {
      // Validate form data against schema
      schema.parse(formData);

      // Simulate login success
      const response: AuthResponse = { success: true };

      if (!response.success) {
        toast.error("Login failed. Please check your credentials.");
      } else {
        toast.success("Logged in successfully!");
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof zod.ZodError) {
        // Extract and set validation errors
        const newErrors = { email: "", password: "" };

        error.errors.forEach((err) => {
          const path = err.path[0] as keyof typeof newErrors;
          if (path in newErrors) {
            newErrors[path] = err.message;
          }
        });

        setErrors(newErrors);
        toast.error("Please fix the form errors");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-navy-800 mb-1">Welcome back</h1>
        <p className="text-gray-600 text-sm">Log in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" required />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgotPassword"
                className="text-xs text-[#0284c7] hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <Input id="password" type="password" required />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Log in"
          )}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-gray-500 text-xs">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleSignin />
        </div>
      </form>
    </div>
  );
};

// Signup Form Component
const SignupForm: React.FC<FormProps> = ({
  invitationId,
  invitationDetails,
}) => {
  console.log(invitationId);
  const schema = zod.object({
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    email: zod.string().email("Please enter a valid email address"),
    password: zod
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must include a number")
      .regex(/[^a-zA-Z0-9]/, "Password must include a symbol"),
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Get form data from the form elements
    const formData = {
      firstName: (
        e.currentTarget.elements.namedItem("firstName") as HTMLInputElement
      ).value,
      lastName: (
        e.currentTarget.elements.namedItem("lastName") as HTMLInputElement
      ).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      password: (
        e.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    try {
      // Validate form data against schema
      schema.parse(formData);

      // This would be your actual registration action
      // const response = await registerUser({
      //   ...formData,
      //   invitationId
      // });

      // Simulate registration success
      const response: AuthResponse = { success: true };

      if (!response.success) {
        toast.error("Registration failed. Please try again.");
      } else {
        toast.success("Account created successfully!");
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof zod.ZodError) {
        // Extract and set validation errors
        const newErrors = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        };

        error.errors.forEach((err) => {
          const path = err.path[0] as keyof typeof newErrors;
          if (path in newErrors) {
            newErrors[path] = err.message;
          }
        });

        setErrors(newErrors);
        toast.error("Please fix the form errors");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-navy-800 mb-1">Create account</h1>
        <p className="text-gray-600 text-sm">
          Join {invitationDetails?.organizationName || "SalesCoach.guru"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-sm">
                First name
              </Label>
              <Input id="firstName" required className="h-9" />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-sm">
                Last name
              </Label>
              <Input id="lastName" required className="h-9" />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">
              Email address
            </Label>
            <Input id="email" type="email" required className="h-9" />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <Input id="password" type="password" required className="h-9" />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with a number and symbol.
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-gray-500 text-xs">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleSignin />
        </div>
      </form>

      <p className="mt-3 text-center text-xs text-gray-500">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-navy-700 hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-navy-700 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default JoinPage;
