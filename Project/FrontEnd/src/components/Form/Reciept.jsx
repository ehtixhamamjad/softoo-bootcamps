import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Reciept() {
  const [carData, setcarData] = useState([]);
  const params = useParams();
  const { numberPlate } = params;
  console.log(numberPlate);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/licenses/${numberPlate}`)
      .then((res) => {
        setcarData(res.data.car);
      });
  }, []);
  return (
    <>
      {carData.map((data) => (
        <div key={data._id} className="w-1/2 mx-auto mt-16 border-2 space-x-2">
          <table className="border-2 space-x-2">
            <thead>
              <th>Number Plate</th>
              <th>Entry Location</th>
              <th>Exit Location</th>
              <th>total</th>
            </thead>
            <tbody>
              <td>{data.numberPlate}</td>
              <td>{data.entryLocation}</td>
              <td>{data.exitLocation}</td>
              <td>{data.toll}</td>
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
