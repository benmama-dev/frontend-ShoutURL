import Header from "./component/Header/Header";
import css from "./style/app.module.scss";
import css2 from "./style/app2.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from "./component/MainContainer/MainContainer";
import QRcode from "./component/QRcode/QRcode";
function App() {
  return (
    <div className={`bg-primary ${css.container}`}>
      <Header />
      <main className={`paddings ${css2.wrapper}`}>
        <div className={`innerWidth ${css2.container}`}>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/qrcode" element={<QRcode/>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
