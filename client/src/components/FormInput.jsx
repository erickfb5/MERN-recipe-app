export const FormInput = ({ label, type, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={type}>{label}: </label>
      <input type={type} id={type} value={value} onChange={onChange} required />
    </div>
  );
};
