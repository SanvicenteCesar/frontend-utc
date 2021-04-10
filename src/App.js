import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./componets/Formulario";
import Cita from "./componets/Cita";
function App() {
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [listTime, setlistTime] = useState([citasIniciales]);

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(listTime));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [listTime]);

  const createdTime = (time) => {
    setlistTime([...listTime, time]);
    console.log(time);
  };

  const eliminartime = (id) => {
    const nuevascitas = listTime.filter((time) => time.id !== id);
    setlistTime(nuevascitas);
  };
  const titulo =
    listTime.length === 0 ? "Vacio" : " Administrar";

  return (
    <Fragment>
      <h1 className="text-ligth">Time UTC</h1>
      <div className="row justify-content-center">
        <div className="col-4 ">
          <Formulario createdTime={createdTime} />
        </div>
        <div className="col-4">
          <h2>{titulo}</h2>
          {listTime.map((time) => (
            <Cita key={time.id} time={time} eliminartime={eliminartime} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
