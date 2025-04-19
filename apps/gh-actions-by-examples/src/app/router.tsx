import { Route, Routes, Link } from 'react-router-dom';
import { ExamplePage } from './pages/Example';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ExamplePage />} />
      <Route path="/:example" element={<ExamplePage />} />
    </Routes>
  );
}
