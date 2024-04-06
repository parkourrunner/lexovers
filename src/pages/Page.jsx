import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import data from "../data/dataMap-v2.js";
import speakerImg from "../img/speaker.png";
// import videoImg from "../img/video.png";
// import galleryImg from "../img/gallery.png";
// import Modal from "react-bootstrap/Modal";
// import { Carousel } from "react-bootstrap";
// import { useSpeechSynthesis } from "react-speech-kit";
import dataContext from "../context/data.context.js";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 48px 0;
`;

const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const EnDate = styled.div`
  font-family: IRANSansEn !important;
`;

const Speak = styled.div`
  margin-left: 8px;
  display: inline-block;
`;

const SpeakImg = styled.img`
  vertical-align: middle;
  cursor: pointer;
`;

const DescWrapper = styled.div`
  margin-top: 48px;
`;

// const GalleryIconsWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: end;
//   align-items: center;
// `;

// const VideoButton = styled.button`
//   padding: 6px 12px;
//   background: transparent;
//   border: none;
// `;

// const VideoImg = styled.img`
//   vertical-align: middle;
//   cursor: pointer;
// `;

// const GalleryButton = styled.button`
//   padding: 6px 12px;
//   background: transparent;
//   border: none;
// `;

// const GalleryImg = styled.img`
//   vertical-align: middle;
//   cursor: pointer;
// `;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

const Button = styled.button`
  background-color: #00818b;
  color: white;
  width: 25%;
  display: inline-block;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

const Page = () => {
  const [currentItem, setCurrentItem] = useState({});
  const { data, updateData } = useContext(dataContext);
  // const [showVideoModal, setShowVideoModal] = useState(false);
  // const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [voices, setVoices] = useState();
  const navigate = useNavigate();
  const path = useLocation();
  const id = Number(path.pathname.split("/")[2]);
  if (!id) {
    navigate("/");
  }

  useEffect(() => {
    const fetchWord = async () => {
      const response = await axios("http://185.237.15.89:5000/api/words/" + id);
      if (response?.data) {
        setCurrentItem(response?.data)
        updateData([...data, response.data])
      } else {
        navigate("/");
      }
    }
    if (data?.length > 0) {
      const foundWord = data.filter((item) => item.id === id)[0];
      if (foundWord) {
        setCurrentItem(foundWord);
      } else {
        fetchWord();
      }
    } else {
      fetchWord();
    }
  }, [data, id, navigate]);

  // const openGalleryModal = (e) => {
  //   e.preventDefault();
  //   setShowGalleryModal(true);
  // };

  // const openVideoModal = (e) => {
  //   e.preventDefault();
  //   setShowVideoModal(true);
  // };

  global.goToPage = (pageId) => {
    navigate(`/page/${pageId}`);
  };
  const handleClick = (event) => {
    const change = event.target.dataset.change;
    if (change === "0") {
      navigate("/");
    } else {
      navigate(`/page/${id + Number(change)}`);
    }
  };

  // const handleCloseVideoModal = () => setShowVideoModal(false);
  // const handleCloseGalleryModal = () => setShowGalleryModal(false);
  speechSynthesis.onvoiceschanged = () => {
    setVoices(speechSynthesis.getVoices());
  }
  const speechHandler = () => {
    const russians = voices.filter(v => v.lang === "ru-RU");
    if (russians.length === 0) {
      alert("مرورگر شما از هیچ کدام از گویندگان روس زبان پشتیبانی نمی کند.");
      return;
    }
    const voice = russians[Math.round(Math.random() * (russians.length - 1))];
    const U = new SpeechSynthesisUtterance()
    U.text = currentItem.ruName;
    U.voice = voice;
    U.lang = voice.lang;
    speechSynthesis.speak(U);
  };

  return (
    <Container>
      <HeaderLine>
        <div>
          <span>{currentItem.faName}</span>
        </div>
        <div>
          <Speak>
            <SpeakImg src={speakerImg} onClick={speechHandler} />
          </Speak>
          <span>{currentItem.ruName}</span>
        </div>
      </HeaderLine>
      <HeaderLine>
        <div>
          <span>{currentItem.faDate}</span>
        </div>
        <EnDate>
          <span>{currentItem.enDate}</span>
        </EnDate>
      </HeaderLine>
      <DescWrapper>
        <span
          dangerouslySetInnerHTML={{ __html: currentItem.description }}
        ></span>
      </DescWrapper>
      {/* <GalleryIconsWrapper>
        {currentItem.imgSrc && currentItem.imgSrc.length !== 0 && (
          <>
            <GalleryButton onClick={openGalleryModal}>
              <GalleryImg src={galleryImg}></GalleryImg>
            </GalleryButton>
            <Modal show={showGalleryModal} onHide={handleCloseGalleryModal}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Carousel>
                  {currentItem.imgSrc.map((img) => {
                    return (
                      <Carousel.Item interval={5000} key={img}>
                        <img
                          className="d-block w-100"
                          src={`../assets/data/${img}`}
                          alt={img}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Modal.Body>
            </Modal>
          </>
        )}
        {currentItem.videoSrc && (
          <>
            <VideoButton onClick={openVideoModal}>
              <VideoImg src={videoImg}></VideoImg>
            </VideoButton>
            <Modal show={showVideoModal} onHide={handleCloseVideoModal}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {currentItem.videoSrc && (
                  <video
                    controls
                    width="100%"
                    src={`../assets/data/${currentItem.videoSrc}`}
                  />
                )}
              </Modal.Body>
            </Modal>
          </>
        )}
      </GalleryIconsWrapper> */}
      <NavigationWrapper>
        <Button data-change="1" onClick={handleClick}>
          بعدی
        </Button>
        <Button data-change="0" onClick={handleClick}>
          خانه
        </Button>
        {id !== 1 && (
          <Button data-change="-1" onClick={handleClick}>
            قبلی
          </Button>
        )}
      </NavigationWrapper>
    </Container>
  );
};

export default Page;
