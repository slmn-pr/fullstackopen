export default function Persons({ persons, onDelete }) {
  if (!persons?.length) return <p>There is no contact here!</p>;

  return (
    <div>
      <ul style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {persons.map((person) => (
          <li key={`${person._id}`}>
            <span>
              {person.name} {person.number}
            </span>
            &nbsp;
            <button onClick={() => onDelete(person._id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
