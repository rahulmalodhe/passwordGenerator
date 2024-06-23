import {useState} from "react";
import {checkBoxData} from "../constants/inputConstants";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import StrengthChecker from "./StrengthChecker";

const PasswordGeneratorCard = () => {
  const [charLength, setCharLength] = useState(4);
  const [checkBox, setCheckBox] = useState(checkBoxData);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (id) => {
    setCheckBox((prevState) =>
      prevState.map((checkBox) =>
        checkBox.id === id ? {...checkBox, state: !checkBox.state} : checkBox
      )
    );
  };

  const handleCopy = (e) => {
    if (!password) {
      e.currentTarget.disabled = true;
    }
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const {password, errorMessage, generatePassword} = usePasswordGenerator();

  return (
    <div>
      <p className="p-4 m-6 text-4xl font-bold text-center">
        Password Generator
      </p>
      <div className="w-1/2 mx-auto bg-slate-700 text-white p-8 m-4 align-middle rounded-md">
        <div className="flex justify-between align-middle bg-slate-500 px-6 py-4 rounded-md">
          <div className="text-xl mb-0 mt-1">
            {password ? password : "Generate Password"}
          </div>
          <div>
            <button
              className="px-4 py-2 bg-green-700 rounded"
              onClick={(e) => handleCopy(e)}
            >
              {copied ? "Copied !" : "Copy"}
            </button>
          </div>
        </div>
        <div className="my-4 ">
          <div className="flex justify-between mb-2 mt-6">
            <p>Character Length :</p>
            <p>{charLength}</p>
          </div>
          <input
            className="w-full cursor-pointer"
            type="range"
            name="charLength"
            id="charlength"
            min={4}
            max={20}
            value={charLength}
            onChange={(e) => setCharLength(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 my-4">
          {checkBox.map((checkbox) => {
            return (
              <div className="mb-2" key={checkbox?.id}>
                <input
                  type="checkbox"
                  checked={checkbox?.state}
                  className="mr-2 cursor-pointer"
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
        </div>

        {password.length > 0 && <StrengthChecker password={password} />}

        {errorMessage ? <div>{errorMessage}</div> : null}
        <div className="mt-4">
          <button
            className="w-full px-4 py-3 font-bold text-xl bg-green-700 rounded"
            onClick={() => generatePassword(checkBox, charLength)}
          >
            Generate password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorCard;
