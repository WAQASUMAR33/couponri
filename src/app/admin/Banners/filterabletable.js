'use client';
import React, { useState, useEffect, useRef } from 'react';

const FilterableSliderTable = ({ initialData = [], fetchBanners }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    adsbanner: '',
    bannerurl:'',
    blogslider1: '',
    blogslider2: '',
  });

  useEffect(() => {
    // Populate the form fields if initial data is available
    if (initialData.length > 0) {
      const firstRecord = initialData[0];
      setBannerForm({
        bannerurl: firstRecord.bannerurl || '',
        adsbanner: firstRecord.adsbanner || '',
        blogslider1: firstRecord.blogslider1 || '',
        blogslider2: firstRecord.blogslider2 || '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/blogcategory');
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBannerForm({ ...bannerForm, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = initialData.length > 0 ? 'PUT' : 'POST';
      const url = initialData.length > 0 ? `/api/banners/${initialData[0].id}` : '/api/banners';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerForm),
      });

      if (response.ok) {
        fetchBanners();
      } else {
        console.error('Failed to save banner');
      }
    } catch (error) {
      console.error('Error saving banner:', error);
    }
    setIsLoading(false);
  };

  const handleDeleteItem = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchBanners();
      } else {
        console.error('Failed to delete banner');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-xl">Processing...</div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-4 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Banner Details</h2>
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ad Banner URL</label>
            <input
              type="text"
              name="adsbanner"
              value={bannerForm.adsbanner}
              onChange={handleFormChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ad Banner Link</label>
            <input
              type="text"
              name="bannerurl"
              value={bannerForm.bannerurl}
              onChange={handleFormChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Blog Slider 1</label>
            <select
              name="blogslider1"
              value={bannerForm.blogslider1}
              onChange={handleFormChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Blog Slider 2</label>
            <select
              name="blogslider2"
              value={bannerForm.blogslider2}
              onChange={handleFormChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {initialData.length > 0 ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      {/* {initialData.length > 0 && (
        <div className="bg-white shadow rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Banners</h3>
          <ul>
            {initialData.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2 p-2 border-b">
                <div>
                  <p><strong>Ad Banner URL:</strong> {item.adsbanner}</p>
                  <p><strong>Blog Slider 1:</strong> {item.blogslider1}</p>
                  <p><strong>Blog Slider 2:</strong> {item.blogslider2}</p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default FilterableSliderTable;
