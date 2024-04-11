import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../../utils/data/data.json";
import Carrousel from "../../components/Carroussel/index";
import styled from "styled-components";
import Collapse from "../../components/Collapse";
import Stars from "../../components/stars/index";
import Host from "../../components/Host";

const PageLogement = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;

  @media (max-width: 1200px) {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const TitreLogement = styled.h1`
  margin-left: auto;
  margin-right: auto;
  color: #ff6060;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

const CollapseDiv = styled.div`
  display: flex;
  gap: 76px;
  color: black;
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
    margin-bottom: 15px;
  }
`;

const LocationLogement = styled.p`
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const TitleLocation = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const HostStars = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
    justify-content: space-between;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
`;

function Logement() {
  const { idLogement } = useParams();
  const [logement, setLogement] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const foundLogement = data.find((logement) => logement.id === idLogement);
    if (!foundLogement) {
      navigate("/error");
    } else {
      setLogement(foundLogement);
    }
  }, [idLogement, navigate]);

  if (!logement) {
    return null;
  }

  return (
    <PageLogement>
      <Carrousel pictures={logement.pictures} />
      <TopContent>
        <TitleLocation>
          <TitreLogement>{logement.title}</TitreLogement>
          <LocationLogement>{logement.location}</LocationLogement>
        </TitleLocation>
        <HostStars>
          <Host src={logement.host.picture} nom={logement.host.name} />
          <Stars rating={logement.rating} />
        </HostStars>
      </TopContent>
      <CollapseDiv>
        <Collapse title="Description"> {logement.description}</Collapse>
        <Collapse title="Equipements"> {logement.equipments}</Collapse>
      </CollapseDiv>
    </PageLogement>
  );
}

export default Logement;
