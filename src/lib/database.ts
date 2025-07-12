import { supabase } from './supabase';

export interface Project {
  id: string;
  name: string;
  address: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const projectsService = {
  // Create a new project
  async createProject(name: string, address: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          address,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }

    return data;
  },

  // Get all projects for the current user
  async getUserProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data || [];
  },

  // Get a specific project by ID
  async getProject(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      throw error;
    }

    return data;
  },

  // Update a project
  async updateProject(id: string, updates: Partial<Pick<Project, 'name'>>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }

    return data;
  },

  // Delete a project
  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
};