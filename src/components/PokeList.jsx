import React, { useContext } from 'react';
import { PokeContext } from '../context/PokeContext';
import { Card } from './Card';
import { Loader } from './Loader';

export const PokeList = () => {
	const { allPokemons, loading, filteredPokemons } =
		useContext(PokeContext);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='card-list-pokemon container'>
					{filteredPokemons.length ? (
						<>
							{filteredPokemons.map(pokemon => (
								<Card pokemon={pokemon} key={pokemon.id} />
							))}
						</>
					) : (
						<>
							{allPokemons.map(pokemon => (
								<Card pokemon={pokemon} key={pokemon.id} />
							))}
						</>
					)}
				</div>
			)}
		</>
	);
};