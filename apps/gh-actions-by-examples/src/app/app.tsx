import { Header } from './components/Header';
import { Router } from './router';

export function App() {
  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <Header />
      <Router />
    </div>
  );
}

export default App;
