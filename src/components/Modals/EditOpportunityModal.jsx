'use client';
import React, { useState, useEffect } from 'react';
import {
    Form, Fieldset, TextField, Label, Input, TextArea, Select, ListBox, Button, FieldError
} from '@heroui/react';
import {
    Briefcase, CircleDollar, Pin, Calendar, ArrowRight, TriangleExclamation, Xmark
} from '@gravity-ui/icons';

const CATEGORIES = [
    { key: 'technology', label: 'Technology & IT' },
    { key: 'design', label: 'Design & Creative' },
    { key: 'marketing', label: 'Marketing & Sales' },
    { key: 'management', label: 'Management & HR' },
];

const TYPES = [
    { key: 'full-time', label: 'Full-time' },
    { key: 'part-time', label: 'Part-time' },
    { key: 'contract', label: 'Contract' },
    { key: 'internship', label: 'Internship' },
];

const CURRENCIES = [
    { key: 'BDT', label: '৳ BDT' },
    { key: 'USD', label: '$ USD' },
    { key: 'EUR', label: '€ EUR' },
];

export default function EditOpportunityModal({ isOpen, onClose, opportunity, onSave }) {
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRemote, setIsRemote] = useState(false);

    const [formData, setFormData] = useState({
        roleTitle: '',
        category: '',
        requiredSkills: '',
        location: '',
        type: '',
        deadline: '',
        minPay: '',
        maxPay: '',
        currency: 'BDT',
        description: '',
    });

    useEffect(() => {
        if (opportunity) {
            const loc = opportunity.workType || opportunity.locationType || opportunity.location || '';
            const remoteCheck = loc === 'Remote';

            setIsRemote(remoteCheck);
            setFormData({
                roleTitle: opportunity.roleTitle || opportunity.title || '',
                category: opportunity.category || '',
                requiredSkills: Array.isArray(opportunity.requiredSkills)
                    ? opportunity.requiredSkills.join(', ')
                    : (opportunity.skills ? opportunity.skills.join(', ') : ''),
                location: remoteCheck ? 'Remote' : loc,
                type: opportunity.commitmentLevel || opportunity.type || '',
                deadline: opportunity.deadline || opportunity.applicationDeadline ? (opportunity.deadline || opportunity.applicationDeadline).split('T')[0] : '',
                minPay: opportunity.minPay || '',
                maxPay: opportunity.maxPay || '',
                currency: opportunity.currency || 'BDT',
                description: opportunity.description || '',
            });
        }
    }, [opportunity]);

    if (!isOpen || !opportunity) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRemoteToggle = (checked) => {
        setIsRemote(checked);
        if (checked) {
            setFormData(prev => ({ ...prev, location: 'Remote' }));
        } else {
            setFormData(prev => ({ ...prev, location: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setIsSubmitted(true);

        if (
            !formData.roleTitle ||
            !formData.category ||
            !formData.requiredSkills ||
            (!isRemote && !formData.location) ||
            !formData.type ||
            !formData.deadline ||
            !formData.description
        ) {
            return;
        }

        setLoading(true);
        try {
            const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);

            const updatedData = {
                ...opportunity,
                ...formData,
                requiredSkills: skillsArray,
                location: isRemote ? 'Remote' : formData.location,
            };

            onSave(updatedData);
            onClose();
        } catch (error) {
            console.error("Error updating opportunity:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* 🎯 পরিবর্তন: items-center এর বদলে items-start এবং py-10 দেওয়া হয়েছে যাতে ওপর থেকে নিচে স্ক্রল করা যায় */
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl relative my-8">

                {/* ক্লোজ বাটন */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer z-10"
                >
                    <Xmark className="size-5" />
                </button>

                <Form onSubmit={handleSubmit} validationBehavior="native" className="space-y-8">
                    <Fieldset className="space-y-6">
                        <div className="border-b border-zinc-900 pb-4 pr-10">
                            <Fieldset.Legend className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                                <Briefcase className="text-indigo-500 size-5" /> Edit Opportunity Details
                            </Fieldset.Legend>
                            <p className="text-xs text-zinc-500 mt-1">
                                Update the standard information for this opportunity role.
                            </p>
                        </div>

                        <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Role Title */}
                            <TextField
                                isRequired
                                isInvalid={isSubmitted && !formData.roleTitle}
                                className="flex flex-col gap-2.5"
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

                            {/* Category */}
                            <Select
                                isRequired
                                isInvalid={isSubmitted && !formData.category}
                                placeholder="Select category"
                                selectedKey={formData.category || null}
                                onSelectionChange={(key) => handleInputChange('category', key)}
                                className="flex flex-col gap-2.5"
                            >
                                <Label className="text-sm text-zinc-400 font-semibold">Category</Label>
                                <Select.Trigger className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <FieldError className="text-xs text-rose-500">Category is required</FieldError>
                                <Select.Popover>
                                    <ListBox>
                                        {CATEGORIES.map((cat) => (
                                            <ListBox.Item key={cat.key} id={cat.key} textValue={cat.label} className="text-zinc-300">
                                                {cat.label}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Required Skills Input */}
                            <TextField
                                isRequired
                                isInvalid={isSubmitted && !formData.requiredSkills}
                                className="flex flex-col gap-2.5 md:col-span-2"
                            >
                                <Label className="text-sm text-zinc-400 font-semibold">Required Skills (Comma separated)</Label>
                                <Input
                                    value={formData.requiredSkills}
                                    onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
                                    placeholder="e.g. React, Node.js, TypeScript"
                                    className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl"
                                />
                                <FieldError className="text-xs text-rose-500">Required skills are required</FieldError>
                            </TextField>

                            {/* Location Field & Remote Toggle */}
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-zinc-400 font-semibold flex items-center gap-1.5">
                                        <Pin className="size-4 text-zinc-500" /> Location
                                    </Label>
                                    <label className="flex items-center gap-2 text-xs text-indigo-400 cursor-pointer font-medium">
                                        <input
                                            type="checkbox"
                                            checked={isRemote}
                                            onChange={(e) => handleRemoteToggle(e.target.checked)}
                                            className="rounded bg-zinc-900 border-zinc-800 text-indigo-600 focus:ring-0 cursor-pointer"
                                        />
                                        Remote Only
                                    </label>
                                </div>
                                <Input
                                    value={formData.location}
                                    disabled={isRemote}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    placeholder={isRemote ? "Remote Position" : "e.g. Dhaka, Bangladesh"}
                                    className={`bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl ${isRemote ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                {isSubmitted && !isRemote && !formData.location && (
                                    <span className="text-xs text-rose-500">Location is required</span>
                                )}
                            </div>

                            {/* Type Select */}
                            <Select
                                isRequired
                                isInvalid={isSubmitted && !formData.type}
                                placeholder="Select job type"
                                selectedKey={formData.type || null}
                                onSelectionChange={(key) => handleInputChange('type', key)}
                                className="flex flex-col gap-2.5"
                            >
                                <Label className="text-sm text-zinc-400 font-semibold">Type</Label>
                                <Select.Trigger className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <FieldError className="text-xs text-rose-500">Type is required</FieldError>
                                <Select.Popover>
                                    <ListBox>
                                        {TYPES.map((t) => (
                                            <ListBox.Item key={t.key} id={t.key} textValue={t.label} className="text-zinc-300">
                                                {t.label}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Deadline */}
                            <TextField
                                isRequired
                                isInvalid={isSubmitted && !formData.deadline}
                                className="flex flex-col gap-2.5"
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

                            {/* Minimum Pay & Maximum Pay */}
                            <div className="flex flex-col gap-2.5">
                                <Label className="text-sm text-zinc-400 font-semibold flex items-center gap-1.5">
                                    <CircleDollar className="size-4 text-zinc-500" /> Compensation Range & Currency
                                </Label>
                                <div className="grid grid-cols-8 gap-2">
                                    <Input
                                        type="number"
                                        value={formData.minPay}
                                        onChange={(e) => handleInputChange('minPay', e.target.value)}
                                        placeholder="Min Pay"
                                        className="col-span-3 bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl text-sm px-3 py-2 w-full"
                                    />
                                    <Input
                                        type="number"
                                        value={formData.maxPay}
                                        onChange={(e) => handleInputChange('maxPay', e.target.value)}
                                        placeholder="Max Pay"
                                        className="col-span-3 bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl text-sm px-3 py-2 w-full"
                                    />
                                    <Select
                                        selectedKey={formData.currency}
                                        onSelectionChange={(key) => handleInputChange('currency', key)}
                                        className="col-span-2 w-full"
                                    >
                                        <Select.Trigger className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl text-xs h-full">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                {CURRENCIES.map((cur) => (
                                                    <ListBox.Item key={cur.key} id={cur.key} textValue={cur.label} className="text-zinc-300">
                                                        {cur.label}
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    <Fieldset className="space-y-6">
                        <div className="border-b border-zinc-900 pb-4">
                            <Fieldset.Legend className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                                <TriangleExclamation className="text-indigo-500 size-5" /> Description & Summary
                            </Fieldset.Legend>
                        </div>

                        <Fieldset.Group className="flex flex-col gap-6">
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
                    <div className="border-t border-zinc-900 pt-6 flex justify-end items-center gap-4">
                        <Button
                            type="button"
                            onPress={onClose}
                            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold rounded-xl px-8 h-11 text-sm flex items-center gap-1.5 cursor-pointer"
                        >
                            Cancel <Xmark className="size-4" />
                        </Button>
                        <Button
                            type="submit"
                            isLoading={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-indigo-600/20 shadow-lg px-10 h-11 text-sm flex items-center gap-1.5 cursor-pointer"
                        >
                            Save Changes <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}