export default function CountryRow({ country, onShow }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "20px",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <p>{country.name.common}</p>
      <button onClick={() => onShow(country)}>Show</button>
    </div>
  );
}
