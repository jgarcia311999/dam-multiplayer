export default function Button({ onClick, children, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "#2c3e50",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        border: "none",
        borderRadius: 8,
        padding: "12px 28px",
        margin: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s"
      }}
    >
      {children}
    </button>
  );
}