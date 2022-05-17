import React from "react";
import { toggleFormPannel } from "../../../jq";
import "../FormButton/FormButton.css";

export default function FormButton() {
  toggleFormPannel();
  return (
    <div className='hide_show_form_button'>
      <button>
        <img src='messenger.png' width='50px' height='50px'></img>
      </button>
    </div>
  );
}
