import React from 'react';

// import { getloggedInRecruiterCompany } from '@/lib/api/companies';


const NewOpportunitys = async () => {

    const companies = await getloggedInRecruiterCompany();
    // 🎯 ফিক্স: serverFetch থেকে company array আসে, তাই প্রথম কোম্পানিটা নিতে হবে
    const company = Array.isArray(companies) ? companies[0] : companies;

    return (
        <div>
            {/* সঠিকভাবে প্রপস পাস করা হলো */}
            <opportunityFrom company={company} />
        </div>
    );
};

export default NewOpportunitys;