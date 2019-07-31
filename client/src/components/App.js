
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Surveys from './Surveys';



class App extends Component {

    constructor (props) {
        super(props);
        this.props.fetchUser();
    }

    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <Header/>
                    <div>
                        <Route exact path="/" component={Landing}></Route>   
                        <Route exact path="/surveys" component={Surveys}></Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


  
  export default connect(
    null,
    actions // selectSong is the actionCreater we imported
  )(App);
  








// import React from 'react';
// import {BrowserRouter, Route} from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
// import Header from './Header';

// class App extends React.Component {

//     componentDidMount () {
//         this.props.fetchUser();
//     }

//     render () {
//         let isUserLogin = this.props.User === null ? false: true;
//         return (
//             <div className="container">
//                 <BrowserRouter>
//                     <div>
//                         <Header isUserLogin={isUserLogin}></Header>
//                         <Route path="/" ></Route>
//                         <Route></Route>
//                         <Route></Route>
//                     </div>
//                 </BrowserRouter>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return { User: state.User }; // this object is what is passed as props into SongList components
//   };
  
//   export default connect(
//     mapStateToProps,
//     { fetchUser: actions.fetchUser } // selectSong is the actionCreater we imported
//   )(App);
  

// export default App;