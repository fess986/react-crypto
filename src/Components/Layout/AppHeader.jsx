import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCryptoContext } from "../../context/context";
import { useState } from "react";
import { useEffect } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
	display: "flex",
	width: "100%",
	textAlign: "center",
	color: "#fff",
	height: 60,
	padding: "1rem",
	justifyContent: "space-between",
	alignItems: "center",
	backgroundColor: "#4096ff",
};

// const options = [
//   {
//     label: 'China',
//     value: 'china',
//     emoji: '🇨🇳',
//     desc: 'China (中国)',
//   },
//   {
//     label: 'USA',
//     value: 'usa',
//     emoji: '🇺🇸',
//     desc: 'USA (美国)',
//   },
//   {
//     label: 'Japan',
//     value: 'japan',
//     emoji: '🇯🇵',
//     desc: 'Japan (日本)',
//   },
//   {
//     label: 'Korea',
//     value: 'korea',
//     emoji: '🇰🇷',
//     desc: 'Korea (韩国)',
//   },
// ];

export default function AppHeader() {
	const [isSelectOpened, setIsSelectOpened] = useState(false);
	const [isSModalOpened, setIsSModalOpened] = useState(false);
	const [isDrawerOpened, setIsDrawerOpened] = useState(false);
	const [coin, setCoin] = useState(null);

	const { cryptoInfo } = useCryptoContext();

	useEffect(() => {
		const keydown = (event) => {
			if (event.key === "=") {
				setIsSelectOpened((prev) => !prev);
			}
		};
		document.addEventListener("keydown", keydown);

		return document.removeEventListener("keydown", keydown);
	}, []);

	// хендлер для смены значения селекта.
	const handleSelect = (value) => {
		console.log(`selected ${value}`);
		setIsSModalOpened(true);
		setCoin(cryptoInfo.find((coin) => coin.id === value));
	};

	const optionsCrypto = cryptoInfo.map((coin) => ({
		label: coin.name,
		value: coin.id,
		icon: coin.icon,
	}));

	return (
		<Layout.Header style={headerStyle}>
			<Select
				// mode="multiple" // мультиселект
				style={{
					width: 250,
				}}
				// placeholder="ass"
				// defaultValue={['china']}
				// onChange={handleChange}
				onClick={() => setIsSelectOpened((prev) => !prev)}
				open={isSelectOpened}
				onSelect={handleSelect}
				value="press 1 to open"
				optionLabelProp="label"
				options={optionsCrypto}
				optionRender={(
					option // вся инфа берётся из переданного массива данных options и помещается в поле option.data
				) => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							alt={option.data.value}
						/>{" "}
						{option.data.label}
						{/* <p>{`${option.data.label} ${option.data.value} ${option.data.icon}`}</p> */}
					</Space>
				)}
			/>

			<Button type="primary" onClick={() => setIsDrawerOpened(true)}>
				Add Asset
			</Button>

			<Modal
				// title="Basic Modal"
				open={isSModalOpened}
				onOk={() => setIsSModalOpened(false)}
				onCancel={() => setIsSModalOpened(false)}
			>
				<CoinInfoModal coin={coin} />
			</Modal>

			<Drawer
				destroyOnClose  // обнуляем все параметры при закрытии. Это нужно для того чтобы обнулять стейт текущей валюты
				width={600}
				title="Add Asset"
				onClose={() => setIsDrawerOpened(false)}
				open={isDrawerOpened}
			>
				<AddAssetForm onResultButtonClick={() => setIsDrawerOpened(false)}/>
			</Drawer>
		</Layout.Header>
	);
}
