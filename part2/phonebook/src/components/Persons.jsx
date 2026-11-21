export default function Persons({ persons }) {
  if (!persons?.length) return <p>There is no contact here!</p>;

  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={`${person.id}`}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
}
