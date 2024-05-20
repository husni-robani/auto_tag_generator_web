import React, { useState } from "react";

export default function NewJournal({ onSubmit }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    abstract: "",
  });

  const [file, setFile] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // pass data to parent
    onSubmit(formData, file);
    // reset input fields
    setFormData({
      author: "",
      title: "",
      abstract: "",
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-md"
      >
        <div className="flex flex-col lg:flex-row gap-x-10">
          <div className="flex flex-col lg:justify-around w-full">
            {/* Author Input field */}
            <div className="mb-6">
              <label
                for="author"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* Title Input field */}
            <div className="mb-6">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* File Input */}
            <div className="mb-6">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="large_size"
              >
                Journal File
              </label>
              <input
                class="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="large_size"
                type="file"
              />
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PDF
              </p>
            </div>
          </div>
        </div>
        {/* Abstract input textarea */}
        <div>
          <label
            for="abstract"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Abstract
          </label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleInputChange}
            rows="10"
            class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-4 lg:ml-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </>
  );
}
