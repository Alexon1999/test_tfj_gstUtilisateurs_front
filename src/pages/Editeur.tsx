import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import User from "../models/User";

interface EditeurI {
  selectedUser: User | null;
  createUser: Function;
  updateUser: Function;
}

const Editeur: React.FC<EditeurI> = ({
  selectedUser = null,
  createUser,
  updateUser,
}) => {
  const [user, setUser] = useState<User>(() => {
    if (selectedUser) return selectedUser;

    const newUser: User = { nom: "", prenom: "", email: "", mdp: "", age: 0 };
    return newUser;
  });

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editeur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (selectedUser) {
              updateUser(user);
            } else {
              createUser(user);
            }
            history.push("/users");
          }}>
          <IonList>
            <IonItem>
              <IonLabel position='floating'>Nom</IonLabel>
              <IonInput
                value={user.nom}
                placeholder='votre nom'
                required
                name='nom'
                onIonChange={(e) =>
                  setUser({ ...user, nom: e.detail.value || "" })
                }
                clearInput></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position='floating'>Prenom</IonLabel>
              <IonInput
                value={user.prenom}
                placeholder='votre prenom'
                required
                name='prenom'
                onIonChange={(e) =>
                  setUser({ ...user, prenom: e.detail.value || "" })
                }
                clearInput></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position='floating'>Age</IonLabel>
              <IonInput
                value={user.age}
                placeholder='votre age'
                required
                name='age'
                type='number'
                onIonChange={(e) =>
                  setUser({ ...user, age: Number(e.detail.value) || 0 })
                }
                clearInput></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput
                value={user.email}
                placeholder='test@gmail.com'
                required
                name='email'
                onIonChange={(e) =>
                  setUser({ ...user, email: e.detail.value || "" })
                }
                clearInput></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position='floating'>Mot de passe</IonLabel>
              <IonInput
                value={user.mdp}
                placeholder='*'
                type='password'
                required
                onIonChange={(e) =>
                  setUser({ ...user, mdp: e.detail.value || "" })
                }
                clearInput></IonInput>
            </IonItem>
            <IonButton type='submit' expand='block' className='login__btn'>
              {selectedUser ? "Modifier" : "Créer"}
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Editeur;
