import { requreRole } from '@/lib/core/session';
import React from 'react';

const FounderLayout = async ({ children }) => {
    await requreRole('founder');
    return children;
};

export default FounderLayout;