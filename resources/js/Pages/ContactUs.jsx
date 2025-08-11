import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '@/Layouts/MainLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ContactUs() {
  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    recaptcha_token: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const recaptchaRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Name is required.';
    if (!data.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Email is invalid.';
    if (!data.subject.trim()) errs.subject = 'Subject is required.';
    if (!data.message.trim()) errs.message = 'Message is required.';
    if (!data.recaptcha_token) errs.recaptcha_token = 'Please verify that you are not a robot.';
    return errs;
  };

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // TODO: submit form + recaptcha_token to backend for verification

      console.log('Form submitted:', data);

      setSubmitted(true);
      setData({
        name: '',
        email: '',
        subject: '',
        message: '',
        recaptcha_token: '',
      });

      // reset recaptcha
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setErrors({});
    }
  };

  return (
    <Layout>
      <main className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-12 text-white">
        <h1 className="text-3xl font-bold mb-6 text-pink-400">Contact Us</h1>

        {submitted && (
          <div className="mb-4 p-3 bg-green-600 rounded">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              value={data.name}
              onChange={e => handleChange('name', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.name} className="mt-1" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={data.email}
              onChange={e => handleChange('email', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.email} className="mt-1" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="subject" value="Subject" />
            <TextInput
              id="subject"
              type="text"
              value={data.subject}
              onChange={e => handleChange('subject', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.subject} className="mt-1" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="message" value="Message" />
            <textarea
              id="message"
              value={data.message}
              onChange={e => handleChange('message', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 p-2 resize-y"
              rows={5}
            />
            <InputError message={errors.message} className="mt-1" />
          </div>

          {/* reCAPTCHA widget */}
          <div className="mb-4">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_NOCAPTCHA_SITEKEY}
              onChange={(token) => handleChange('recaptcha_token', token)}
              ref={recaptchaRef}
            />
            <InputError message={errors.recaptcha_token} className="mt-2" />
          </div>

          <PrimaryButton type="submit" className="w-full">
            Send Message
          </PrimaryButton>
        </form>
      </main>
    </Layout>
  );
}