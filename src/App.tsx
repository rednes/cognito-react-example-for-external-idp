import { useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import {
  signInWithRedirect,
  getCurrentUser,
  fetchAuthSession,
  signOut,
} from "aws-amplify/auth";
import { config } from "./amplifyConfigure.ts";

Amplify.configure(config);

function App() {
  const [user, setUser] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getCurrentUser();
        const session = await fetchAuthSession();
        setUser(JSON.stringify(user, null, 2));
        setSession(JSON.stringify(session, null, 2));
        setIsSignedIn(true);
      } catch {
        setIsSignedIn(false);
      }
    };
    init();
  }, [setUser, setSession, setIsSignedIn]);

  return (
    <div>
      <div>
        <h1>Cognito User Pools sample with external IdP</h1>
      </div>
      <div>
        <button onClick={() => signInWithRedirect()} disabled={isSignedIn}>
          Open Managed Login
        </button>
        <button onClick={() => signOut()} disabled={!isSignedIn}>
          Sign Out
        </button>
      </div>
      <div>
        <label>Signed In?：</label>
        <span>{isSignedIn ? "TRUE" : "FALSE"}</span>
      </div>
      <div>
        <pre>{user}</pre>
        <pre>{session}</pre>
      </div>
    </div>
  );
}

export default App;
