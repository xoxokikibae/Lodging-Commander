import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Table } from "react-bootstrap";

const ShowOne = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const id = parseInt(params.id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const selectOne = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/board/showOne/${id}`);
                if (resp.status === 200) {
                    console.log(resp.data);
                    setData(resp.data);
                }
            } catch (e) {
                console.error(e);
                setError('데이터를 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        selectOne();
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
                    <td colSpan={2}>제목: {data.title}</td>
                </tr>
                <tr>
                    <td colSpan={2}>글번호: {data.id}</td>
                </tr>
                <tr>
                    <td>작성일: {data.uploadDateTime || data.createdAt}</td>
                    <td>수정일: {data.editDateTime || data.updatedAt}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용</td>
                </tr>
                <tr>
                    <td colSpan={2}>{data.content}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="text-center">
                        <Button onClick={goBack}>뒤로 가기</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default ShowOne;