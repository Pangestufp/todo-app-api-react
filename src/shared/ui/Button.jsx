export default function Button({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
}) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Loading..." : children}
    </button>
  )
}