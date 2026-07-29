import { requreRole } from '@/lib/core/session';
import React from 'react';

const collaboratorLayout = async ({ children }) => {
    await requreRole('collaborator');
    return children;
};

export default collaboratorLayout;