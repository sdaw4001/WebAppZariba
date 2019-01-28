"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const PORT = 4999;
App_1.default.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[32m\x1b[0m', 'Express server listening on port : ', `${PORT}`);
});
//# sourceMappingURL=server.js.map