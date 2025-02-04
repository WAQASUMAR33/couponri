'use client';
import { useState } from "react";
import CustomerRootLayout from "../../user/layout";

export default function Contact() {
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    try {
      const res = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        setSuccessMessage('Your inquiry has been sent successfully!');
        setErrorMessage('');
        setForm({ email: '', subject: '', message: '' });
      } else {
        setErrorMessage('Failed to send your inquiry. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <CustomerRootLayout>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex md:items-center justify-center md:py-8 md:px-4  lg:px-8">
        <div className="md:max-w-6xl w-full space-y-8 p-6 sm:p-8 bg-white md:rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
              Questions, Suggestions, Feedback, or Advertise With Us?
            </h2>
            <p className="mt-2 text-xs sm:text-lg text-gray-600">
              If you have a query, please complete the following form to share your suggestions, report errors, or provide feedback about our services. You can also reach us at 
              <a href="mailto:info@couponri.com" className="text-blue-500 font-semibold"> info@couponri.com</a>.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Write your message here..."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent text-base sm:text-lg font-medium rounded-md text-white ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {isLoading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>

            {successMessage && (
              <p className="text-green-500 text-center mt-4 text-sm sm:text-base">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4 text-sm sm:text-base">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </CustomerRootLayout>
  );
}
