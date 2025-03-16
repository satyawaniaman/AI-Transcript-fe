import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardLayoutWrapper = ({ children }:{children:React.ReactNode}) => {
  return <DashboardLayout>{children}</DashboardLayout>;
}
export default DashboardLayoutWrapper;