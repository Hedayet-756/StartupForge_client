import { getloggedInFounderStartup } from '@/lib/api/startups';
import React from 'react';
import OpportunityFrom from './Opportunities';

const NewOpportunitys = async () => {

    const startups = await getloggedInFounderStartup();
    // 🎯 ফিক্স: serverFetch থেকে company array আসে, তাই প্রথম কোম্পানিটা নিতে হবে
    const startup = Array.isArray(startups) ? startups[0] : startups;

    return (
        <div>
            {/* সঠিকভাবে প্রপস পাস করা হলো */}
            <OpportunityFrom startup={startup} />
        </div>
    );
};

export default NewOpportunitys;