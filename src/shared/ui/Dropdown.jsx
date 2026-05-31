export default function Dropdown({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        border
        border-blue-500
        rounded-md
        px-3
        py-2
        outline-none
        focus:border-blue-600
      "
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
