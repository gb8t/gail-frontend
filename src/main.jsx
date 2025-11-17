import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
	BrowserRouter,
	Routes,
	Route,
	Link
} from "react-router-dom";

import Home from './pages/home'
import CadastroPessoa from './pages/cadastro_pessoa'
import Formulario from './pages/formulario'

import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/cadastro-pessoa" element={<CadastroPessoa />} />
				<Route path="/formulario" element={<Formulario />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
