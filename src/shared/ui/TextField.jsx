export default function TextField({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        border-blue-500
        rounded-md
        outline-none
        focus:border-blue-600
        p-2
      "
    />
  );
}