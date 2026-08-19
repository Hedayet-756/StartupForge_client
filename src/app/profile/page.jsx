'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { LuUser, LuMail, LuImage, LuSave, LuUpload, LuLoader } from 'react-icons/lu'; // 🎯 এখানে পরিবর্তন করা হয়েছে

const ProfilePage = () => {
    const router = useRouter();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    React.useEffect(() => {
        if (user?.image && !imageUrl) {
            setImageUrl(user.image);
        }
    }, [user]);

    if (isPending) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[85vh] flex flex-col items-center justify-center gap-4 bg-black text-white">
                <p className="text-zinc-400 font-medium">Please log in to view your profile.</p>
                <Button onClick={() => router.push('/signin')} className="bg-white text-black font-bold rounded-xl px-6 py-2.5">
                    Go to Login
                </Button>
            </div>
        );
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const apiKey = "89381f08180d7147fc2d874fccf8eabb";
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setImageUrl(data.data.url);
                toast.success('Image uploaded successfully!');
            } else {
                toast.error("Image upload failed. Please try again.");
            }
        } catch (err) {
            toast.error("Something went wrong during image upload.");
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdatingProfile(true);

        const formData = new FormData(e.currentTarget);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.updateUser({
                name: updatedData.name,
                image: imageUrl || updatedData.image
            });

            if (data) {
                toast.success('Profile updated successfully!');
                router.push('/');
                router.refresh();
            }
            if (error) {
                toast.error(error.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-black text-white">
            <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">

                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Account Settings</h2>
                    <p className="text-sm text-zinc-400 mt-1">Update your profile name and picture</p>
                </div>

                <Form onSubmit={handleUpdateProfile} className="space-y-5">

                    <TextField name="name" isRequired defaultValue={user?.name} className="space-y-1.5">
                        <Label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <LuUser className="text-indigo-400" /> Full Name
                        </Label>
                        <Input
                            placeholder="Enter your full name"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <TextField isDisabled defaultValue={user?.email} className="space-y-1.5 opacity-60">
                        <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <LuMail className="text-zinc-500" /> Email Address (Unchangeable)
                        </Label>
                        <Input className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-400 cursor-not-allowed" />
                    </TextField>

                    {/* পিসি থেকে ইমেজ আপলোড ফিল্ড */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <LuImage className="text-indigo-400" /> Profile Picture
                        </label>

                        <div className="flex items-center gap-5 bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md">
                            {/* বড় প্রিভিউ ইমেজ */}
                            <div className="relative group shrink-0">
                                <img
                                    src={imageUrl || "https://via.placeholder.com/150"}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
                                />
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                                        <LuLoader className="w-6 h-6 text-indigo-400 animate-spin" />
                                    </div>
                                )}
                            </div>

                            {/* ছোট আপলোড বক্স এবং টেক্সট */}
                            <div className="flex-1 flex flex-col justify-center">
                                <label className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-zinc-700 border-dashed rounded-xl cursor-pointer bg-zinc-900/80 hover:bg-zinc-800 transition-all text-center">
                                    <LuUpload className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span className="text-xs text-zinc-200 font-medium truncate">
                                        {uploading ? "Uploading..." : "Upload new image"}
                                    </span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                                <p className="text-[10px] text-zinc-500 mt-1.5 text-center">PNG, JPG, WEBP (Max 5MB)</p>
                            </div>
                        </div>
                    </div>

                    <TextField name="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="space-y-1.5">
                        <Label className="text-sm font-medium text-zinc-300">Or Image URL</Label>
                        <Input
                            placeholder="https://example.com/avatar.jpg"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            isLoading={isUpdatingProfile}
                            className='w-full font-semibold py-3 rounded-xl text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2'
                        >
                            {!isUpdatingProfile && <LuSave className="text-lg" />}
                            {isUpdatingProfile ? 'Saving Info...' : 'Save Changes'}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;