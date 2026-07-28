"use client";
import {
    Button,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    Surface,
    TextField,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Rocket, Upload, Loader2, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    const [selectedRole, setSelectedRole] = useState("founder");

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setErrorMsg("");

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
            } else {
                setErrorMsg("Image upload failed. Please try again.");
            }
        } catch (err) {
            setErrorMsg("Something went wrong during image upload.");
        } finally {
            setUploading(false);
        }
    };

    // গুগল সাইনআপ (এখন সরাসরি কাজ করবে এবং ব্যাকএন্ড থেকে ডিফল্ট রোল পেয়ে যাবে)
    const handleGoogleSignup = async () => {
        setGoogleLoading(true);
        setErrorMsg("");
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            setErrorMsg("Google signup failed. Please try again.");
            setGoogleLoading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        user.image = imageUrl;
        user.role = selectedRole;

        const password = user.password;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);

        if (password.length < 8 || !hasUppercase || !hasLowercase) {
            setErrorMsg("Password must be at least 8 characters and include one uppercase and one lowercase letter.");
            return;
        }

        try {
            await authClient.signUp.email({
                ...user,
            });
            router.push(redirectTo);
        } catch (err) {
            setErrorMsg("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-black text-white">
            <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-4">
                        <Rocket className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Create an Account</h1>
                    <p className="text-sm text-zinc-400 mt-1">Join StartupForge to build teams or find opportunities</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                {/* রোল সিলেক্ট অপশন (বাধ্যতামূলক নয়) */}
                <div className="mb-6 space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 block">I want to join as a</label>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                        <option value="founder">Founder (Post startups & hire)</option>
                        <option value="collaborator">Collaborator (Find & join teams)</option>
                    </select>
                </div>

                {/* Google Signup Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={googleLoading}
                    className="w-full mb-6 flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-medium py-3 rounded-xl transition-all cursor-pointer"
                >
                    {googleLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.18 21.3 7.22 24 12 24z" />
                                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 11.76s.43 3.63 1.19 5.16l4.08-2.68z" />
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.18 2.7 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
                            </svg>
                            <span>Continue with Google</span>
                        </>
                    )}
                </button>

                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-zinc-800 w-full"></div>
                    <span className="absolute bg-zinc-950 px-3 text-xs text-zinc-500 uppercase tracking-wider">Or with email</span>
                </div>

                <Surface className="w-full bg-transparent">
                    <Form onSubmit={onSubmit} className="space-y-5">
                        <Fieldset className="w-full space-y-4">
                            <Fieldset.Group className="space-y-4">
                                <TextField isRequired name="name" className="space-y-1.5">
                                    <Label className="text-sm font-medium text-zinc-300">Full Name</Label>
                                    <Input
                                        placeholder="John Doe"
                                        variant="secondary"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                                    />
                                    <FieldError />
                                </TextField>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-300 block">Profile Picture (Upload from PC)</label>
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-800 border-dashed rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-850 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="w-6 h-6 text-indigo-400 animate-spin mb-2" />
                                                    <p className="text-xs text-zinc-400">Uploading to ImgBB...</p>
                                                </>
                                            ) : imageUrl ? (
                                                <>
                                                    <p className="text-xs text-emerald-400 font-medium">Image Uploaded Successfully! ✅</p>
                                                    <p className="text-[10px] text-zinc-500 mt-1 truncate max-w-[250px]">{imageUrl}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                                                    <p className="text-xs text-zinc-400"><span className="font-semibold text-zinc-200">Click to upload</span> or drag and drop</p>
                                                    <p className="text-[10px] text-zinc-500 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                </div>

                                <TextField isRequired name="email" type="email" className="space-y-1.5">
                                    <Label className="text-sm font-medium text-zinc-300">Email Address</Label>
                                    <Input
                                        placeholder="john@example.com"
                                        variant="secondary"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField isRequired name="password" className="space-y-1.5">
                                    <Label className="text-sm font-medium text-zinc-300">Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="At least 8 chars with uppercase & lowercase"
                                            variant="secondary"
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <FieldError />
                                </TextField>
                            </Fieldset.Group>

                            <Button type="submit" className="w-full mt-6 bg-white text-black hover:bg-zinc-200 font-semibold py-3 rounded-xl transition-all shadow-lg">
                                Create Account
                            </Button>
                        </Fieldset>
                    </Form>
                </Surface>

                <div className="text-center mt-6 text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link href={`/signin?redirect=${redirectTo}`} className="text-indigo-400 hover:underline font-medium">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}