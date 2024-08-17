import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Table } from "react-bootstrap";

import './ShowOne.css';

const ShowOne = () => {
    const [data, setData] = useState({
        title:'',
        id: null,
        uploadDateTime:'',
        editDateTime:'',
        content:''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    const id = parseInt(params.id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/faqBoard/faqDetails/showOne/${id}`);
                if (resp.status === 200) {
                    console.log(resp.data);
                    setData(resp.data);
                }
            } catch (e) {
                console.error(e);
                setError('Failed to load data.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="mt-3">
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <td colSpan={2}><strong>Title:</strong> {data.title}</td>
                </tr>
                <tr>
                    <td colSpan={2}><strong>ID:</strong> {data.id}</td>
                </tr>
                <tr>
                    <td><strong>Upload Date:</strong> {data.uploadDateTime ? data.uploadDateTime : 'N/A'}</td>
                    <td><strong>Edit Date:</strong> {data.editDateTime ? data.editDateTime : 'N/A'}</td>
                </tr>
                <tr>
                    <td colSpan={2}><strong>Content:</strong></td>
                </tr>
                <tr>
                    <td colSpan={2}>{data.content}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="text-center">
                        <Button onClick={goBack}>Go Back</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default ShowOne;
