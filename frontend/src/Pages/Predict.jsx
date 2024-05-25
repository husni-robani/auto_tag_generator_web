import { useState } from "react";
import Layout from "../Layout";
import { json } from "react-router-dom";

export default function Predict({ model_api_url }) {
  const [abstracts, setAbstracts] = useState([{ value: "" }]);
  const [responseJson, setResponseJson] = useState(null);
  const [responseCode, setResponseCode] = useState(null);

  const handleOnChange = (i, e) => {
    const newAbstracts = [...abstracts];
    newAbstracts[i].value = e.target.value;
    setAbstracts(newAbstracts);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const abstractsInput = [];
    abstracts.map((abstract, index) => abstractsInput.push(abstract.value));
    const result = await predict_study_program(abstractsInput);
    setResponseJson(result.json);
    setResponseCode(result.code);
  };

  const handleAdd = () => {
    const newAbstracts = [...abstracts, { value: "" }];
    setAbstracts(newAbstracts);
  };

  const predict_study_program = async (abstracts) => {
    const url = model_api_url + "/api/predict";
    // make an abstract as array
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        abstracts: abstracts,
      }),
    };

    const response = await fetch(url, options);

    if (response.status != "200") {
      const errors = await response.json();
      alert(errors.message);
    } else {
      const respone_json = JSON.stringify(await response.json());
      return {
        json: respone_json,
        code: response.status,
      };
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col mb-14">
          {/* title */}
          <h1 className="text-3xl font-bold font-sans">API Responses</h1>
        </div>
        <div className="max-w-5xl mx-auto">
          {/* form */}
          <form onSubmit={onSubmit} className="">
            {abstracts.map((abstract, index) => (
              <div key={index}>
                <label className="text-sm text-gray-400 ml-2">
                  abstract {index + 1}
                </label>
                <textarea
                  value={abstract.value}
                  onChange={(event) => handleOnChange(index, event)}
                  rows="10"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg mb-6 outline-none focus:border-gray-500"
                  placeholder="Write your abstract here ..."
                />
              </div>
            ))}
            <button
              onClick={handleAdd}
              type="button"
              className=" w-full text-xs text-center p-1.5 border-2 border-dashed rounded-md border-gray-200 bg-gray-50 text-gray-300 hover:border-gray-400 hover:text-gray-500"
            >
              Add more field
            </button>
            <div className="flex mt-5">
              <button
                type="submit"
                onClick={onSubmit}
                class="ml-auto px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Generate
              </button>
            </div>
          </form>
          <hr className="my-20 border border-gray-300" />
          {/* result */}
          {responseJson !== null ? (
            <div className="bg-gray-700 mt-4 border rounded-lg">
              <h1 className="text-2xl text-center text-white">Responses</h1>
              {/* response details */}
              <div className="grid bg-gray-50 divide-y divide-gray-300">
                <div className="p-2">
                  <span className="bg-red-300 p-1 rounded-md mr-4">POST</span>
                  /api/predict
                </div>
                <div className="p-2">
                  <p className="text-sm text-gray-500 mb-2">code</p>
                  <p
                    className={
                      responseCode >= 200 && responseCode < 300
                        ? "bg-green-300 rounded-md p-1 w-fit"
                        : "bg-red-300 rounded-md p-1 w-fit"
                    }
                  >
                    {responseCode}
                  </p>
                </div>
                <div className="p-2">
                  <p className="text-sm text-gray-500 mb-2">Response</p>
                  <code>{responseJson}</code>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* response details end */}
        </div>
      </Layout>
    </>
  );
}
