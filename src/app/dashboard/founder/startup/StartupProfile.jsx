'use client';
import React, { useState } from 'react';
import {
    Form, Fieldset, TextField, Label, Input, TextArea, Select, ListBox, Button, FieldError
} from '@heroui/react';
import {
    Briefcase, Pin, ArrowRight, Check, TriangleExclamation, Xmark, Gear, Person, ArrowUpFromLine, Globe, Link as LinkIcon
} from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { createStartup } from '@/lib/actions/founders';

const INDUSTRIES = [
    { key: 'technology', label: 'Technology & IT' },
    { key: 'design', label: 'Design & Creative' },
    { key: 'marketing', label: 'Marketing & Sales' },
    { key: 'management', label: 'Management & HR' },
];

export default function StartupProfile({ user, startup }) {
    const [hasStartup, setHasStartup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadMethod, setUploadMethod] = useState("file");

    const [startupData, setStartupData] = useState({
        name: '',
        logoUrl: '',
        industry: '',
        location: '',
        employeeCount: '',
        website: '',
        description: '',
        isApproved: false,
    });

    const handleInputChange = (field, value) => {
        setStartupData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    React.useEffect(() => {
        if (startup && typeof startup === 'object' && Object.keys(startup).length > 0) {
            setStartupData(startup);
            setHasStartup(true);
        } else {
            setHasStartup(false);
        }
    }, [startup]);

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
        if (!IMGBB_API_KEY) {
            toast.error("API Key খুঁজে পাওয়া যায়নি!");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        setUploadingImage(true);
        const toastId = toast.loading("Uploading logo...");

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                handleInputChange('logoUrl', data.data.display_url);
                toast.success("Logo uploaded successfully!", { id: toastId });
            } else {
                toast.error("Upload failed!", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong during upload.", { id: toastId });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payloadData = {
            ...startupData,
            founderId: user?.id || user?._id || null // ব্যাকএন্ডের রিলেশন ঠিক রাখতে ফিল্ড নাম অপরিবর্তিত রাখা হয়েছে
        };

        if (!payloadData.founderId) {
            toast.error("ইউজারের সেশন আইডি পাওয়া যায়নি!");
            setLoading(false);
            return;
        }

        try {
            const data = await createStartup(payloadData);
            if (data?.insertedId || data?.success) {
                toast.success(hasStartup ? "Startup profile updated!" : "Startup workspace created successfully!");
                setHasStartup(true);
                setIsEditing(false);
            } else {
                toast.error("Failed to save startup profile.");
            }
        } catch (error) {
            toast.error("Something went wrong while saving.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (!hasStartup) {
            setStartupData({ name: '', logoUrl: '', industry: '', location: '', employeeCount: '', website: '', description: '', isApproved: false });
        }
    };

    const labelClassNames = "text-sm text-zinc-400 font-semibold tracking-wide";
    const inputClassNames = "bg-zinc-900/60 border-zinc-800 focus:border-indigo-500 text-zinc-100 rounded-xl h-11 transition-all";
    const selectTriggerClassNames = "bg-zinc-900/60 border-zinc-800 text-zinc-100 rounded-xl h-11 text-left px-3";
    const selectPopoverClassNames = "bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200";

    if (!hasStartup && !isEditing) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 flex justify-center items-center">
                <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col gap-6">
                    <div>
                        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">My Startup Profile</h1>
                        <p className="text-xs text-zinc-500 mt-1">Manage your official startup and workplace settings.</p>
                    </div>
                    <div className="w-full border border-dashed border-zinc-800 bg-zinc-900/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-14 h-14 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 shadow-inner">
                            <Briefcase className="size-6" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold text-zinc-300">No active startup profile found</h3>
                            <p className="text-xs text-zinc-600 max-w-xs mx-auto">You need to setup a startup workspace before you can post new job roles.</p>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-zinc-900">
                        <Button onPress={() => setIsEditing(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 h-11 shadow-lg shadow-indigo-600/10 transition-all flex items-center gap-2 text-sm">
                            Create Startup Workspace <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (hasStartup && !isEditing) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 flex justify-center">
                <div className="w-full max-w-3xl flex flex-col gap-6">
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            {startupData?.logoUrl ? (
                                <img src={startupData.logoUrl} alt="Logo" className="w-14 h-14 rounded-xl object-cover border border-zinc-700 shadow" />
                            ) : (
                                <div className="w-14 h-14 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center font-bold text-indigo-400 text-xl uppercase">
                                    {startupData?.name ? startupData.name.substring(0, 2) : "SU"}
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-bold text-zinc-100">{startupData?.name || "My Startup"}</h2>
                                <p className="text-xs text-zinc-500 capitalize mt-0.5">
                                    {startupData?.industry ? startupData.industry.replace('-', ' ') : 'Unknown Industry'}
                                </p>
                            </div>
                        </div>
                        <div>
                            {startupData?.isApproved ? (
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow"><Check className="size-3.5" /> Verified Startup</span>
                            ) : (
                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow"><TriangleExclamation className="size-3.5" /> Pending Approval</span>
                            )}
                        </div>
                    </div>
                    <div className="bg-zinc-900/10 border border-zinc-800/60 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-zinc-800/80 pb-6">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Location</p>
                                <p className="text-zinc-200 mt-1 flex items-center gap-2 text-sm"><Pin className="text-zinc-600 shrink-0" /> {startupData.location || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Website</p>
                                {startupData.website ? (
                                    <a href={startupData.website} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline mt-1 flex items-center gap-2 text-sm"><Globe className="text-indigo-500/70 shrink-0" /> Visit Site</a>
                                ) : (
                                    <p className="text-zinc-500 mt-1 flex items-center gap-2 text-sm"><Globe className="text-zinc-700 shrink-0" /> N/A</p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Team Size</p>
                                <p className="text-zinc-200 mt-1 flex items-center gap-2 text-sm"><Person className="text-zinc-600 shrink-0" /> {startupData.employeeCount || '0'} Members</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2">Startup Description</p>
                            <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl whitespace-pre-wrap">{startupData.description || 'No description provided.'}</p>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-zinc-800/80">
                            <Button onPress={() => setIsEditing(true)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold rounded-xl px-6 h-11 transition-all flex items-center gap-2 text-sm"><Gear className="size-4" /> Edit Startup Settings</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 flex justify-center">
            <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800/60 p-6 md:p-10 rounded-3xl shadow-2xl">
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-100">{hasStartup ? 'Update Startup Workspace' : 'Setup Startup Workspace'}</h1>
                    <p className="text-sm text-zinc-500 mt-1">Configure parameters to generate your startup profile.</p>
                </div>

                <Form onSubmit={handleSubmit} validationBehavior="native" className="flex flex-col gap-8">
                    <Fieldset className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl gap-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900/50 pb-4">
                            <Fieldset.Legend className={labelClassNames}>Startup Branding</Fieldset.Legend>
                            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800/80">
                                <button type="button" onClick={() => setUploadMethod("file")} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${uploadMethod === "file" ? "bg-indigo-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"}`}>Direct Upload</button>
                                <button type="button" onClick={() => setUploadMethod("url")} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${uploadMethod === "url" ? "bg-indigo-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"}`}>Image URL Link</button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-5 bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl">
                            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                                {startupData.logoUrl ? <img src={startupData.logoUrl} alt="Preview" className="w-full h-full object-cover" /> : <Briefcase className="text-zinc-700 size-8" />}
                            </div>
                            <div className="w-full">
                                {uploadMethod === "file" ? (
                                    <label className="w-full flex flex-col items-center justify-center h-24 border-2 border-dashed border-zinc-800 hover:border-indigo-500 rounded-xl cursor-pointer bg-zinc-900/20 hover:bg-zinc-900/40 transition-all group">
                                        <div className="flex flex-col items-center justify-center pt-2">
                                            <ArrowUpFromLine className="text-zinc-500 group-hover:text-indigo-400 size-6 mb-1 transition-colors" />
                                            <p className="text-xs text-zinc-400 font-medium group-hover:text-zinc-200">{uploadingImage ? "Uploading logo..." : "Click to upload startup logo"}</p>
                                        </div>
                                        <input type="file" accept="image/*" disabled={uploadingImage} className="hidden" onChange={handleLogoChange} />
                                    </label>
                                ) : (
                                    <TextField name="logoUrlField" type="url" value={startupData.logoUrl} onChange={(val) => handleInputChange('logoUrl', val)}>
                                        <Input placeholder="Paste direct image URL" startContent={<LinkIcon className="text-zinc-600 size-5" />} className={inputClassNames} />
                                    </TextField>
                                )}
                            </div>
                        </div>
                    </Fieldset>

                    <Fieldset className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl gap-6">
                        <Fieldset.Legend className={labelClassNames}>General Parameters</Fieldset.Legend>
                        <Fieldset.Group className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                <TextField isRequired name="name" value={startupData.name} onChange={(val) => handleInputChange('name', val)} className="flex flex-col gap-2">
                                    <Label className={labelClassNames}>Startup official name</Label>
                                    <Input placeholder="e.g. Acme Startup" className={inputClassNames} />
                                    <FieldError className="text-xs text-red-400" />
                                </TextField>

                                <Select
                                    isRequired
                                    name="industry"
                                    placeholder="Select industry"
                                    selectedKeys={startupData.industry ? [startupData.industry] : []}
                                    onSelectionChange={(keys) => handleInputChange('industry', Array.from(keys)[0])}
                                    className="flex flex-col gap-2"
                                >
                                    <Label className={labelClassNames}>Industry Category</Label>
                                    <Select.Trigger className={selectTriggerClassNames}><Select.Value /><Select.Indicator /></Select.Trigger>
                                    <Select.Popover className={selectPopoverClassNames}>
                                        <ListBox>{INDUSTRIES.map((ind) => (<ListBox.Item key={ind.key} id={ind.key} textValue={ind.label}><Label>{ind.label}</Label></ListBox.Item>))}</ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                <TextField isRequired name="location" value={startupData.location} onChange={(val) => handleInputChange('location', val)} className="flex flex-col gap-2">
                                    <Label className={labelClassNames}>Headquarters location</Label>
                                    <Input placeholder="e.g. Dhaka, Bangladesh" startContent={<Pin className="text-zinc-600 size-5" />} className={inputClassNames} />
                                    <FieldError className="text-xs text-red-400" />
                                </TextField>

                                <TextField isRequired name="employeeCount" type="number" value={startupData.employeeCount} onChange={(val) => handleInputChange('employeeCount', val)} className="flex flex-col gap-2">
                                    <Label className={labelClassNames}>Total team members count</Label>
                                    <Input placeholder="e.g. 10" className={inputClassNames} />
                                    <FieldError className="text-xs text-red-400" />
                                </TextField>
                            </div>

                            <TextField name="website" type="url" value={startupData.website} onChange={(val) => handleInputChange('website', val)} className="flex flex-col gap-2">
                                <Label className={labelClassNames}>Startup Website URL (Optional)</Label>
                                <Input placeholder="e.g. https://www.acmestartup.com" startContent={<Globe className="text-zinc-600 size-5" />} className={inputClassNames} />
                                <FieldError className="text-xs text-red-400" />
                            </TextField>

                            <TextField isRequired name="description" value={startupData.description} onChange={(val) => handleInputChange('description', val)} className="flex flex-col gap-2">
                                <Label className={labelClassNames}>About Startup / Description</Label>
                                <TextArea rows={4} placeholder="Describe your startup vision and mission..." className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-xl p-3 focus:border-indigo-500 transition-all text-sm" />
                                <FieldError className="text-xs text-red-400" />
                            </TextField>
                        </Fieldset.Group>
                    </Fieldset>

                    <div className="border-t border-zinc-800 pt-8 mt-4 flex justify-end items-center gap-4">
                        <Button type="button" onPress={handleCancel} className="font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl px-6 transition-all text-sm h-11 flex items-center gap-1.5">Cancel <Xmark className="size-4" /></Button>
                        <Button type="submit" isPending={loading || uploadingImage} className="font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-indigo-600/20 shadow-lg px-8 transition-all text-sm h-11 flex items-center gap-1.5">
                            {hasStartup ? 'Save Changes' : 'Publish Workspace'}
                            {!loading && <Check className="size-4" />}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}