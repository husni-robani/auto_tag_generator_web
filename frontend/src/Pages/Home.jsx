import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import JournalCard from "../components/JournalCard";

export default function Home({ web_api_url }) {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(web_api_url + "/api/journals");
        const jsonData = await response.json();
        setJournals(jsonData.journals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col">
        {/* title */}
        <h1 className="text-3xl font-bold font-sans mb-10">List of Journals</h1>
        {/* List container */}
        <div className="grid justify divide-y divide-gray-200 max-w-6xl mx-auto">
          {journals.map((journal) => (
            <JournalCard
              key={journal.id}
              author={journal.author}
              title={journal.title}
              abstract={journal.abstract}
              study_program={journal.study_program}
              id={journal.id}
              timestamp={journal.timestamp}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
