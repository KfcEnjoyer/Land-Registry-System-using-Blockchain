import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import { Properties } from './pages/properties';
import { Submit } from './pages/submit-property';
import { Signin } from './pages/signin';
import { Profile } from './pages/profile';
import { PropertyDetails } from './pages/propertyDetails';
import PropertyList from './pages/propertyList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='properties' element={<Properties/>}/>
      <Route path="properties/:propertyId" element={<PropertyDetails/>} />
      <Route path='submit' element={<Submit/>}/>
      <Route path='signin' element={<Signin/>}/>
      <Route path='/profile/:walletAddress' element={<Profile />} />
      <Route path='property-list/:walletAddress' element={<PropertyList />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);