"use client"; // এটি আবশ্যিক
import { cancelApplication } from '@/lib/actions/application';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CancelButton({ applicationId }) {
    const router = useRouter();

    const handleCancel = async () => {
        try {
            await cancelApplication(applicationId);
            toast.success("Application cancelled successfully");
            router.refresh(); // ডাটা আপডেট করার জন্য পেজ রিফ্রেশ করুন
        } catch (error) {
            toast.error("Failed to cancel application");
        }
    };

    return (
        <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white text-sm"
        >
            Cancel
        </button>
    );
}