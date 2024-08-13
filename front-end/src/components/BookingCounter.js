import '../styles/common.css'

const BookingCounter = () => {
    return (
        <div className={'peopleCounter'}>
            <button>
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12a1 1 0 0 0 1 1h10a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1Z"></path>
                </svg>
            </button>
            <input type='number' min='1' max='20' value='1' readOnly onChange={onChange}/>
            <button>
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 7a1 1 0 0 0-1 1v3H8a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3V8a1 1 0 0 0-1-1z"></path>
                </svg>
            </button>
        </div>
    )
}

export default BookingCounter