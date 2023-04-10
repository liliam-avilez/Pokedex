import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


import { HomePage, Pokemons, SearchPage } from './components/Pages';
import { Navigation } from './components';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<HomePage />} />
				<Route path='pokemon/:id' element={<Pokemons />} />
				<Route path='search' element={<SearchPage />} />
			</Route>

            <Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
