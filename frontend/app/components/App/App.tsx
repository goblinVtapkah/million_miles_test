'use client'

import { configureStore } from '@reduxjs/toolkit'
import { Cars } from '../Cars/Cars'
import { apiSlice } from '../../store/apiSlice'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CarCard } from '../CarCard/CarCard'

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

const App = () => {
	return (
		<Provider store={store}>
			<div className="bg-white py-6 px-16 min-h-screen">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Cars />} />
						<Route path="/car/:id" element={<CarCard />} />
					</Routes>
				</BrowserRouter>
			</div>
		</Provider>
	)
}

export default App