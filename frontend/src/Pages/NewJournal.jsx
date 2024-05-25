import Layout from "../Layout";
import JournalForm from "../components/JournalForm";

export default function NewJournal({ model_api_url, web_api_url }) {
  const handleSubmit = async (inputValues) => {
    const formDatas = [];
    for (let index in inputValues) {
      const data = new FormData();
      data.append("author", inputValues[index].author);
      data.append("title", inputValues[index].title);
      data.append("abstract", inputValues[index].abstract);
      data.append("file", inputValues[index].file);
      formDatas.push(data);
    }
    store_journal(formDatas);
  };

  const store_journal = async (data) => {
    const url = web_api_url + "/api/store_journal";

    // store data one by one
    for (let index in data) {
      const options = {
        method: "POST",
        body: data[index],
      };

      const response = await fetch(url, options);

      if (response.status != "201") {
        const errors = await response.json();
        alert(errors.message);
      } else {
        // updateCallback(); // undefined function
      }
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
