import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./_Gallery.scss";
import Carousel from './Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import galleryImage from "../img/gallery.png";


function Gallery({ item }) {
  const [show, setShow] = useState(false);
  if (!item || (!item.imgSrc && !item.videoSrc)) return null;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <img src={galleryImage} alt="gallery-toggle" className="gallery-toggle" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Carousel item={item} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Gallery