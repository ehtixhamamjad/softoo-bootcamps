import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Paper } from "@mui/material";
import Input from "./Input";

const EntryExitForm = () => {
  const navigate = useNavigate();
  const [isEntry, setIsEntry] = useState(true);
  const [isData, setIsData] = useState({
    numberPlate: "",
    entryLocation: "",
    exitLocation: "",
    distance: "",
  });

  // error handling
  const [isError, setIsError] = useState({});
  // validate numberPlate
  const validate = (name, value, e) => {
    switch (name) {
      case "numberPlate":
        if (!new RegExp(/^[A-Z]{3}-[0-9]{3}$/).test(value)) {
          setIsError({
            ...isError,
            numberPlate: "Enter a valid formate e.g AWN-078",
          });
        } else {
          setIsError("");
        }
        break;
      default:
        setIsError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsData({
      ...isData,
      [name]: value,
    });
    validate(name, value, e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    isEntry
      ? axios.post("http://localhost:8000/api/licenses", isData)
      : axios.patch(
          `http://localhost:8000/api/licenses/${isData.numberPlate}`,
          isData
        );

    {
      !isEntry && navigate(`/receipt/${isData.numberPlate}`);
    }
  };
  // console.log(isData.numberPlate);
  console.log(isData);
  // switch entry and exit
  const switchMode = () => {
    setIsEntry((prevIsEntry) => !prevIsEntry);
  };
  return (
    <Container component="main" maxWidth="xs" className="my-6">
      <Paper
        elevation={3}
        className="flex flex-col justify-center items-center mt-8 space-y-4 text-sm capitalize"
      >
        <h5 className="py-4 text-2xl">{isEntry ? "car entry" : "car exit"}</h5>
        <form onSubmit={handleSubmit} className="pb-4 mx-2">
          <Grid container spacing={2}>
            {isEntry ? (
              <>
                <Input
                  type="text"
                  className="uppercase"
                  name="numberPlate"
                  label="Number Plate"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                {isError.numberPlate && (
                  <span className="text-red-500">{isError.numberPlate}</span>
                )}
                <Input
                  type="text"
                  name="entryLocation"
                  label="Entry location"
                  handleChange={handleChange}
                  half
                />
              </>
            ) : (
              <>
                <Input
                  type="text"
                  className="uppercase"
                  name="numberPlate"
                  label="Number Plate"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  type="text"
                  name="exitLocation"
                  label="Exit location"
                  handleChange={handleChange}
                  half
                />
                <Input
                  type="number"
                  name="distance"
                  label="distance / km"
                  handleChange={handleChange}
                />
              </>
            )}
            <div className="w-full flex flex-row justify-between p-4 text-xs">
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={switchMode}
              >
                {isEntry ? "Exit" : "Entry"}
              </Button>
            </div>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EntryExitForm;
