import React, {useRef, useState} from "react";
import {Button, DatePicker, Divider, Flex, Form, InputNumber, Result, Select, Space, Typography} from "antd";
import {useCrypto} from "../context/cryptoContext.jsx";
import CoinInfo from "./CoinInfo.jsx";

const validateMessages = {
    required: '${label} is required',
    types: {
        number: '${label} in not validate number',
    },
    number: {
        range: '${label} is must be between ${min} and ${max}'
    }
}

const AddAssetForm = ({onClose}) => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef();

    if (!coin) {
        return (
            <Select
                style={{width: "100%"}}
                placeholder="select coin"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                onSelect={(v) => setCoin(crypto.find((coin) => coin.id === v))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {' '}
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    if(submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added!"
                subTitle={`Added ${assetRef.current.amount} of ${crypto.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console"
                            onClick={onClose}
                    >
                        Close
                    </Button>,
                ]}
            />
        )
    }

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset;
        setSubmitted(true)
        addAsset(newAsset)
    }

    const handleAmountChange = (value) => {
        const price =  form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    const handlePriceChange = (value) => {
        const amount =  form.getFieldValue('amoutn')
        form.setFieldsValue({
            total: +(value * amount).toFixed(2),
        })
    }

    return (
        <Form
            form={form}
            name="addAssetForm"
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
            style={{maxWidth: 600}}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin}/>

            <Divider/>

            <Form.Item
                label="Amount"
                name="amount"
                rules={[{required: true, type: "number", min: 0}]}
            >
                <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            >
                <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber disabled style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Date & Time"
                name="date"
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddAssetForm;