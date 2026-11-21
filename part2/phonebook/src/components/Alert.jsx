export default function Alert({ success = true, message = "" }) {
  return (
    <div
      style={{
        maxWidth: "100dvw",
        // height: "50px",
        border: `5px solid ${success ? "green" : "red"}`,
        background: "#f9f9f9",
        borderRadius: "8px",
        padding: "16px 8px",
        marginBottom: "8px",
      }}
    >
      {message}
    </div>
  );
}
