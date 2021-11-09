import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bodyOutline, createOutline, homeOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Utilisateurs from "./pages/Utilisateurs";
import Editeur from "./pages/Editeur";
import { useEffect, useState } from "react";
import { SendRequest } from "./utilities";
import User from "./models/User";
import Home from "./pages/Home";

const App: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const getUsers = async () => {
    const [data, error] = await SendRequest("api/user", "GET");

    if (!error) {
      setUsers(data);
    }
  };

  const createUser = async (user: User) => {
    const [data, error] = await SendRequest("api/user/", "POST", user);

    if (!error) {
      setUsers([...users, user]);
    }
  };

  const deleteUser = async (userId: number) => {
    const [data, error] = await SendRequest("api/user/" + userId, "DELETE");

    if (!error) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const updateUser = async (updatedUser: User) => {
    const [data, error] = await SendRequest("api/user/", "PUT", updatedUser);

    if (!error) {
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    }
    setSelectedUser(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/' component={Home} />

            <Route exact path='/users'>
              <Utilisateurs
                users={users}
                deleteUser={deleteUser}
                setSelectedUser={setSelectedUser}
              />
            </Route>
            <Route exact path='/edit'>
              <Editeur
                selectedUser={selectedUser}
                updateUser={updateUser}
                createUser={createUser}
              />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot='bottom'>
            <IonTabButton tab='home' href='/'>
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab='users' href='/users'>
              <IonIcon icon={bodyOutline} />
              <IonLabel>Utilisateurs</IonLabel>
            </IonTabButton>
            <IonTabButton tab='editor' href='/edit'>
              <IonIcon icon={createOutline} />
              <IonLabel>Editeur</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
