import { useState } from "react";
import Layout from "../Layout";

export default function Predict({ model_api_url }) {
  const [abstract, setAbstract] = useState("");
  const [studyProgram, setStudyProgram] = useState("");

  const handleOnChange = (e) => {
    setAbstract(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await predict_study_program(abstract);

    setStudyProgram(result);
  };

  const predict_study_program = async (abstract) => {
    const url = model_api_url + "/api/predict";
    // make an abstract as array
    abstract = [abstract];
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ abstract }),
    };

    const response = await fetch(url, options);

    if (response.status != "200") {
      const errors = await response.json();
      alert(errors.message);
    } else {
      const respone_json = await response.json();
      return respone_json.results;
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col">
          {/* title */}
          <h1 className="text-3xl font-bold font-sans mb-10">Predict Page</h1>
        </div>
        <div>
          {/* form */}
          <form
            onSubmit={onSubmit}
            className=" bg-slate-50 border border-slate-300 rounded-lg"
          >
            <textarea
              id="abstract"
              name="abstract"
              value={abstract}
              onChange={handleOnChange}
              rows="10"
              class="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg mb-4 outline-none"
              placeholder="Write your abstract here ..."
            />
            <hr />
            <div className="flex m-2">
              <button
                type="button"
                onClick={onSubmit}
                class="ml-auto px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Generate
              </button>
            </div>
          </form>
          {/* result */}
          <div>{studyProgram}</div>
        </div>
      </Layout>
    </>
  );
}
