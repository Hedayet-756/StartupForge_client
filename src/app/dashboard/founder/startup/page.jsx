import React from 'react';
import StartupProfile from './StartupProfile';
import { getUserSession } from '@/lib/core/session';
import { getFounderStartup } from '@/lib/api/startups';


const StartupPage = async () => {
    const sessionData = await getUserSession();

    const targetUserId = sessionData?._id || sessionData?.id || null;

    let response = [];

    // আইডি সঠিকভাবে পাওয়া গেলেই কেবল ব্যাকএন্ডে রিকোয়েস্ট যাবে
    if (targetUserId && typeof targetUserId === 'string') {
        response = await getFounderStartup(targetUserId.trim()) || [];
    } else {
        console.log("⚠️ Not found any valid startup founder ID!");
    }
    // অ্যারে থেকে প্রথম স্টার্টআপের অবজেক্ট আলাদা করা হচ্ছে
    let singleStartupData = null;
    if (Array.isArray(response)) {
        singleStartupData = response[0];
    } else if (response?.startups && Array.isArray(response.startups)) {
        singleStartupData = response.startups[0];
    } else if (response?.data && Array.isArray(response.data)) {
        singleStartupData = response.data[0];
    } else if (response && typeof response === 'object') {
        singleStartupData = response;
    }
    // console.log("SESSION DATA:", sessionData);
    // console.log("TARGET USER ID:", targetUserId);
    // console.log("STARTUP ARRAY:", startupArray);
    // console.log("SINGLE STARTUP DATA:", singleStartupData);

    return (
        <div>
            <StartupProfile user={sessionData} startup={singleStartupData} />
        </div>
    );
};

export default StartupPage;