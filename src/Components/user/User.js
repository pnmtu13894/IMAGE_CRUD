import React, {Component} from 'react';
import {Row, Col, Jumbotron, Button, FormGroup, ControlLabel} from 'react-bootstrap';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import FormControl from "react-bootstrap/es/FormControl";

class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            imageName: '',
            image: '',
            isUploading: false,
            progress: 0,
            imageURL: ''
        };

        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleImageNameChange = this.handleImageNameChange.bind(this);
    }

    handleImageNameChange(e){
        this.setState({
           imageName: e.target.value.replace(" ", "_")
        });
    }

    handleUploadStart(){
        this.setState({
            isUploading: true,
            progress: 0
        });
    }

    handleProgress(progress) {
        this.setState({progress: progress});
    }

    handleUploadError(error) {
        this.setState({
            isUploading: false
        });
        console.error(error);
        alert('Cannot upload this image');
    }

    handleUploadSuccess(filename) {

        this.setState({
            image: filename,
            progress: 100,
            isUploading: false
        });





        console.log(this.state.imageName);
        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then((url) => {this.setState({imageURL: url})})
            .then(() => {

                const data = {};

                data['images/' + this.state.imageName] = {
                    imageName: filename,
                    date: new Date().toLocaleDateString(),
                    imageURL: this.state.imageURL
                };

                firebase.database().ref().update(data);
                console.log(data);
                alert('Successfully uploaded image.');
            });

    }

   render() {
        return (
            <div>
                <form>
                    <FormGroup>
                        <ControlLabel>Image Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.imageName}
                            placeholder="Enter image name"
                            onChange={this.handleImageNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Image:</ControlLabel>
                        {this.state.isUploading &&
                        <p>Progress: {this.state.progress}%</p>
                        }
                        {this.state.avatarURL &&
                        <img src={this.state.avatarURL} />
                        }
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            filename={(file) => this.state.imageName + file.name.split('.')[1] }
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </FormGroup>

                </form>
            </div>
        )
   }


}

export default User;