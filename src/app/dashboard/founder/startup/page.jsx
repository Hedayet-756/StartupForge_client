import React from 'react';
import StartupProfile from './StartupProfile';
import { getUserSession } from '@/lib/core/session';
import { getFounderStartup } from '@/lib/api/founders';


const StartupPage = async () => {
    const sessionData = await getUserSession();

    const targetUserId = sessionData?._id || sessionData?.id || null;

    let startupArray = [];

    // আইডি সঠিকভাবে পাওয়া গেলেই কেবল ব্যাকএন্ডে রিকোয়েস্ট যাবে
    if (targetUserId && typeof targetUserId === 'string') {
        startupArray = await getFounderStartup(targetUserId.trim()) || [];
    } else {
        console.log("⚠️ Not found any valid startup founder ID!");
    }
    // অ্যারে থেকে প্রথম স্টার্টআপের অবজেক্ট আলাদা করা হচ্ছে
    const singleStartupData = (Array.isArray(startupArray) && startupArray.length > 0)
        ? startupArray[0]
        : null;
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