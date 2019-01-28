import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NewPage from './components/New Page/NewPage';
import Errors from "./components/Error/Error";
import LoginRegisterPage from "./components/RegisterLoginPage/registerLoginPage";

interface IProps{

}
interface IState{

}

class App extends React.Component<IProps,IState>{

  constructor(props: any){
    super(props);
    this.state= {
    }
  } 

  public render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginRegisterPage}/>
            <Route exact path="/landing-page" component={NewPage}/>
            <Route path="*" component={Errors}/>
          </Switch>
        </Router> 
      </div>
    )
  }
}

export default App;
