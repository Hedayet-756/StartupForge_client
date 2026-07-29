import { requreRole } from '@/lib/core/session';
import React from 'react';

const AdminDashboardLayout = async ({ children }) => {
    await requreRole('admin');
    return children;
};

export default AdminDashboardLayout;