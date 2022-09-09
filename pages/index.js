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
  height: 400px;
  width: 600px;
  margin: 0 auto;
  position: relative;
`;

const NumberWrapper = styled.div`
  font-size: 24px;
  color: var(--primary-neon-green);
  letter-spacing: 5px;
  margin-top: 56px;
  margin-bottom: 40px;
  text-align: center;
`;

const QuoteWrapper = styled.div`
  color: var(--primary-light-cyan);
  margin: 0 auto;
  text-align: center;
`;

const DiceWrapper = styled.div`
  background-color: var(--primary-neon-green);
  height: 150px;
  width: 150px;
  border-radius: 100%;
  position: absolute;
  bottom: -75px;
  display: grid;
  place-content: center;
  left: calc(50% - 75px);

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
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

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No advice left to give...</p>;

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
        <NumberWrapper>ADVICE {data.slip.id}</NumberWrapper>
        <QuoteWrapper>"{data.slip.advice}"</QuoteWrapper>
        <DiceWrapper>
          <button onClick={handleButtonClick}>
            <Image src={Dice} height={50} width={50} />
          </button>
        </DiceWrapper>
      </ContentWrapper>
    </AppWrapper>
  );
}
