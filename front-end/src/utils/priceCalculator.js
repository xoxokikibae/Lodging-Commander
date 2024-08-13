const calculatePrice = (checkInDate, checkOutDate, price) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut - checkIn;
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    const nights = Math.ceil(timeDifference / oneDayInMillis);
    return nights * price;
};

const calculateDiscountedPrice = (price, userGrade) => {
    const discountRates = { VIP: 0.10, Gold: 0.07, Silver: 0.05 };
    const discountRate = discountRates[userGrade] || 0;
    return price * (1 - discountRate);
};

export const priceCalculator = {
    calculatePrice,
    calculateDiscountedPrice
}