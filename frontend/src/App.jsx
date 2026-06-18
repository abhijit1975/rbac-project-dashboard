import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px", color: "white", background: "#0b0f19", height: "100vh" }}>
      <h1>RBAC Dashboard Frontend Running 🚀</h1>
      <p>Check console for backend response</p>
    </div>
  );
}

export default App;