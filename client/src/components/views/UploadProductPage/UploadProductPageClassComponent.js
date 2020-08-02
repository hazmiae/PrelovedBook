import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

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

export class UploadProductPage extends Component {

    state = {
        title: '',
        description: '',
        Categories: 1,
        images: [],
        contactnumber: 0,
        Price: 0
    }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangeContactNumber = (event) => {
        this.setState({ contactnumber: parseInt(event.currentTarget.value, 10) })
    }

    handleChangePrice = (event) => {
        this.setState({ Price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDecsription = (event) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeCategories = (event) => {
        this.setState({ Categories: event.currentTarget.value })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (!this.state.title || !this.state.description || 
            !this.state.Categories || !this.state.images || !this.state.contactnumber
            || !this.state.Price) {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            Categories: this.state.Categories,
            contactnumber: this.state.contactnumber,
            Price: this.state.Price
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('Failed to upload video')
                }
            })
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
    }


    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Book Product</Title>
            </div>

            <Form onSubmit={this.onSubmit}>
               
               <FileUpload refreshFunction={this.updateFiles} />

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={this.handleChangeDecsription}
                    value={this.state.description}
                />
                <br /><br />
                <label>Contact Number</label>
                <Input
                    type="number"
                    onChange={this.handleChangeContactNumber}
                    value={this.state.contactnumber}
                />
                <br /><br />
                <label>Price(RM)</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.Price}
                />
                <br /><br />
                <select onChange={this.handleChangeCategories}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
        )
    }
}

export default UploadProductPage
