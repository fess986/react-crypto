import { Layout, Typography } from "antd";
import { useCryptoContext } from "../../context/context";
import PortfolioChart from "./PortfolioChart";
import AccetsTable from "./AccetsTable";

const contentStyle = {
	textAlign: "center",
	minHeight: "calc(100vh - 60px)", // вычисляем высоту так, чтобы из всей высоты вычитывалась высота хедера, которая у нас составляет 60px
	color: "#fff",
	backgroundColor: "#001529",
	padding: "1rem",
};

export default function AppContent() {
	const { cryptoInfo, assets } = useCryptoContext();

	// создадим карту стоимости валют на основе массива валют cryptoInfo, для того чтобы в дальнейшем избежать итерирования по этому массиву каждый раз, когда нам нужно узнать цену какой либо валюты
	const cryptoCoinCosts = cryptoInfo.reduce((acc, coin) => {
		acc[coin.id] = coin.price; // добавляем поля к предыдущему вызову функции
		return acc; // возвращаем новое значение суммирующего объекта
	}, {}); // начальное значение - пустой объект
	// в итоге получим объект вида {id : cryptoInfo.price}

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
				Portfolio :{" "}
				{assets
					.map((asset) => {
						// const coin = cryptoInfo.find(c => c.id === asset.id)
						return asset.amount * cryptoCoinCosts[asset.id];
					})
					.reduce((acc, price) => (acc += price), 0)
					.toFixed(2)}
			</Typography.Title>
      <PortfolioChart />
      <AccetsTable />
		</Layout.Content>
	);
}
