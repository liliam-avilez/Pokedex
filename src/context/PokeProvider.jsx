import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokeContext } from '../context/PokeContext';

export const PokeProvider = ({ children }) => {
	const [allPokemons, setAllPokemons] = useState([]);
	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [offset, setOffset] = useState(0);

	
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

	
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState(false);

	
	const getAllPokemons = async (limit = 20) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);
		setLoading(true);
	};

	
	const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=20&offset=0`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setGlobalPokemons(results);
		setLoading(false);
	};

	
	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

	useEffect(() => {
		getAllPokemons();
	},[]);

	useEffect(() => {
		getGlobalPokemons();
	},[]);

	
	const onClickLoadMore = () => {
		setOffset(offset + 20);
		getAllPokemons();
	};

	
	const [typeSelected, setTypeSelected] = useState({
		grass: false,
		flying: false,
		poison: false,
		fire: false,
		water: false,
		bug: false,
		normal: false,
	});

	const [filteredPokemons, setfilteredPokemons] = useState([]);

	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
		}
	};

	return (
		<PokeContext.Provider
			value={{
				valueSearch,
				onInputChange,
				onResetForm,
				allPokemons,
				globalPokemons,
				getPokemonByID,
				onClickLoadMore,
				
				loading,
				setLoading,
				
				active,
				setActive,
				
				handleCheckbox,
				filteredPokemons,
			}}
		>
			{children}
		</PokeContext.Provider>
	);
};