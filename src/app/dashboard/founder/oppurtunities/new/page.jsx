import { getloggedInFounderStartup } from '@/lib/api/startups';
import React from 'react';
import OpportunityFrom from './Opportunities';

const NewOpportunitys = async () => {
    const response = await getloggedInFounderStartup();
    console.log("Full response from server:", response);

    let startup = null;
    if (Array.isArray(response)) {
        startup = response[0];
    } else if (response?.startups && Array.isArray(response.startups)) {
        startup = response.startups[0];
    } else if (response?.data && Array.isArray(response.data)) {
        startup = response.data[0];
    } else {
        startup = response;
    }

    console.log("Processed startup object:", startup);

    return (
        <div>
            <OpportunityFrom startup={startup} />
        </div>
    );
};

export default NewOpportunitys;