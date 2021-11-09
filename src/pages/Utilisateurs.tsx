import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import User from "../models/User";

import "./Utilisateurs.css";

interface UserI {
  users: Array<User>;
  deleteUser: Function;
  setSelectedUser: Function;
}

const Utilisateurs: React.FC<UserI> = ({
  users,
  deleteUser,
  setSelectedUser,
}) => {
  const history = useHistory();

  const GoToEditor = (user: User) => {
    setSelectedUser(user);
    history.push("/edit");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Utilisateurs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {users.map((user) => (
          <IonCard key={user.id}>
            <IonCardHeader>
              <IonCardTitle>{user.nom + " " + user.prenom}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>Email : {user.email}</p>
              <p>age : {user.age}</p>

              <div className='Utilisateurs__btns_container'>
                <IonButton color='warning' onClick={() => GoToEditor(user)}>
                  Modifier
                </IonButton>
                <IonButton color='danger' onClick={() => deleteUser(user.id)}>
                  Supprimer
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Utilisateurs;
