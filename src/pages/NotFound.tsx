
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center max-w-md animate-slide-up">
        <div className="mx-auto mb-6 bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-amber-600 dark:text-amber-500" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2 tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! We couldn't find that page
        </p>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button onClick={() => navigate("/")} className="gap-2">
          <Home className="h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
