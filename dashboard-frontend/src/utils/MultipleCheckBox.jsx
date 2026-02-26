import { useState } from "react";

const MultipleCheckBox = ({items}) => {
  //what we can do is we will get array of just the industries =[eco,external,etc]
  //we convert it to [{name:eco,isChecked:false}];
  const updatedItems = items.map((item) => ({ name: item, isChecked: false }));

  const [pestle, setPestle] = useState(updatedItems);

  const handleCheckboxClick = (index) => {
    //we need to do multiple check
    //so we need something that unique to checkbox to find it from the list
    //oh we can give index to each
    const updateCheckbox = [...pestle];
    updateCheckbox[index].isChecked = !updateCheckbox[index].isChecked;
    setPestle(updateCheckbox);
  };
  return (
    <ul>
      {pestle.map((item, index) => {
        return (
          <li className="flex" key={item.name}>
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => handleCheckboxClick(index)}
            />
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MultipleCheckBox;
