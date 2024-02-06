import { ErrorPage } from 'pages';
import { CalcPage } from 'pages/calc';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to={'/form?step=0'}></Navigate>}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path="/form" element={<CalcPage />}></Route>
    </>
  )
);
