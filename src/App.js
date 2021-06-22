import React,{useState,useEffect} from 'react';
import Togin from './pages/home/Team.js';
import Players from './pages/players/Players'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


const App = () =>{ 

    const [isSignedIn,setSignedIn] = useState(true)


    return(
            <Router>          
                <Switch>
                    <Route  exact path='/Players' >
                        <Players/>
                    </Route>
                    <Route exact path='/'>
                        <Togin />
                    </Route>                   
                    
                </Switch>
            </Router>
        );
}

export default App;
