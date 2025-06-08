"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebaseConfig"; // your Firebase client SDK config
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/auth"); // redirect if not logged in
        return;
      }

      const tokenResult = await user.getIdTokenResult();
      if (tokenResult.claims.role !== "admin") {
        router.push("/unauthorized"); // redirect if no admin rights
        return;
      }

      setUserEmail(user.email);
    });

    return () => unsubscribe();
  }, [router]);

  if (!userEmail) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, <strong>{userEmail}</strong>! You have admin access.</p>
    </div>
  );
}
