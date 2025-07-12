import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { WalletContextProvider } from "@/contexts/WalletContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <WalletContextProvider>
      <AuthProvider>
        <AuthGuard>
          <RouterProvider router={router} />
          <Toaster />
        </AuthGuard>
      </AuthProvider>
    </WalletContextProvider>
  );
}

export default App;