export default function Filter({ onFilter }) {
  return (
    <div>
      filter shown with: <input onChange={onFilter} />
    </div>
  );
}
