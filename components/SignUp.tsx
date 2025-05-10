'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { createUser } from '@/utils/auth/auth';
import { useUser } from '@/context/UserContext';

const SignUp = () => {
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.session) {
      console.error('Signup failed:', error);
      return;
    }

    const accessToken = data.session.access_token;

    try {
      const response = await createUser(accessToken, {
        email,
        name,
        username,
        profilePicture: '',
        favoriteSport,
        favoriteTeam,
      });

      setUser({
        ...response,
        accessToken,
      });
    } catch (err) {
      console.error('Backend user creation failed:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

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
        className="mb-2 w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Name"
        className="mb-2 w-full border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Username"
        className="mb-2 w-full border p-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Favorite Sport"
        className="mb-2 w-full border p-2"
        value={favoriteSport}
        onChange={(e) => setFavoriteSport(e.target.value)}
      />

      <input
        type="text"
        placeholder="Favorite Team"
        className="mb-4 w-full border p-2"
        value={favoriteTeam}
        onChange={(e) => setFavoriteTeam(e.target.value)}
      />

      <button
        className="bg-red-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSignUp}
      >
        Create Account
      </button>
    </div>
  );
};

export default SignUp;
