"use client";

import React, { useState } from "react";
import { Button, Card } from "@heroui/react";
import { Check, Star, Rocket, CrownDiamond, Briefcase } from "@gravity-ui/icons";

const PricingCard = ({ plan }) => (
    <Card className="p-6 w-full shadow-md border border-gray-200 bg-background text-foreground">
        <div className="flex items-start justify-between mb-4">
            <div>
                <h2 className="text-2xl font-bold">
                    {plan.title}
                </h2>

                <p className="text-4xl font-extrabold mt-2">
                    {plan.price}
                    <span className="text-lg font-medium text-gray-500">
                        {plan.duration}
                    </span>
                </p>
            </div>

            <div className="items-end p-2 relative">
                {plan.popular && (
                    <span className="rounded-md bg-gradient-to-r from-violet-600 to-blue-600 px-2 py-0.5 text-xs font-semibold text-white shadow absolute -top-9 right-23 w-28 text-center">
                        ⭐ Most Popular
                    </span>
                )}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-default-100">
                    {plan.icon}
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2">
                {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        {/* এখানে <Icon> বাদ দিয়ে সরাসরি <Check /> ব্যবহার করুন */}
                        <Check size={16} className="text-blue-600" />
                        {f}
                    </li>
                ))}
            </ul>
            <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plan_id" value={plan.id} />
                <section>
                    <button type="submit" role="link" color="primary"
                        variant="solid"
                        className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                        Checkout
                    </button>
                </section>
            </form>
        </div>
    </Card>
);

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState("seekers");

    const pricingData = {
        collaborators: [
            { id: 'collaborator_free', title: "Free", price: "$0", duration: "/forever", icon: <Briefcase className="w-7 h-7 text-blue-500" />, features: ["Browse & save up to 10 jobs", "Apply to up to 3 jobs/mo", "Basic profile", "Email alerts"] },
            { id: 'collaborator_pro', title: "Pro", price: "$19", duration: "/month", popular: true, icon: <Rocket className="w-7 h-7 text-violet-500" />, features: ["Apply to up to 30 jobs/mo", "Unlimited saved jobs", "Application tracking", "Salary insights"] },
            { id: 'collaborator_premium', title: "Premium", price: "$39", duration: "/month", icon: <CrownDiamond className="w-7 h-7 text-amber-500" />, features: ["Everything in Pro", "Unlimited applications", "Profile boost", "Priority support"] },
        ],
        founders: [
            { id: 'founder_free', title: "Free", price: "$0", duration: "/forever", icon: <Briefcase className="w-7 h-7 text-blue-500" />, features: ["Up to 3 active job posts", "Basic applicant management", "Standard visibility"] },
            { id: 'founder_growth', title: "Growth", price: "$49", duration: "/month", popular: true, icon: <Rocket className="w-7 h-7 text-violet-500" />, features: ["Up to 10 active job posts", "Applicant tracking", "Basic analytics", "Email support"] },
            { id: 'founder_enterprise', title: "Enterprise", price: "$149", duration: "/month", icon: <CrownDiamond className="w-7 h-7 text-amber-500" />, features: ["Up to 50 active job posts", "Advanced analytics", "Featured listings", "Priority support"] },],
    };

    const currentPlans = activeTab === "collaborators" ? pricingData.collaborators : pricingData.founders;

    return (
        <div className="flex flex-col items-center py-12 px-4 pt-20 max-w-6xl mx-auto w-11/12">
            <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>

            {/* Custom Tab Switcher */}
            <div className="flex bg-default-100 p-1 rounded-full mb-8">
                <button
                    onClick={() => setActiveTab("collaborators")}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === "collaborators" ? "bg-blue-600 hover:bg-blue-700 text-white shadow" : "text-gray-400 hover:text-white"
                        }`}
                >
                    For collaborators
                </button>
                <button
                    onClick={() => setActiveTab("founders")}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === "founders" ? "bg-blue-600 hover:bg-blue-700 text-white shadow" : "text-gray-400 hover:text-white"
                        }`}
                >
                    For founders
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 w-full mt-2">
                {currentPlans.map((plan, i) => (
                    <PricingCard key={i} plan={plan} />
                ))}
            </div>
        </div>
    );
}