"use client";
import { useUser } from '@/context/UserContext';
import { signInUser } from '@/utils/auth/auth';
import { supabase } from '@/utils/supabaseClient';
import React, { useState } from 'react'

const SignIn = () => {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
        if (error || !data.session) {
          console.error('Login failed:', error);
          return;
        }
    
        const accessToken = data.session.access_token;
    
        try {
          const user = await signInUser(accessToken);
          setUser({
            ...user,
            accessToken,
          });
        } catch (err) {
          console.error('Backend login error:', err);
        }
      };
      return (
        <div className="p-4 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Log In</h2>
    
          <input
            type="email"
            placeholder="Email"
            className="mb-2 w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
    
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
    );
};

export default SignIn