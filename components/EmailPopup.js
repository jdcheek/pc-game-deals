import React from "react";
import style from "../styles/EmailPopup.module.css";

export default function EmailPopup({ setToggleEmailPopup }) {
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
              <input type='text' name='email' />
            </div>
            <div className={style.priceInput}>
              <label htmlFor='price'>NOTIFY AT PRICE</label>
              <input type='text' name='price' />
            </div>
          </div>
          <div className={style.subBtns}>
            <button>EDIT NOTIFICATIONS</button>
            <button>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
