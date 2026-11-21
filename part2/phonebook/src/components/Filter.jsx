export default function Filter({ filter, onFilter }) {
  return (
    <div>
      filter shown with: <input filter={filter} onChange={onFilter} />
    </div>
  );
}
