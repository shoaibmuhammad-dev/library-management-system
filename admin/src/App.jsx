import AppRoutes from "./routes/AppRoutes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        maxSnack={2}
        autoHideDuration={2500}
      />
      <AppRoutes />
    </>
  );
}

export default App;
