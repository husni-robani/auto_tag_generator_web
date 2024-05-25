import React, { useRef, useState } from "react";

export default function NewJournal({ onSubmit }) {
  const [formData, setFormData] = useState([
    {
      author: "",
      title: "",
      abstract: "",
      file: null,
    },
  ]);
  const inputFile = useRef(null);

  const handleInputChange = (i, e) => {
    const newFormData = [...formData];
    if (e.target.name === "file") {
      newFormData[i][e.target.name] = e.target.files[0];
    } else {
      newFormData[i][e.target.name] = e.target.value;
    }
    setFormData(newFormData);
  };

  const handleAdd = (e) => {
    const newFormData = [
      ...formData,
      {
        author: "",
        title: "",
        abstract: "",
        file: null,
      },
    ];

    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // pass data to parent
    onSubmit(formData);
    // reset input fields
    setFormData([
      {
        author: "",
        title: "",
        file: null,
        abstract: "",
      },
    ]);
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "file";
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {formData.map((form, index) => (
          <div
            key={index}
            className="bg-gray-100 border border-gray-300 p-5 rounded-md mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-x-10">
              <div className="flex flex-col lg:justify-around w-full">
                {/* Author Input field */}
                <div className="mb-4">
                  <label
                    for="author"
                    className="block mb-1 text-sm font-medium text-gray-500"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={form.author}
                    onChange={(event) => handleInputChange(index, event)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {/* Title Input field */}
                <div className="mb-4">
                  <label
                    for="title"
                    className="block mb-1 text-sm font-medium text-gray-500"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(event) => handleInputChange(index, event)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {/* File Input */}
                <div className="mb-4">
                  <label
                    className="block mb-1 text-sm font-medium text-gray-500"
                    for="large_size"
                  >
                    Journal File
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="large_size"
                    name="file"
                    type="file"
                    accept=".pdf"
                    ref={inputFile}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  <p
                    className="mt-1 text-xs text-red-500 dark:text-gray-300"
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
                className="block mb-1 text-sm font-medium text-gray-500"
              >
                Abstract
              </label>
              <textarea
                id="abstract"
                name="abstract"
                value={form.abstract}
                onChange={(event) => handleInputChange(index, event)}
                rows="5"
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        ))}
        <button
          onClick={handleAdd}
          type="button"
          className=" w-full text-xs text-center mb-6 p-1.5 border-2 border-dashed rounded-md border-gray-200 bg-gray-50 text-gray-300 hover:border-gray-400 hover:text-gray-500"
        >
          Add more field
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-4 lg:ml-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
