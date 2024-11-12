
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/index.css'
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient";

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
)
