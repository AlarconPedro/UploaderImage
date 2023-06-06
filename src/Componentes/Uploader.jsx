import React, { Component } from "react";

import "./Uploader.css";

const initialState = {
    file: null,
    imagePreviewUrl: null
}

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} alt="preview" />;
        } else {
            $imagePreview = <div className="previewText">Please select an Image for Preview</div>;
        }
        return (
            <div className="previewComponent">
                <form onSubmit={e => this._handleSubmit(e)}>
                    <input className="fileInput" type="file" onChange={e => this._handleImageChange(e)} />
                    <button className="submitButton" type="submit" onClick={e => this._handleSubmit(e)}>
                        Upload Image
                    </button>
                </form>
                <div className="imgPreview">{$imagePreview}</div>
            </div>
        );
    }
}
