import { createRoot } from "react-dom/client";
import App from "pages/App";

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("BASE_ENV", process.env.BASE_ENV);

const MOUNT_NODE = document.getElementById("root");

const root = createRoot(MOUNT_NODE as HTMLElement);
root.render(<App />);
