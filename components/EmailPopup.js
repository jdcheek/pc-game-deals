import React, { useState } from "react";
import style from "../styles/EmailPopup.module.css";

export default function EmailPopup({ setToggleEmailPopup, gameID }) {
  const [emailFormState, setEmailFormState] = useState({
    email: "",
    price: "0.00",
  });

  const handleInputChange = (e) => {
    setEmailFormState({ ...emailFormState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${emailFormState.email}&gameID=${gameID}&price=${emailFormState.price}`
      );
      res.status === 200 ? setToggleEmailPopup(false) : alert("Failed");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditNotifications = async () => {
    try {
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/alerts?action=manage&email=${emailFormState.email}`
      );
      if (res.status === 200) {
        alert(
          `An email has been sent to ${emailFormState.email} to manage your notifications`
        );
        setToggleEmailPopup(false);
      } else {
        alert("No email found");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='overlay'>
      <div className='popup'>
        <div className={style.closeBtn}>
          <button onClick={() => setToggleEmailPopup(false)}>CLOSE</button>
        </div>
        <div className={style.content}>
          <div className={style.inputContainer}>
            <div className={style.emailInput}>
              <label htmlFor='email'>EMAIL ADDRESS</label>
              <input
                type='email'
                name='email'
                value={emailFormState.email}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className={style.priceInput}>
              <label htmlFor='price'>NOTIFY AT PRICE</label>
              <input
                type='number'
                min='0.00'
                step='0.01'
                max='50.00'
                name='price'
                value={emailFormState.price}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className={style.subBtns}>
            <button onClick={handleEditNotifications}>
              EDIT NOTIFICATIONS
            </button>
            <button onClick={handleFormSubmit}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
