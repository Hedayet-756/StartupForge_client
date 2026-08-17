import StartupsTable from '@/components/startupsTable';
import { getStartups } from '@/lib/api/startups';

import React from 'react';

const AdminStartupPage = async () => {
    const startups = await getStartups();
    // console.log(startups);
    return (
        <div>
            <h1 className="text-2xl font-bold">Companies Registrations</h1>
            <p className="text-zinc-400 mb-4">
                Review and manage company registrations.
            </p>
            <StartupsTable startups={startups} />
        </div>
    );
};

export default AdminStartupPage;