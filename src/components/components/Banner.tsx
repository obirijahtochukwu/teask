import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cloud from "../../assets/img/cloud.png";
import heroLImg from "../../assets/img/heroLImg.png";
import quarCode from "../../assets/img/quarCode.png";
import heroRImg from "../../assets/img/heroRImg.png";
import copyIcon from "../../assets/img/copyIcon.svg";
import checked from "../../assets/img/checked.svg";
import sol from "../../assets/img/sol.png";
import Image from "next/image";
import BuyNow from "../buy-now";

export default function Banner() {
  const endDate = "2024-06-18";

  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const token = "2NGeE2Ad6GXJm7gJ2Gv7BGHoSQKzcayhoKhLrHwwg1dt";

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setMessage("Wallet Copied To Clipboard.");
      setTimeout(() => {
        setMessage("");
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage("Copy not supported or blocked. Press Ctrl+C to copy.");
      setTimeout(() => setMessage(""), 3000);
    }
    document.body.removeChild(textarea);
  };

  return (
    <section className="banner-area w-screen overflow-hidden" id="home">
      <figure className="cloud">
        <Image src={cloud} alt="cloud" />
      </figure>
      <Container>
        <Row>
          <Col xl={12} lg={12}>
            <div className="banner-content text-center">
              <figure className="heroLImg">
                <Image src={heroLImg} alt="hero left" />
              </figure>
              <h1
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-offset="0"
              >
                $punchi on sol
              </h1>
              <div className="presale-box">
                <h4>Presale Starts In</h4>
                <div id="countdown">
                  {Object.entries(timeLeft).map(([unit, value]: any, index) => (
                    <div className="single-item" key={index}>
                      <span>{value}</span>
                      <h5>{unit}</h5>
                    </div>
                  ))}
                </div>
                <BuyNow />
                <h5 className="send_sol">Can't Connect, send SOL to</h5>
                <div className="copytoclipboard">
                  <input type="text" id="copyTarget" value={token} readOnly />
                  <span id="msg">{message}</span>
                  <button onClick={() => copyToClipboard(token)}>
                    <span>
                      <Image className="copy0" src={copyIcon} alt="copy" />
                    </span>
                  </button>
                  {copied && (
                    <Image className="checked" src={checked} alt="checked" />
                  )}
                </div>
                <div className="scan_wallet d-none">
                  <Image src={quarCode} alt="QR code" />
                  <button>Scan Wallet</button>
                </div>
                <br />
                <div className="note">
                  <p>Token will be airdropped to sending wallet</p>
                  <p>Note: Only send SOL from a DEX wallet</p>
                </div>
              </div>
              <figure className="heroRImg">
                <Image src={heroRImg} alt="hero right" />
              </figure>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
