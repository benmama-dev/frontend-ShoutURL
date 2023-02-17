import React, { useState } from "react";
import css from "./QRcode.module.scss";
import QRCode from "react-qr-code";

const QRcode = () => {

  const [value,setValue] = useState("");
  const [value2,setValue2] = useState("");
  const [qrcode,setQrcode] = useState(false);
  const setQRCode = () =>{
    if(!value){
      return;
    }
    setValue2(value)
    setValue("")
    setQrcode(true);    
  }
  return (
    <section className={`paddings ${css.wapper}`}>
      <div className={`flexCenter innerWidth ${css.container}`}>
        <span className={`primaryText yPaddings ${css.textD}`}>QR Code Generator</span>
        <div className={css.fullText}>
          <input
            type="text"
            placeholder="URL....."
            className={css.TextEdit}
            required
            value={value}
            onChange={(e)=> setValue(e.target.value)}
          />
          <button className={css.btn} onClick={setQRCode}>Generator QR Code</button>
        </div>
        {qrcode && (
          <div className={css.containerQR}>
             <QRCode value={value2} size={300} />
          </div>
        )}
      </div>
    </section>
  );
};

export default QRcode;
