import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { UserMenu } from "@/components/auth/UserMenu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useHoneycomb } from "@/hooks/useHoneycomb";
import { projectsService } from "@/lib/database";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Layout() {
  const location = useLocation();
  const { createProject } = useHoneycomb();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create a project");
      return;
    }

    setIsCreating(true);

    try {
      // Handle save logic here
      console.log("Project name:", projectName);
      
      // Create project on blockchain
      const projectAddress = await createProject(projectName.trim());
      
      if (!projectAddress) {
        throw new Error("Failed to create project on blockchain");
      }
      
      console.log("Project created at address:", projectAddress);
      
      // Save project to Supabase
      const savedProject = await projectsService.createProject(
        projectName.trim(),
        projectAddress
      );
      
      if (savedProject) {
        toast.success(`Project "${projectName}" created successfully!`);
        console.log("Project saved to database:", savedProject);
      } else {
        throw new Error("Failed to save project to database");
      }
      
      setProjectName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to create project. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setProjectName("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Breadcrumb />
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto pb-20">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isCreating || !projectName.trim()}>
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}