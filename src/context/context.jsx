import { createContext, useState, useEffect } from "react";
import { fetchCryptoAccets, fetchCryptoData } from "../api";
import { growPercent } from "../utils/utils";
import { useContext } from "react";

// тут можно и не писать начальные данные, так как они не будут использоваться. Передаётся только то что киадем в поле value провайдера. Тут видимо чисто для наглядности, чтобы можно было посмотреть какие поля будут передаваться
export const CryptoContext = createContext({
	cryptoInfo: {},
	assets: {},
	loading: false,
});

const CryptoContextProvider = function ({ children }) {
	const [loading, setLoading] = useState(false);
	const [cryptoInfo, setCryptoInfo] = useState([]);
	const [assets, setAssets] = useState([]);
	const [isDrawerOpened, setIsDrawerOpened] = useState(false)

	const drawerState = {
		getState() {
			return isDrawerOpened
		},

		setState(state) {
			setIsDrawerOpened(state);
		}
	}

	// эта функция берёт массив assets с нашими валютами и на основе данных из массива cryptoInfo, добавляет к каждому объекту-крипте необходимые нам поля, которые понадобятся далее в работе
	const upgradeAssets = (assets, cryptoInfo) => {
		return assets.map((asset) => {
			const initialCoin = cryptoInfo.find((coin) => coin.id === asset.id);

			return {
				isGroing: asset.price < initialCoin.price,
				totalAmount: asset.amount * initialCoin.price,
				totalProfit:
					asset.amount * initialCoin.price - asset.amount * asset.price,
				growPercent: growPercent(asset.price, initialCoin.price),
				name: initialCoin.name,
				...asset, // оставляем начальные поля итерируемого массива объектов
			};
		});
	};

	useEffect(() => {
		async function fetch() {
			// в useEffect напрямую асинхронщину не пишем, будут ошибки. Поэтому создаём функцию и вызываем её
			setLoading(true);

			const { result } = await fetchCryptoData(); // база данных
			const fetchedAssets = await fetchCryptoAccets(); // закупленные

			// вместо того чтобы напрямую передать массив fetchedAssets, мы сразу рассчитаем и добавим нужные поля
			setAssets(
				upgradeAssets(fetchedAssets, result)  
			);

			setCryptoInfo(result);

			setLoading(false);
		}
		fetch();
	}, []);

	// функция которая к текущему массиву наших валют добавляет новую и прогоняет через обработчик upgradeAssets
	const addAsset = (newAsset) => {
		setAssets(upgradeAssets([...assets, newAsset], cryptoInfo));
	};

	return (
		<CryptoContext.Provider value={{ loading, cryptoInfo, assets, addAsset, drawerState }}>
			{children}
		</CryptoContext.Provider>
	);
};

export default CryptoContextProvider;

export const useCryptoContext = function () {
	return useContext(CryptoContext);
};
