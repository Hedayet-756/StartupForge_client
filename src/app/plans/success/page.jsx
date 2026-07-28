
import { redirect } from 'next/navigation'
import { CircleCheck } from '@gravity-ui/icons'
import { createSubscription } from '@/lib/actions/subscription'
import { stripe } from '@/lib/stripe'


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (session.status === 'open') {
        return redirect('/')
    }

    if (session.status === 'complete') {
        const { metadata } = session;
        const subsInfo = {
            email: session.customer_details.email,
            plan: metadata.planId,
        }

        // 🚀 update the user table about the new plan
        const result = await createSubscription(subsInfo);
        console.log("Subscription created:", result);

        return (
            <section className="min-h-screen flex items-center justify-center bg-black p-6 pt-20">
                <div className="max-w-md w-full bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl text-center text-white">
                    {/* সাকসেস আইকন */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-600/20 p-3 rounded-full">
                            <CircleCheck size={48} className="text-green-500" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                    <p className="text-gray-400 mb-6">
                        We appreciate your business! A confirmation email will be sent to
                        <span className="block font-semibold text-white mt-1">
                            {session.customer_details.email}
                        </span>
                    </p>

                    <div className="bg-black p-4 rounded-xl mb-6 text-sm text-gray-500">
                        If you have any questions, please email <br />
                        <a href="mailto:support@hireloop.com" className="text-blue-400 hover:underline">
                            support@hireloop.com
                        </a>
                    </div>

                    <a
                        href="/"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        Back to Dashboard
                    </a>
                </div>
            </section>
        )
    }
}