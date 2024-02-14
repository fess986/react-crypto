import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils/utils";
import { useContext } from "react";
import { CryptoContext } from "../../context/context";

const siderStyle = {
	padding: "1rem",
	backgroundColor: "green",
};

// const data = [
// 	"Racing car sprays burning fuel into crowd.",
// 	"Japanese princess to wed commoner.",
// 	"Australian walks 100km after outback crash.",
// 	"Man charged over missing wedding girl.",
// 	"Los Angeles battles huge wildfires.",
// ];

export default function AppSider() {
	// const [loading, setLoading] = useState(false);
	// const [cryptoInfo, setCryptoInfo] = useState([]);
	// const [assets, setAssets] = useState([]);

	// логику получения данных мы перенесли в компонент контекста
	const { assets} = useContext(CryptoContext);

	// console.log(context)

	// по какой то причине реакт ругается если мы используем асинхронную функцию напрямую, он хочет чтобы мы написали внутри асинхронщину в отдельной функциии и вызвали её
	// useEffect(async () => {
	// 	setLoading(true);

	// 	const { result } = await fetchCryptoData();
	// 	const fetchedAssets = await fetchCryptoAccets();

	// 	setCryptoInfo(result);
	// 	fetchCryptoAccets(fetchedAssets);

	// 	setLoading(false);
	// }, []);

	// useEffect(() => {
	// 	async function fetch() {
	// 		setLoading(true);

	// 		const { result } = await fetchCryptoData();  // база данных
	// 		const fetchedAssets = await fetchCryptoAccets();  // закупленные

	// 		// вместо того чтобы напрямую передать массив fetchedAssets, мы сразу рассчитаем и добавим нужные поля
	// 		setAssets(
	// 			fetchedAssets.map((asset) => {
	// 				const initialCoin = result.find((coin) => coin.id === asset.id);
	// 				console.log(initialCoin);

	// 				return {
	// 					isGroing: asset.price < initialCoin.price,
	// 					totalAmount: asset.amount * initialCoin.price,
	// 					totalProfit:
	// 						asset.amount * initialCoin.price - asset.amount * asset.price,
	// 					growPercent: growPercent(asset.price, initialCoin.price),
	// 					...asset, // оставляем начальные поля итерируемого массива объектов
	// 				};
	// 			})
	// 		);
	// 		setCryptoInfo(result);

	// 		setLoading(false);
	// 	}
	// 	fetch();
	// }, []);

	// console.log(cryptoInfo);
	// console.log(assets);

	// if (loading) {
	// 	return <Spin fullscreen />;
	// }

	return (
		<Layout.Sider width={"25%"} style={siderStyle}>
			{assets.map((asset) => (
				<Card key={asset.id} style={{ marginBottom: "1rem" }}>
					<Statistic
						title={capitalize(asset.id)}
						value={asset.amount*asset.price}
						precision={2}
						valueStyle={{
							color: asset.isGroing ? "#3f8600" : "#cf1322",
						}}
						prefix={
							asset.isGroing ? <ArrowUpOutlined /> : <ArrowDownOutlined />
						}
						suffix="$"
					/>
					<List
						size="small"
						bordered
						dataSource={[
							{
								title: "Total Profit",
								value: asset.totalProfit,
								withTag: true,
							},
							{ title: "Accet Amount", value: asset.amount, isPlain: true }, // сами добавим поле isPlain: true, для того чтобы в последствии не обрабатывать отдельно это поле
							// { title: "Difference", value: asset.growPercent },
						]}
						// рендерим входящий массив данных dataSource и выводим в нужном нам формате
						renderItem={(item) => (
							<List.Item>
								{/* <Typography.Text mark>[ITEM1]</Typography.Text> {item} */}
								<span>{item.title}</span>
								<span>
									{item.withTag && <Tag color={asset.isGroing ? "green" : "red"}>{asset.growPercent}%</Tag>}
									{item.isPlain && item.value}
									{!item.isPlain && (
										<Typography.Text
											type={asset.isGroing ? "success" : "danger"}
										>
											{item.value.toFixed(2)}
										</Typography.Text>
									)}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}

			{/* <Card>
				<Statistic
					title="Idle"
					value={9.3}
					precision={2}
					valueStyle={{
						color: "#cf1322",
					}}
					prefix={<ArrowDownOutlined />}
					suffix="%"
				/>
			</Card> */}
		</Layout.Sider>
	);
}
