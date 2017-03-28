import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();
app.use(createLoading());

app.model(require("./models/myBread"));

// app.model(require("./models/menu"));

app.model(require("./models/agentDetail"));

app.model(require("./models/withdrawConfig"));

app.model(require("./models/member"));

app.model(require("./models/roleAdd"));

app.model(require("./models/role"));

app.model(require("./models/adminAdd"));

app.model(require("./models/admin"));

app.model(require("./models/agentAdd"));

app.model(require("./models/agent"));

app.model(require("./models/withdrawDetail"));

app.model(require("./models/withdraw"));

app.model(require("./models/singleDetail"));

app.model(require("./models/dailyDetail"));

app.model(require("./models/award"));

app.model(require("./models/userDetail"));

app.model(require("./models/user"));

app.model(require("./models/homePage"));

app.model(require("./models/tenant/homePage"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
