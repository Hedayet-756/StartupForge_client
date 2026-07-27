import React from 'react';
import StartupProfile from './StartupProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies'; // আপনার ব্যাকএন্ড এপিআই অনুযায়ী এটি অপরিবর্তিত রাখা হয়েছে, চাইলে পরে রিনেম করতে পারেন

const StartupPage = async () => {
    // ১. সম্পূর্ণ ইউজার সেশন অবজেক্ট নেওয়া হলো
    const sessionData = await getUserSession();

    // 💡 ফিক্স: সেশন অবজেক্টের একদম ভেতরে ঢুকে পিওর আইডি স্ট্রিংটি আলাদা করা হচ্ছে
    const targetUserId = sessionData?._id || sessionData?.id || null;

    let startupArray = [];

    // আইডি সঠিকভাবে পাওয়া গেলেই কেবল ব্যাকএন্ডে রিকোয়েস্ট যাবে
    if (targetUserId && typeof targetUserId === 'string') {
        startupArray = await getRecruiterCompany(targetUserId.trim()) || [];
    } else {
        console.log("⚠️ কোনো ভ্যালিড আইডি স্ট্রিং পাওয়া যায়নি!");
    }

    // অ্যারে থেকে প্রথম স্টার্টআপের অবজেক্ট আলাদা করা হচ্ছে
    const singleStartupData = (Array.isArray(startupArray) && startupArray.length > 0)
        ? startupArray[0]
        : null;

    return (
        <div>
            {/* স্টার্টআপ প্রোফাইল কম্পোনেন্টে ইউজার এবং স্টার্টআপ ডেটা পাস করা হলো */}
            <StartupProfile user={sessionData} startup={singleStartupData} />
        </div>
    );
};

export default StartupPage;