import AppRoutes from "./routes/AppRoutes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={2500}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
