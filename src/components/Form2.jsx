import React, { useState, useEffect } from "react";
const Form2 = () => {
  const [patientInformation, setPatientInformation] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setPatientInformation({
      LastName: "Fabular",
      FirstName: "Allan",
      MiddleName: "Delola",
    });

    handleGetItems();
  }, []);

  const handleGetItems = () => {
    setItems([
      {
        ItemCode: "1",
        BrandName: "BrandName 1",
        GenericName: "GenericName 1",
        UnitPrice: 100,
      },
      {
        ItemCode: "2",
        BrandName: "BrandName 2",
        GenericName: "GenericName 2",
        UnitPrice: 200,
      },
      {
        ItemCode: "3",
        BrandName: "BrandName 3",
        GenericName: "GenericName 3",
        UnitPrice: 200,
      },
    ]);
  };

  return (
    <React.Fragment>
      <h1>Form 2</h1>
      <div>Lastname:{patientInformation.LastName}</div>
      <div>Firstname:{patientInformation.FirstName}</div>
      <div>MiddleName:{patientInformation.MiddleName}</div>

      <div>
        {items.map((object, index) => {
          return (
            <div>
              {object.BrandName} - {object.GenericName}
            </div>
          );
        })}
      </div>

      {/*  {items.map((object, index) => {
          return (
            <p key={object.ItemCode}>
              {object.BrandName} - {object.GenericName}
            </p>
          );
        })}
 */}
    </React.Fragment>
  );
};

export default Form2;
