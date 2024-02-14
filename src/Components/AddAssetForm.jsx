import {
	Select,
	Space,
	Divider,
	Form,
	InputNumber,
	Button,
	DatePicker,
	Result
} from "antd";

import { useState } from "react";
import { useCryptoContext } from "../context/context";
import CoinInfo from "./CoinInfo";
import { useRef } from "react";

export default function AddAssetForm({onResultButtonClick}) {
	const [coin, setCoin] = useState(null);  // коин устанавливаем из селекта, при выборе
	const { cryptoInfo, addAsset } = useCryptoContext();
	const [isFormSubmited, setIsFormSubmited] = useState(false);
	const assetRef = useRef();  // объявляем реф - переменную assetRef

	const [form1] = Form.useForm(); // для управления значениями формы мы через хук useForm получаем объект form для дальнейшей привязки его к объекту формы и управлению полями. При этом просто первый объект формы называем form1 (как угодно - это просто деструкторизация первой и в нашем случае единственной формы)

	const optionsCrypto = cryptoInfo.map((coin) => ({
		label: coin.name,
		value: coin.id,
		icon: coin.icon,
	}));

	// эту штуку надо добавить в аттрибуты формы, она переписывает валидацию полей по умолчанию на наши правила, далее в полях мы прописываем в Form.Item - объект rules, в котором мы уже указываем каким правилам подчиняться
	const validateMessages = {
		required: "'${name}' ${label} is required!", // ${name} и {label} - это обращение к полям валидируемого поля
		types: {
			number: "${label} is very bad number!!!",
		},
		number: {
			range: "${label} must be between ${min} and ${max}",
		},
	};

	if (isFormSubmited) {
		return (
			<Result
				status="success"
				title="Successfully Added new Asset"
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type="primary" key="console" onClick={onResultButtonClick}>
						Close
					</Button>,
				]}
			/>
		);
	}

	if (!coin) {
		return (
			<Select
				// mode="multiple" // мультиселект
				style={{
					width: "100%",
				}}
				placeholder="choose coin"
				// defaultValue={['china']}
				// onChange={handleChange}
				// open={isSelectOpened}
				onSelect={(value) =>
					setCoin(cryptoInfo.find((coin) => coin.id === value))
				}
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
		);
	}

	const handleAmountChange = (value) => {
		const price = form1.getFieldValue("price");
		form1.setFieldsValue({
			total: +(value * price).toFixed(2),
		});
	};

	const handlePriceChange = (value) => {
		const amount = form1.getFieldValue("amount");
		form1.setFieldsValue({
			total: +(value * amount).toFixed(2),
		});
	};

	const onFinish = (values) => {
		setIsFormSubmited(true);
		const newAsset = {
			id : coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$id ?? new Date(),
		}
		assetRef.current = newAsset;  // записываем в поле current нашего рефа константу из кода, которую хотим использовать в других местах
		addAsset(newAsset)
	};

	return (
		<Form
			form={form1} // обязательно прибиваем инстанс useForm к самой форме
			name="basic"
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 10,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				price: +coin.price.toFixed(2),
			}}
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<CoinInfo coin={coin} />

			<Divider />

			<Form.Item
				label="Amount"
				name="amount"
				// в правилах мы пишем условия для валидатора
				rules={[
					{
						// required: true,
						type: "number",
						// message: "Please input your username!", // валидация по умолчанию, у нас будет своя
						min: 0, // указываем валидатору минимальные и максимальные значения
						max: 1000,
					},
				]}
			>
				<InputNumber onChange={handleAmountChange} style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item label="Price" name="price">
				<InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item label="Date & Time" name="date">
				<DatePicker showTime />
			</Form.Item>

			<Form.Item label="Total" name="total">
				<InputNumber style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Add Asset
				</Button>
			</Form.Item>
		</Form>
	);
}
