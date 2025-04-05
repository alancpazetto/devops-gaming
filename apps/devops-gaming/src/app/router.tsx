import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/page-2"
        element={
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        }
      />
    </Routes>
  );
}
