import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from '../../../images/HIKOHub.svg';

export default function Login({ status, canResetPassword }) {
    const recaptchaRef = useRef(null);
    const [formErrors, setFormErrors] = useState({});

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        recaptcha_token: '',
    });

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!data.email) {
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Email address is invalid.';
        }

        // Password validation
        if (!data.password) {
            newErrors.password = 'Password is required.';
        } else if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        // reCAPTCHA validation
        if (!data.recaptcha_token) {
            newErrors.recaptcha = "Please verify you're not a robot.";
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();

        // Clear previous form errors
        setFormErrors({});

        // Validate form
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        post(route('login'), {
            onFinish: () => {
                reset('password');
                if (recaptchaRef.current) recaptchaRef.current.reset();
                setData('recaptcha_token', '');
                setFormErrors({});
            },
            onError: (serverErrors) => {
                // Merge server errors with client errors if any
                setFormErrors(prev => ({ ...prev, ...serverErrors }));
            },
        });
    };

    const handleInputChange = (field, value) => {
        setData(field, value);
        // Clear field-specific error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: '',
                ...(field === 'recaptcha_token' ? { recaptcha: '' } : {})
            }));
        }
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#690A32] to-[#F04639]">
                <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
                    
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Link href="/">
                            <img src={logo} className="h-24" alt="HIKOHub Logo" />
                        </Link>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">{status}</div>
                    )}

                    <h2 className="text-3xl font-bold text-center mb-8 text-[#690A32]">
                        Welcome Back
                    </h2>

                    <form onSubmit={submit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#F04639] focus:border-[#F04639] ${
                                    formErrors.email || errors.email ? 'border-red-500' : ''
                                }`}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            {(formErrors.email || errors.email) && (
                                <InputError 
                                    message={formErrors.email || errors.email} 
                                    className="mt-2" 
                                />
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className={`mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#F04639] focus:border-[#F04639] ${
                                    formErrors.password || errors.password ? 'border-red-500' : ''
                                }`}
                                autoComplete="current-password"
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            {(formErrors.password || errors.password) && (
                                <InputError 
                                    message={formErrors.password || errors.password} 
                                    className="mt-2" 
                                />
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </div>

                        {/* reCAPTCHA */}
                        <div className="mt-4">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_NOCAPTCHA_SITEKEY}
                                onChange={(token) => handleInputChange('recaptcha_token', token)}
                                ref={recaptchaRef}
                            />
                            {formErrors.recaptcha && (
                                <InputError message={formErrors.recaptcha} className="mt-2" />
                            )}
                            {errors.recaptcha_token && (
                                <InputError message={errors.recaptcha_token} className="mt-2" />
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-[#690A32] hover:text-[#F04639] underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton
                                className="w-full sm:w-auto bg-[#F04639] hover:bg-[#E32373] text-white shadow-lg rounded-lg px-6 py-3"
                                disabled={processing}
                            >
                                {processing ? 'Logging In...' : 'Log In'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}