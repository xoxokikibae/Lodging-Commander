import React, {useState} from "react";
import {Link} from 'react-router-dom';
import './faqAdmin.css';

function FaqAdmin() {
    return (
        <div className="faq-admin-container">
            <h2 className="faq-admin-heading"> 자주 묻는 질문(FAQ) 관리자 페이지 </h2>

            <div>
                <nav className="faq-nav">
                    <Link to="/faqBoard/faqDetails/ShowList" className="faq-nav-link">등록된 모든 FAQs 보기</Link>
                    <Link to="/faqBoard/faqDetails/Write" className="faq-nav-link">새로운 FAQ 작성하기</Link>
                </nav>
            </div>
        </div>
    )
}

export default FaqAdmin;