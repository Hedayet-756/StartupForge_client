import Link from 'next/link';
import { Lock } from '@gravity-ui/icons';

export default function Unauthorized() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black p-6 pt-16">
            <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-10 rounded-3xl shadow-2xl text-center">
                {/* আইকন */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/10 p-4 rounded-full">
                        <Lock size={48} className="text-red-500" />
                    </div>
                </div>

                {/* স্ট্যাটাস কোড ও মেসেজ */}
                <h1 className="text-6xl font-extrabold text-white mb-2">401</h1>
                <h2 className="text-2xl font-bold text-white mb-4">Unauthorized Access</h2>
                <p className="text-gray-400 mb-8">
                    Sorry, you do not have the necessary permissions to view this page. Please log in with the correct account or try again later.
                </p>

                {/* বাটন */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/auth/signup"
                        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600 transition-colors">
                        Sign Up
                    </Link>

                    <Link
                        href="/"
                        className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-xl transition-all"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}