'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useInviteToOrganisationMutation } from '@/services/invite/mutation';
import { Role } from "@/services/user/api";
import toast from 'react-hot-toast';

const DummyPage = () => {

  const { mutate } = useInviteToOrganisationMutation();
  function handleInvite(){
    toast.success("calling the invite")
    mutate({ 
      email: "random@gmail.com", 
      role: Role.ADMIN, 
      organizationId: "6f789b78-2ba1-4bf2-9c36-7e5e225295a9", 
      teamIds: ["64609568-ec3f-444f-87b8-2c03e36eee27"] 
    }, { 
      onSuccess: () => toast.success("Successfully invited") 
    });
  }
  return (
    <div>
      <Button onClick={handleInvite}>invite</Button>
    </div>
  );
};

export default DummyPage;