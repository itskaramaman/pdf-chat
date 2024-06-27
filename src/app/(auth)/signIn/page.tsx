"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const SignInPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
      return;
    }
    const fetchSignInProviders = async () => {
      try {
        const response = await axios.get("/api/auth/providers");
        if (response.status === 200) {
          setProviders(Object.values(response.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignInProviders();
  }, [setProviders, session, router]);

  if (loading) return <Spinner />;

  return (
    <MaxWidthWrapper className="flex justify-center mt-20">
      <div className="w-4/12 border rounded-md shadow-md p-5 flex flex-col gap-2">
        <h1 className="text-2xl">Sign In</h1>
        <Input type="email" placeholder="Email" required={true} />
        <Input type="password" placeholder="Password" required={true} />
        <Button className="bg-blue-500 hover:bg-blue-600">Login</Button>
        <hr />
        <div className="flex justify-between">
          {providers.map((provider) => (
            <div key={provider.name}>
              <Button variant="secondary" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SignInPage;
