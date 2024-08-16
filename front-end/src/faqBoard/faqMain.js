import React, {useState, useEffect} from 'react';
import './faqMain.css';
import {Search, X} from 'lucide-react';
import axios from 'axios';

const defaultCategories = [
    {
        id: 1, title: "숙소", icon: "🏨", documents: [
            {id: 1, title: "숙소 예약 변경", content: "여행 계획을 변경하고 싶으신가요?"},
            {id: 2, title: "숙소 예약 취소", content: "여행 계획을 취소해야 하나요? 환불 관련은 FAQ 취소 및 환불에서 더 자세하게 안내해드립니다."},
            {id: 3, title: "숙소 체크인 및 체크아웃", content: "숙소 체크인과 체크아웃에 대한 모든 것"}
        ]
    },
    {
        id: 2, title: "결제", icon: "💳", documents: [
            {id: 1, title: "결제 수단 변경", content: "결제 수단 변경은 1:1 문의에 남겨주세요"},
            {id: 2, title: "결제 거부 발생 시 해결책", content: "결제가 거부되면 다음과 같은 이유 때문일 수 있습니다."},
            {id: 3, title: "결제에 대한 영수증 받기", content: "영수증 수령 방법은 예약한 방법에 따라 달라집니다. 1. 현장 결제 2. 온라인에서 미리 결제"},
        ]
    },
    {
        id: 3, title: "취소 및 환불", icon: "🔙", documents: [
            {id: 1, title: "취소 및 환불 정책 및 절차", content: "구매 결정했던 숙소를 변경하거나 취소하고 환불받길 원하시나요?"},
            {id: 2, title: "환불 시기", content: "환불은 카드사에 따라 달라질 수 있습니다. 계좌 이체 및 무통장 입금의 경우 주말 및 공휴일 제외 3일 이내로 환불이 됩니다."},
            {id: 3, title: "숙소 예약 취소 및 환불 환급금", content: "숙소 예약 7일 전 100%, 숙소 예약 3일 전 50%, 숙소 예약 24시간 이내 환불 및 취소 불가 "}
        ]
    },
    {
        id: 4, title: "회원 정보", icon: "👤", documents: [
            {id: 1, title: "회원 정보 수정", content: "회원 정보 수정은 '로그인 후' 개인정보수정에서 할 수 있습니다."},
            {id: 2, title: "회원 탈퇴", content: "회원 탈퇴는 '로그인 후' 개인정보에서 탈퇴가 가능합니다."},
            {id: 3, title: "회원 개인정보 삭제 요청", content: "개인정보 삭제 요청은 1:1 문의를 통해 연락주세요. "},
        ]
    },
];

const FaqMainHeading = {
    fontFamily: 'Josefin Sans, Nanum Gothic',
    fontStyle: 'Normal',
    fontWeight: '400',
    fontOpticalSizing: 'auto',
}

const SearchBarStyle = {
    fontFamily: 'Josefin Sans, Nanum Gothic',
    fontStyle: 'Normal',
    fontWeight: '400',
    fontOpticalSizing: 'auto',
}

function FaqMain() {
    const [searchTerm, setSearchTerm] = useState('');

    const [activePopup, setActivePopup] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [faqCategories, setFaqCategories] = useState(defaultCategories);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:8080/faqBoard/categories-with-documents')
            .then(response => {
                console.log('API response', response.data);
                const categories = Array.isArray(response.data) && response.data.length > 0 ? response.data : defaultCategories;
                console.log('Categories to be set:', categories);
                setFaqCategories(categories);
            })
            .catch(error => {
                console.error('Error fetching faq categories', error);
                console.log('Using default categories');
                setFaqCategories(defaultCategories);
            })
            .finally(() => {
                setIsLoading(false);
            })
        ;
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    const openDocument = (document => {
        setSelectedDocument(document);
        setActivePopup('document');
    })

    const closeDocument = () => {
        setActivePopup(null);
        setSelectedCategory(null);
        setSelectedDocument(null);
    }

    const openCategoryDetails = (category) => {
        setSelectedCategory(category);
    }

    return (
        <div className="faq-main-container">
            <h2 className="faq-main-heading" style={FaqMainHeading}> 자주 묻는 질문(FAQ)센터에 오신 것을 환영합니다</h2>

            <div>
                <form onSubmit={handleSearch} className="faq-search-form">
                    <input
                        type="text"
                        placeholder="질문을 검색하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="faq-search-input"
                        style={SearchBarStyle}
                    />
                    <button type="submit" className="faq-search-button">
                        <Search size={20}/>
                    </button>
                </form>
            </div>

            <div className="faq-categories-grid">
                {isLoading ? (
                    <p>Loading categories...</p>
                ) : faqCategories.length > 0 ? (
                    faqCategories.map(category => (
                        <div key={category.id} className="faq-category-item">
                            <span className="faq-category-icon">{category.icon}</span>
                            <span className="faq-category-title">{category.title}</span>
                            <ul className="faq-category-list">
                                {category.documents.map(doc => (
                                    <li key={doc.id} onClick={() => openDocument(doc)}>{doc.title}</li>
                                ))}
                            </ul>
                            <button onClick={() => openCategoryDetails(category)} className="faq-category-more">
                                더 많은 관련 질문 보기
                            </button>
                        </div>
                    ))
                ) : (
                    <p> No FAQ categories available</p>
                )}
            </div>

            {selectedDocument && (
                <div className="faq-popup-overlay">
                    <div className="faq-popup">
                        <button className="faq-popup-close" onClick={closeDocument}>
                            <X size={20}/>
                        </button>
                        <h2>{selectedDocument.title}</h2>
                        <p>{selectedDocument.content}</p>
                    </div>
                </div>
            )}

            {activePopup === 'category' && searchTerm && (
                <div className="faq-popup-overlay">
                    <div className="faq-popup">
                        <button className="faq-popup-close" onClick={closeDocument}>
                            <X size={20}/>
                        </button>
                        <h2>{selectedCategory.title}</h2>
                        <ul>
                            {selectedCategory.documents.map(doc => (
                                <li key={doc.id} onClick={() => openDocument(doc)}>{doc.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {activePopup === 'document' && selectedDocument && (
                <div className="faq-popup-overlay">
                    <div className="faq-popup">
                        <button className="faq-popup-close" onClick={closeDocument}>
                            <X size={20}/>
                        </button>
                        <h2>{selectedDocument.title}</h2>
                        <p>{selectedDocument.content}</p>
                    </div>
                </div>
            )}

            {selectedCategory && (
                <div className="faq-popup-overlay">
                    <div className="faq-popup">
                        <button className="faq-popup-close" onClick={() => setSelectedCategory(null)}>
                            <X size={20}/>
                        </button>
                        <h2>{selectedCategory.title}</h2>
                        <ul>
                            {selectedCategory.documents.map(doc => (
                                <li key={doc.id} onClick={() => openDocument(doc)}>
                                    {doc.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
}

export default FaqMain;