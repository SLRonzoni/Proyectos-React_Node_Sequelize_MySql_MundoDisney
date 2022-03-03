import  React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

import AllMovies from './components/AllMovies';
import FormMovies from './components/FormMovies';
import EditMovie from './components/EditMovie';
import OneMovie from './components/OneMovie';


import AllGenders from './components/AllGenders';
import FormGenders from './components/FormGenders';
import EditGenders from './components/EditGenders';

import AllCharacters from './components/AllCharacters';
import FormCharacters from './components/FormCharacters';
import OneCharacter from './components/OneCharacter';
import EditCharacters from './components/EditCharacters';

function App(){

   return(
      <BrowserRouter>
            <Navbar />
            
            <div className="container-fluid">

               <Route exact path="/" component={Home}/>
               <Route exact path="/auth/register" component={Register}/>
               <Route exact path="/auth/login" component={Login}/>
               
               
               <Route exact path="/FormMovies"  component={FormMovies}/>
               <Route exact path="/AllMovies" component={AllMovies}/>
               <Route exact path="/movies/edit/:id"component={EditMovie}/>
               <Route exact path="/movies/:id" component={OneMovie}/>
               
               <Route exact path="/FormCharacters" component={FormCharacters}/>
               <Route exact path="/AllCharacters"component={AllCharacters}/>
               <Route exact path="/characters/:id"component={OneCharacter}/>
               <Route exact path="/characters/edit/:id"component={EditCharacters}/>
               
               <Route exact path="/FormGenders" component={FormGenders}/>
               <Route exact path="/AllGenders"component={AllGenders}/>
               <Route exact path="/genders/edit/:id"component={EditGenders}/>

            </div>
      </ BrowserRouter>  
   );
}

export default App;
