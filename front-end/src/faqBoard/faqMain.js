import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './faqMain.css';
import {Search} from 'lucide-react';

const faqCategories = [
    {id: 1, title: "예약", icon: "🏨"},
    {id: 2, title: "결제", icon: "💳"},
    {id: 3, title: "취소 및 환불", icon: "🔙"},
    {id: 4, title: "회원 정보", icon: "👤"},
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

    const handleSearch = (e) => {
        e.preventDefault();
        // *** I need to add implement search functionality here
        console.log("Searching for:", searchTerm);
    };

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

            <div className="faq-categories">
                {faqCategories.map(category => (
                    <div key={category.id} className="faq-category-item">
                        <span className="faq-category-icon">{category.icon}</span>
                        <span className="faq-category-title">{category.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FaqMain;