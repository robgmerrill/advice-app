import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MobileDivider from "../public/images/pattern-divider-mobile.svg";
import Dice from "../public/images/icon-dice.svg";

const AppWrapper = styled.div`
  background-color: var(--neutral-dark-blue);
  height: 100vh;
  padding-inline: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  background-color: var(--neutral-grayish-blue);
  border-radius: 16px;
  height: 350px;
  width: 600px;
  margin: 0 auto;
  position: relative;
  padding-inline: 16px;
`;

const NumberWrapper = styled.div`
  font-size: 24px;
  color: var(--primary-neon-green);
  letter-spacing: 5px;
  margin-top: 56px;
  margin-bottom: 25px;
  text-align: center;
`;

const QuoteWrapper = styled.div`
  color: var(--primary-light-cyan);
  margin: 0 auto;
  text-align: center;
  width: 100%;
`;

const DiceWrapper = styled.div`
  background-color: var(--primary-neon-green);
  height: 80px;
  width: 80px;
  border-radius: 100%;
  position: absolute;
  bottom: -40px;
  display: grid;
  place-content: center;
  left: calc(50% - 40px);
  transition: all 02 ease-in-out;

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  :hover {
    transform: scale(1.1);
  }
`;

const DividerWrapper = styled.div`
  margin-top: 38px;
  margin-bottom: 48px;
  width: 90%;
  position: absolute;
  height: 30px;
  display: grid;
  place-content: center;
  bottom: 25px;
  left: 28px;
`;

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  console.log(isLoading);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Gathering advice...</p>;

  const handleButtonClick = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  return (
    <AppWrapper>
      <ContentWrapper>
        {!isLoading && (
          <>
            <NumberWrapper>ADVICE #{data.slip.id}</NumberWrapper>
            <QuoteWrapper>&quot;{data.slip.advice}&quot;</QuoteWrapper>
            <DividerWrapper>
              <Image
                src={MobileDivider}
                alt=""
                className="image"
                layout="fill"
                width={144}
                height={16}
              />
            </DividerWrapper>
          </>
        )}
        {isLoading && (
          <p style={{ color: "var(--primary-light-cyan" }}>Loaing...</p>
        )}
        {!data && (
          <p style={{ color: "var(--primary-light-cyan" }}>Loaing...</p>
        )}
        <DiceWrapper>
          <button onClick={handleButtonClick}>
            <Image src={Dice} height={30} width={30} />
          </button>
        </DiceWrapper>
      </ContentWrapper>
    </AppWrapper>
  );
}
