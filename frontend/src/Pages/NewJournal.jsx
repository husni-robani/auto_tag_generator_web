import Layout from "../Layout";
import JournalForm from "../components/JournalForm";

export default function NewJournal({ model_api_url, web_api_url }) {
  const handleSubmit = async (inputValues, file) => {
    const data = new FormData();
    data.append("author", inputValues.author);
    data.append("title", inputValues.title);
    data.append("abstract", inputValues.abstract);
    data.append("file", file);

    // predict study program
    const study_program = await predict_study_program([data.get("abstract")]);
    data.append("study_program", study_program);

    store_journal(data);
  };

  const predict_study_program = async (abstract) => {
    const url = model_api_url + "/api/predict";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        abstract,
      }),
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

  const store_journal = async (data) => {
    const url = web_api_url + "/api/store_journal";
    const options = {
      method: "POST",
      body: data,
    };
    const response = await fetch(url, options);

    if (response.status != "201") {
      const errors = await response.json();
      alert(errors.message);
    } else {
      // updateCallback(); // undefined function
    }
  };

  return (
    <Layout>
      <div className="flex flex-col">
        {/* title */}
        <h1 className="text-3xl font-bold font-sans mb-10">
          Submit New Journal
        </h1>
        {/* input form */}
        <JournalForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
