import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Categories = [
    { key: 1, value: "Science" },
    { key: 2, value: "Physic" },
    { key: 3, value: "Math" },
    { key: 4, value: "Computer" },
    { key: 5, value: "Law" },
    { key: 6, value: "Usul Fiqh" },
    { key: 7, value: "Chemistry" },
    { key: 8, value: "Others" }
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [ContactNumberValue, setContactNumberValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [CategoriesValue, setCategoriesValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onContactNumberChange = (event) => {
        setContactNumberValue(event.currentTarget.value)
    }


    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategoriesSelectChange = (event) => {
        setCategoriesValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue || !ContactNumberValue || 
            !CategoriesValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            contactnumber: ContactNumberValue,
            Price: PriceValue,
            images: Images,
            Categories: CategoriesValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Book Product</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Contact Number</label>
                <Input
                    onChange={onContactNumberChange}
                    value={ContactNumberValue}
                />
                <br />
                <br />
                <label>Price(RM)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onCategoriesSelectChange} value={CategoriesValue}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
