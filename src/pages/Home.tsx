import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
} from "@ionic/react";
import React from "react";

import control_panel from "../images/control_panel.svg";

import "./Home.css";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='home__container'>
          <h1>Gestion d'Utilisateurs</h1>
          <img src={control_panel} alt='control_panel' />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
