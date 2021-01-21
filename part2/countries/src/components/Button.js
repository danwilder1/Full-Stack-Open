const Button = ({ text, onClick, value }) => (
  <button onClick={onClick} value={value}>
    {text}
  </button>
);

export default Button;
