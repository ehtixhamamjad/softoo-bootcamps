import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryExitForm from "./components/Form/EntryExitForm";
import Reciept from "./components/Form/Reciept";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryExitForm/>}/>
        {/* <Route path="/receipt" element={<Reciept/>}/> */}
        <Route path="/receipt/:numberPlate" element={<Reciept/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
