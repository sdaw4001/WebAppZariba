import app from "./App";

const PORT = 4999;

app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[32m\x1b[0m', 'Express server listening on port : ', `${PORT}`);
})

