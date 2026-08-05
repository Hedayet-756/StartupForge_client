'use client';
import React, { useState } from 'react';
import {
    Form, Fieldset, TextField, Label, Input, TextArea, Select, ListBox, Button, FieldError
} from '@heroui/react';
import {
    Briefcase, CircleDollar, Pin, Calendar, ArrowRight, Envelope, TriangleExclamation, Xmark, Globe
} from '@gravity-ui/icons';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { createOpportunity } from '@/lib/actions/opportunities';

const WORK_TYPES = [
    { key: 'remote', label: 'Remote' },
    { key: 'onsite', label: 'On-site' },
    { key: 'hybrid', label: 'Hybrid' },
];

const COMMITMENT_LEVELS = [
    { key: 'full-time', label: 'Full-time' },
    { key: 'part-time', label: 'Part-time' },
    { key: 'contract', label: 'Contract' },
    { key: 'internship', label: 'Internship' },
];

export default function OpportunityFrom({ startup }) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        roleTitle: '',
        requiredSkills: '',
        workType: '',
        commitmentLevel: '',
        deadline: '',
        description: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (
            !formData.roleTitle ||
            !formData.requiredSkills ||
            !formData.workType ||
            !formData.commitmentLevel ||
            !formData.deadline ||
            !formData.description
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Publishing opportunity...");

        try {
            // প্রয়োজনীয় স্কিলগুলোকে কমা (comma) দিয়ে স্প্লিট করে অ্যারে বানিয়ে পাঠানো হচ্ছে
            const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);

            const result = await createOpportunity({
                ...formData,
                requiredSkills: skillsArray,
                startupId: startup?._id || startup?.id || null,
                startupName: startup?.startupName || startup?.name || 'Unknown Startup',
                startupLogo: startup?.logoUrl || '',
                isStartupApproved: startup?.isApproved || false,
                recruiterId: session?.user?.id || session?.user?._id || null,
                status: "active",
                createdAt: new Date().toISOString()
            });

            if (result?.insertedId || result?.success) {
                toast.success("New opportunity published successfully!", { id: toastId });
                setIsSubmitted(false);
                setFormData({
                    roleTitle: '',
                    requiredSkills: '',
                    workType: '',
                    commitmentLevel: '',
                    deadline: '',
                    description: '',
                });
            } else {
                toast.error("Failed to publish opportunity.", { id: toastId });
            }
        } catch (error) {
            console.error("Error submitting opportunity:", error);
            toast.error("Something went wrong!", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl space-y-4">
            {/* Company Approval Status */}
            {startup && (
                <div className="flex items-center justify-between gap-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 md:p-5">
                    <div className="flex items-center gap-3">
                        {startup.logoUrl && (
                            <img
                                src={startup.logoUrl}
                                alt={startup.name || 'Company logo'}
                                className="w-10 h-10 rounded-lg object-cover bg-zinc-800"
                            />
                        )}
                        <p className="text-sm font-semibold text-zinc-100">{startup.name || startup.companyName || 'Unknown Company'}</p>
                    </div>

                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {startup.isApproved ? 'Approved' : 'Pending Approval'}
                    </span>
                </div>
            )}

            <div className="w-full bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">

                {startup?.isApproved === false && (
                    <div className="flex flex-col items-center justify-center gap-3 text-center py-20">
                        <TriangleExclamation className="size-10 text-rose-500" />
                        <h3 className="text-lg font-semibold text-zinc-100">Company not approved yet</h3>
                        <p className="text-sm text-zinc-500">Please wait until the company is approved before publishing an opportunity.</p>
                    </div>
                )}

                {(startup?.isApproved || !startup) && (
                    <Form onSubmit={handleSubmit} validationBehavior="native" className="space-y-8">
                        <Fieldset className="space-y-6">
                            <div className="border-b border-zinc-900 pb-4">
                                <Fieldset.Legend className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                                    <Briefcase className="text-indigo-500 size-5" /> Add Opportunity Details
                                </Fieldset.Legend>
                                <p className="text-xs text-zinc-500 mt-1">
                                    Provide explicit and standard information for the new opportunity.
                                </p>
                            </div>

                            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Role Title */}
                                <TextField
                                    isRequired
                                    isInvalid={isSubmitted && !formData.roleTitle}
                                    className="flex flex-col gap-2.5 md:col-span-2"
                                >
                                    <Label className="text-sm text-zinc-400 font-semibold flex items-center gap-1.5">
                                        <Briefcase className="size-4 text-zinc-500" /> Role Title
                                    </Label>
                                    <Input
                                        value={formData.roleTitle}
                                        onChange={(e) => handleInputChange('roleTitle', e.target.value)}
                                        placeholder="e.g. Senior Full Stack Developer"
                                        className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl"
                                    />
                                    <FieldError className="text-xs text-rose-500">Role title is required</FieldError>
                                </TextField>

                                {/* Required Skills */}
                                <TextField
                                    isRequired
                                    isInvalid={isSubmitted && !formData.requiredSkills}
                                    className="flex flex-col gap-2.5 md:col-span-2"
                                >
                                    <Label className="text-sm text-zinc-400 font-semibold">Required Skills (Comma separated)</Label>
                                    <Input
                                        value={formData.requiredSkills}
                                        onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
                                        placeholder="e.g. React, Node.js, TypeScript, MongoDB"
                                        className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl"
                                    />
                                    <FieldError className="text-xs text-rose-500">Required skills are required</FieldError>
                                </TextField>

                                {/* Work Type Select */}
                                <Select
                                    isRequired
                                    isInvalid={isSubmitted && !formData.workType}
                                    placeholder="Select work type"
                                    value={formData.workType || null}
                                    onChange={(key) => handleInputChange('workType', key)}
                                    className="flex flex-col gap-2.5"
                                >
                                    <Label className="text-sm text-zinc-400 font-semibold flex items-center gap-1.5">
                                        <Globe className="size-4 text-zinc-500" /> Work Type
                                    </Label>
                                    <Select.Trigger className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <FieldError className="text-xs text-rose-500">Work type is required</FieldError>
                                    <Select.Popover>
                                        <ListBox>
                                            {WORK_TYPES.map((wt) => (
                                                <ListBox.Item key={wt.key} id={wt.key} textValue={wt.label} className="text-zinc-300">
                                                    {wt.label}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                {/* Commitment Level Select */}
                                <Select
                                    isRequired
                                    isInvalid={isSubmitted && !formData.commitmentLevel}
                                    placeholder="Select commitment level"
                                    value={formData.commitmentLevel || null}
                                    onChange={(key) => handleInputChange('commitmentLevel', key)}
                                    className="flex flex-col gap-2.5"
                                >
                                    <Label className="text-sm text-zinc-400 font-semibold">Commitment Level</Label>
                                    <Select.Trigger className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <FieldError className="text-xs text-rose-500">Commitment level is required</FieldError>
                                    <Select.Popover>
                                        <ListBox>
                                            {COMMITMENT_LEVELS.map((cl) => (
                                                <ListBox.Item key={cl.key} id={cl.key} textValue={cl.label} className="text-zinc-300">
                                                    {cl.label}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                {/* Deadline */}
                                <TextField
                                    isRequired
                                    isInvalid={isSubmitted && !formData.deadline}
                                    className="flex flex-col gap-2.5 md:col-span-2"
                                >
                                    <Label className="text-sm text-zinc-400 font-semibold flex items-center gap-1.5">
                                        <Calendar className="size-4 text-zinc-500" /> Deadline
                                    </Label>
                                    <Input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                                        className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl w-full"
                                    />
                                    <FieldError className="text-xs text-rose-500">Deadline date is required</FieldError>
                                </TextField>
                            </Fieldset.Group>
                        </Fieldset>

                        <Fieldset className="space-y-6">
                            <div className="border-b border-zinc-900 pb-4">
                                <Fieldset.Legend className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                                    <TriangleExclamation className="text-indigo-500 size-5" /> Description & Summary
                                </Fieldset.Legend>
                            </div>

                            <Fieldset.Group className="flex flex-col gap-6">
                                {/* Description */}
                                <TextField
                                    isRequired
                                    isInvalid={isSubmitted && !formData.description}
                                    className="flex flex-col gap-2.5 w-full"
                                >
                                    <Label className="text-sm text-zinc-400 font-semibold">Opportunity Description</Label>
                                    <TextArea
                                        rows={5}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Explain the scope and responsibilities of this opportunity..."
                                        className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl p-3 focus:border-indigo-500 text-sm"
                                    />
                                    <FieldError className="text-xs text-rose-500">Description is required</FieldError>
                                </TextField>
                            </Fieldset.Group>
                        </Fieldset>

                        {/* Actions */}
                        <div className="border-t border-zinc-900 pt-10 mt-6 flex justify-end items-center gap-4">
                            <Button type="button" onPress={() => window.history.back()} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold rounded-xl px-8 h-11 text-sm flex items-center gap-1.5">Cancel <Xmark className="size-4" /></Button>
                            <Button type="submit" isLoading={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-indigo-600/20 shadow-lg px-10 h-11 text-sm flex items-center gap-1.5">
                                Publish Opportunity <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
}