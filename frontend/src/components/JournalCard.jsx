export default function JournalCard({ author, title, abstract }) {
  return (
    <>
      <div className="bg-slate-100 rounded-md">
        <p>{author}</p>
        <p>{title}</p>
        <p>{abstract}</p>
      </div>
    </>
  );
}
