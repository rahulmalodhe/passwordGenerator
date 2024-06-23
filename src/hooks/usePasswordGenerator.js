import {useState} from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkBoxData, length) => {
    let charSet = " ";
    let generatedPassword = "";

    const selectedCheckBox = checkBoxData.filter((checkBox) => checkBox.state);

    if (selectedCheckBox.length === 0) {
      setErrorMessage("Please check atleast one parameter");
      setPassword("");
      return;
    }

    selectedCheckBox.forEach((selectedOption) => {
      switch (selectedOption.title) {
        case "Include uppercase letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;

        case "Include lowercase letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include numbers":
          charSet += "0123456789";
          break;
        case "Include symbols":
          charSet += "!@#$%^&*()";
          break;

        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const pass = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[pass];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };
  return {password, errorMessage, generatePassword};
};
export default usePasswordGenerator;
