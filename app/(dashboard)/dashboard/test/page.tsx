'use client';

import React, { useState } from 'react';
import { api } from '@/utils/axios';

const DummyPage = () => {
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const res = await api.get('/api/user');
      setResponse(res.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const createOrg = async () => {
    const randomName = `Org-${Math.floor(Math.random() * 1000)}`;
    try {
      const res = await api.post('/api/organisation', { name: randomName });
      setResponse(res.data);
    } catch (error) {
      console.log('Error creating organization:', error);
    }
  };

  return (
    <div>
      <h1>Dummy Page</h1>
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        Fetch Data
      </button>


        <button onClick={createOrg} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
          Create Organization
        </button>
        {response && (
          <div className="mt-4">
            <h2>Response:</h2>
           <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
    </div>
  );
};

export default DummyPage;