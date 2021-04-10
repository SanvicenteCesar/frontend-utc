import React, { Fragment, useState } from "react";
import { uuid } from "uuidv4";
import axios from "axios";

const Formulario = ({ createdTime }) => {
  const [time, updateTime] = useState({
    hour: "",
    count: "",
  });
  const [error, seterror] = useState(false);

  const actualizarState = (e) => {
    updateTime({
      ...time,
      [e.target.name]: e.target.value,
    });
  };

  const { hour, count } = time;

  const submittime = async (e) => {
    e.preventDefault();
    //Validar
    if (hour.trim() === "" || count.trim() === "") {
      seterror(true);
      return;
    }
    seterror(false);

    try {
      const respuesta = await axios.post(
        "https://time-utc.herokuapp.com/get-time",
        time
      );
      console.log(respuesta.data.response)
      time.id = uuid();
      time.hour = respuesta.data.response.time;
      time.count = respuesta.data.response.timezone;
    createdTime(time);
    } catch (error) {}
    

    updateTime({
      hour: "",
      count: "",
    });
  };

  return (
    <Fragment>
      <h2>Formulario</h2>

      {error ? (
        <p className="alert alert-danger">Todos los campos son obligatorios </p>
      ) : null}
      <form onSubmit={submittime}>
        <label>Hora</label>
        <input
          type="text"
          name="hour"
          placeholder="hora ejemplo: 18:31:45"
          className="w-100"
          onChange={actualizarState}
          value={hour}
        />
        <label>UTC</label>
        <input
          type="text"
          name="count"
          placeholder="UTC ejemplo: -3"
          className="w-100"
          onChange={actualizarState}
          value={count}
        />
        <button type="submit" className="w-100 btn btn-dark">
          Agregar
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
