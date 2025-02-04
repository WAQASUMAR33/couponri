"use client";
import { useState, useEffect } from 'react';

export default function FaqPage() {
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [formData, setFormData] = useState({ comp_id: '', question: '', answer: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setloading] = useState(false);

  // New state for notification
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  useEffect(() => {
    fetchQuestions();
    fetchCompanies();
  }, []);

  const fetchQuestions = async () => {
    setloading(true);
    const res = await fetch('/api/faqs');
    const data = await res.json();
    setQuestions(data);
    setloading(false);
  };


  const fetchCompanies = async () => {
    setloading(true);
    const res = await fetch('/api/company');
    const data = await res.json();
    setCompanies(data);
    setloading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/faqs/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setNotification({ message: 'FAQ updated successfully!', type: 'success', visible: true });
      setEditId(null);
    } else {
      await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setNotification({ message: 'FAQ added successfully!', type: 'success', visible: true });
    }
    setFormData({ comp_id: '', question: '', answer: '' });
    fetchQuestions();
    setShowForm(false);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 3000);
  };

  const handleEdit = (question) => {
    setFormData({ comp_id: question.comp_id, question: question.question, answer: question.answer });
    setEditId(question.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/faqs/${id}`, {
      method: 'DELETE',
    });
    fetchQuestions();
    setNotification({ message: 'FAQ deleted successfully!', type: 'error', visible: true });

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 3000);
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesCompany = selectedCompanyId ? question.comp_id == selectedCompanyId : true;
    const matchesSearchTerm = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCompany && matchesSearchTerm;
  });

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">FAQ Management</h1>

      {/* Notification Popup */}
      {notification.visible && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Add New FAQ Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setShowForm(true);
            setFormData({ comp_id: '', question: '', answer: '' });
            setEditId(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Add New FAQ
        </button>
      </div>

      {/* Form for adding/editing FAQ */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Update FAQ' : 'Add New FAQ'}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Select Company</label>
              <select
                value={formData.comp_id}
                onChange={(e) => setFormData({ ...formData, comp_id: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.com_title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Question"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Answer"
                rows="3"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editId ? 'Update FAQ' : 'Add FAQ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
        <div className="mb-4 md:mb-0">
          <label className="block text-gray-700 font-semibold mb-2">Filter by Company</label>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.com_title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-grow">
          <label className="block text-gray-700 font-semibold mb-2">Search Questions</label>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* FAQs Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Answer</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question) => {
              const company = companies.find((c) => c.id == question.comp_id);
              return (
                <tr key={question.id} className="border-t">
                  <td className="px-4 py-2">{company ? company.com_title : 'N/A'}</td>
                  <td className="px-4 py-2">{question.question}</td>
                  <td className="px-4 py-2">{question.answer}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(question)}
                        className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {(loading)?(<>
              {filteredQuestions.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            </>):(<>
              {filteredQuestions.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No FAQs found.
                </td>
              </tr>
            )}
            </>)}
           
          </tbody>
        </table>
      </div>
    </div>
  );
}
