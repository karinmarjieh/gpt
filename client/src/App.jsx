import { useState } from "react";
import "./App.css";
import logo from "./assets/chatgpt.svg";

import {
  Modal,
  Typography,
  Box,
  TextField,
  LinearProgress,
} from "@mui/material/";
import axios from "axios";
import { GPTResponse } from "./components/GPTResponse";

function App() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // prevent refreshing
  //   setResponse("");
  //   setLoading(true);
  //   const res = await axios.post("http://localhost:3001/chat", { prompt });
  //   setResponse(res.data);
  //   setLoading(false);
  //   console.log(res.data);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // Update the component state with the response
      setResponse(res.data);
      console.log("Response from server:", res.data);
    } catch (error) {
      // Handle errors appropriately (e.g., display an error message to the user)
      console.error("Error fetching data:", error);
    } finally {
      // Always set loading to false, whether the request succeeds or fails
      setLoading(false);
    }
  };
  return (
    <>
      <div className="app">
        <img src={logo} />
        <button onClick={handleOpen} className="btn">
          ask me anything !
        </button>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          className="chatgpt-modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="container">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Drop your questions
            </Typography>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                id="outlined-basic"
                label="Query"
                variant="outlined"
                sx={{ margin: "15px 0", width: "100%" }}
              />
              <button
                onSubmit={(e) => handleSubmit(e)}
                type="submit"
                className="btn"
              >
                Submit
              </button>
            </form>
            {loading && <LinearProgress sx={{ margin: "20px" }} />}
            {response && <GPTResponse response={response} />}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default App;
