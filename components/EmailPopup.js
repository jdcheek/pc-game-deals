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
      const data = await res.json();
      data === true
        ? setToggleEmailPopup(false)
        : alert("Please enter a valid email and price.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditNotifications = async () => {
    if (emailFormState.email !== "") {
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
          alert("Please enter a valid email");
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter a valid email");
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
                required
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
        </div>
        <div className={style.subBtns}>
          <button onClick={handleEditNotifications}>EDIT NOTIFICATIONS</button>
          <button type='submit' onClick={handleFormSubmit}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
