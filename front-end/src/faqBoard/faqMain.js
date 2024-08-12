import React from 'react';
import { Link } from 'react-router-dom';

function FaqMain() {
    return (
        <div>
            <h1>FAQ Main Page</h1>
            <nav>
                <ul>
                    <li><Link to="/faqBoard/faqDetails/Write">Write New FAQ</Link></li>
                    <li><Link to="/faqBoard/faqDetails/ShowList">Show All FAQs</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default FaqMain;