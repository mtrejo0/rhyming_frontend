import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(false)

  const getRhymes = async () => {
    const bodyContent = { text };
    setLoading(true)

    await axios.post("https://vo42dkc6z2.execute-api.us-east-2.amazonaws.com/dev", bodyContent).then((res) => {

      setResult(res.data.body);
    }).catch( (err) => console.warn(err))
    .then(() => setLoading(false))
  };

  const getLines = () => {
    const lines = text.split("\n");

    return lines.map((line) =>
      line.split(" ").map((each) =>
        each
          .toLowerCase()
          .replace(/[^\w\s\']|_/g, "")
          .replace(/\s+/g, " ")
      )
    );
  };

  return (
    <Box sx={{ margin: "32px" }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        fullWidth
        label="Add your lyrics!"
      ></TextField>
      <Button onClick={async () => await getRhymes()} variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
      {loading && <p>Loading ...</p>}
      <Box m={4}>
        {getLines().map((line) => {
          return (
            <Stack direction="row" spacing={1} key={line.toString()}>
              {line.map((each) => {
                let c = undefined;
                if (result?.colors?.[each]) {
                  c = result?.colors?.[each];
                }
                return (
                  <Grid xs={2} item sx={{ background: c }} key={each}>
                    <Box
                      style={{
                        margin: "4px",
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}
                    >
                      {each}
                    </Box>
                  </Grid>
                );
              })}
            </Stack>
          );
        })}
      </Box>

    </Box>
  );
}

export default App;
