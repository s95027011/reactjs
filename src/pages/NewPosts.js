import React from "react";
import { Container, Header, Form, Image, Button } from "semantic-ui-react";

import 'firebase/compat/firestore';
import firebase from "../utils/firebase";



function NewPosts(){
    const [title, setTitle] = React.useState('');
    const [content, setcContent] = React.useState('');
    const [topics, setTopics] = React.useState([]);
    const [topicsName, setTopicsName] = React.useState("");
    const [file, setFile] = React.useState(null);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                });
                // console.log(data);
                setTopics(data);
            });
    }, []);

    const options = topics.map(topics => {
        return {
            text: topics.name,
            value: topics.name
        }
    });

    const previewUrl = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png";

    return (
        <Container>
            <Header>發表文章</Header>
            <Form>
                <Image 
                    src={previewUrl}
                    size="small" 
                    floated="left"
                />
                <Button basic as="label" htmlFor="post-image">Upload an image</Button>
                <Form.Input 
                    type="file" 
                    accept="image/*" 
                    id="post-image" 
                    style={{ display: "none" }} 
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }}
                />

                <Form.Dropdown 
                    placeholder = "Select the article topic"
                    options={options}
                    selection
                    value={topicsName}
                    onChange={(e, {value}) => setTopicsName(value)}
                />
                
                <Form.Input 
                    placeholder = "Enter the article title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}    
                />

                <Form.TextArea 
                    placeholder = "Enter the article content" 
                    value={content} 
                    onChange={(e) => setcContent(e.target.value)}    
                />

                <Form.Button>Submit</Form.Button>
            </Form>
        </Container>
    );
}

export default NewPosts;