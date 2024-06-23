import {useEffect, useState} from "react";

const StrengthChecker = ({password}) => {
  const [strength, setStrength] = useState("");

  useEffect(() => {
    if (password.length < 4) {
      setStrength("Very Weak");
    } else if (password.length < 8) {
      setStrength("Weak");
    } else if (password.length < 12) {
      setStrength("Medium");
    } else if (password.length < 16) {
      setStrength("Strong");
    } else {
      setStrength("Very Strong");
    }
  }, [password]);

  return (
    <div className="flex justify-between mt-4 mb-2">
      <p>Strength: </p>
      <p>{strength}</p>
    </div>
  );
};

export default StrengthChecker;
