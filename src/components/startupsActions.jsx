"use client";
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Check, Xmark } from '@gravity-ui/icons'; // Xmark ব্যবহার করছি Reject এর জন্য
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { updateStartup } from '@/lib/actions/founders';


export default function StartupsActions({ startupId, isApproved }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAction = async (status) => {
        setLoading(true);
        try {
            // আপনার এপিআই বডি অনুযায়ী ডাটা পাঠানো হচ্ছে
            const updatedData = { isApproved: status };
            await updateStartup(startupId, updatedData);

            toast.success(`Company ${status ? 'approved' : 'rejected'} successfully`);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            {/* অ্যাপ্রুভ বাটন: ক্লিক করলে isApproved: true হবে */}
            {!isApproved && (
                <Button
                    size="sm"
                    className="bg-success/10 border border-success/50 text-success hover:bg-success/20"
                    variant="flat"
                    isLoading={loading}
                    onClick={() => handleAction(true)}
                    startContent={<Check size={16} />}
                >
                    Approve
                </Button>
            )}

            {/* রিজেক্ট বাটন: ক্লিক করলে isApproved: false হবে */}
            {isApproved && (
                <Button
                    size="sm"
                    className="bg-danger/10 border border-danger/50 text-danger hover:bg-danger/20"
                    variant="flat"
                    isLoading={loading}
                    onClick={() => handleAction(false)}
                    startContent={<Xmark size={16} />}
                >
                    Reject
                </Button>
            )}
        </div>
    );
}