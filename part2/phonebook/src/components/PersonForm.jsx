export default function PersonForm({
  newName,
  onNameChange,
  newPhone,
  onPhoneChange,
  handleAddPerson,
}) {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>

      <div>
        number: <input value={newPhone} onChange={onPhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
