import './App.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import uuid from 'react-uuid';

function App() {
  const handlePayment = () => {
    loadTossPayments(`${process.env.REACT_APP_TOSS_TEST_CLIENT_KEY}`)
      .then((tossPayments) => {
        tossPayments.requestPayment('카드', {
          amount: 15000,
          orderId: `${uuid()}`,
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: 'http://localhost:8080/success',
          failUrl: 'http://localhost:8080/fail',
        });
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === 'INVALID_CARD_COMPANY') {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
  };

  return (
    <div className="App">
      <h1>Toss Payments Test</h1>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
}

export default App;
