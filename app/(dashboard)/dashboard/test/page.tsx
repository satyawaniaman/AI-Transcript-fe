'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/utils/axios';
import { useGetTeams } from '@/services/teams/query';
import { useGetUser } from '@/services/user/query';
import useCurrentOrg from '@/store/useCurrentOrg';
const DummyPage = () => {
  const [response, setResponse] = useState(null);
  const [teams, setTeams] = useState<any>(null);
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

  const { data: user } = useGetUser();
  const { data: team, isLoading: teamsLoading } = useGetTeams(user?.organizations[0].organization.id || '');
  useEffect(() => {
    console.log("team", team);
    setTeams(team);
  }, [team]);

  const { currentOrg } = useCurrentOrg();

  return (
    <div>
      <h1>Dummy Page { currentOrg ?? currentOrg }</h1>

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
        {teams && (
          <div className="mt-4">
            <h2>Teams:</h2>
            <pre>{JSON.stringify(teams, null, 2)}</pre>
          </div>
        )}
    </div>
  );
};

export default DummyPage;