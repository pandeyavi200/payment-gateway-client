import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';

//Custom style for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 60px'
  },
};


function PaymentNew(props) {
  let subtitle;
  // eslint-disable-next-line
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const startPayment = (invoice) => {
    let data = {
      'purpose': invoice.name,
      'amount': invoice.amount,
      'buyer_name': process.env.REACT_APP_USER_NAME,
      'email': process.env.REACT_APP_USER_EMAIL,
      'phone': process.env.REACT_APP_USER_CONTACT,
      'redirect_url': `${process.env.REACT_APP_IP}/mark-done?id=${invoice._id}`,
      'webhook': process.env.REACT_APP_WEBHOOK_URL,
      'allow_repeated_payments': 'False'
    }

    //Hit pay api which wraps Instamojo api
    axios.post(`${process.env.REACT_APP_IP}/pay`, data)
      .then((res) => {
        let longurl = JSON.parse(res.data).longurl
        window.location.href = longurl
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Modal
        isOpen={props.onClose}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ color: "#007bff" }}> Invoice Details</h2>
        <div style={{ textAlign: "center" }}>
          <p>Name : {props.props.name}</p>
          <p>Amount : {props.props.amount}</p>
          <p>Status : {props.props.status}</p>
          <button onClick={() => startPayment(props.props)} disabled={props.props.status === 'Paid'}> Click to Pay </button>
          <button onClick={props.onClose} style={{ marginLeft: "20px" }}>Close</button>
        </div>

      </Modal>
    </div>
  );
}

export default PaymentNew 