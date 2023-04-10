import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '../Card';
import { PokeContext } from '../../context/PokeContext';

export const SearchPage = () => {
	const location = useLocation();

	const { globalPokemons } = useContext(PokeContext);

	const filteredPokemons = globalPokemons.filter(pokemon =>
		pokemon.name.includes(location.state.toLowerCase())
	);

	return (
		<div className='container'>
			<p className='p-search'>
				Se encontraron <span>{filteredPokemons.length}</span>{' '}
				resultados:
			</p>
			<div className='card-list-pokemon container'>
				{filteredPokemons.map(pokemon => (
					<Card pokemon={pokemon} key={pokemon.id} />
				))}
			</div>
		</div>
	);
};