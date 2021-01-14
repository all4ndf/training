/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
const Form1 = (props) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [qty, setQty] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [patientInformation, setPatientInformation] = useState({});
  const [patients, setPatients] = useState([]);
  const [patientNo, setPatientNo] = useState("");

  useEffect(() => {
    handleGetPatientInformation();
    console.log(props);

    setPatientNo(props.location.state.patientNo);
  }, []);

  useEffect(() => {
    handleComputeAmount();
  }, [qty, unitPrice]);

  const handleComputeAmount = () => {
    let q = isNaN(qty) ? 0 : qty;
    let p = isNaN(unitPrice) ? 0 : unitPrice;

    setAmount(q * p);
  };
  const handleGetPatientInformation = () => {
    console.log("Handle Patient Information");
    setPatientInformation({
      lastName: "Fabular",
      firstName: "Allan",
      middleName: "Delola",
    });

    setPatients([
      {
        lastName: "Fabular",
        firstName: "Allan",
        middleName: "Delola",
      },
      {
        lastName: "Dela Cruz",
        firstName: "Joseph",
        middleName: "Ocampo",
      },
      {
        lastName: "Dela Cruz",
        firstName: "Joseph",
        middleName: "Ocampo",
      },
    ]);
  };

  const handleChangeLastname = (e) => {
    console.log(e);
    setLastName(e.target.value);
  };

  const handleForm2 = () => {
    props.history.push({
      pathname: "/form2",
      state: {
        listOfItems: [
          {
            itemCode: "1",
            brandName: "xxxxxxxxxxx",
          },
          {
            itemCode: "2",
            brandName: "rrrrrrrr",
          },
        ],
      },
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <React.Fragment>
      <h1>Form 1</h1>
      <button onClick={() => handleForm2()}>Form 2</button>
      <div>
        {firstName} {lastName}
      </div>
      <div>
        {qty} {unitPrice}
      </div>
      <div>{amount}</div>
      <div>{patientInformation.lastName}</div>

      <div>
        {patients.map((object, index) => {
          return (
            <p key={object.lastName}>
              {object.lastName} - {object.firstName}
            </p>
          );
        })}
      </div>
      <div>{patientNo}</div>

      <form onSubmit={handleSubmitForm}>
        <div>
          <label>Lastname:</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => handleChangeLastname(e)}
          />
        </div>

        <div>
          <label>Firstname:</label>
          <input type="text" name="firstName" />
        </div>

        <div>
          <label>Qty:</label>
          <input
            type="number"
            name="qty"
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        <div>
          <label>Unit price:</label>
          <input
            type="number"
            name="unitPrice"
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default Form1;
