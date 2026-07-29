import Link from 'next/link';
import { ShieldExclamation } from '@gravity-ui/icons';

export default function Forbidden() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black p-6 pt-16">
            <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-10 rounded-3xl shadow-2xl text-center">
                {/* আইকন */}
                <div className="flex justify-center mb-6">
                    <div className="bg-yellow-500/10 p-4 rounded-full">
                        <ShieldExclamation size={48} className="text-yellow-500" />
                    </div>
                </div>

                {/* স্ট্যাটাস কোড ও মেসেজ */}
                <h1 className="text-6xl font-extrabold text-white mb-2">403</h1>
                <h2 className="text-2xl font-bold text-white mb-4">Access Forbidden</h2>
                <p className="text-gray-400 mb-8">
                    Access to this resource is denied. You do not have the necessary permissions to access this specific area.
                </p>

                {/* বাটন */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                    >
                        Return to Home
                    </Link>

                    <Link
                        href="/dashboard"
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </section>
    );
}