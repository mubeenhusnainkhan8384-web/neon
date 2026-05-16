'use client';

import { useState } from "react";
import { FolderOpen, Search, Calendar, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const mockProjects = [
  {
    id: 1,
    type: "product",
    title: "Silicone Baby Bibs",
    status: "Research",
    date: "2 days ago",
    score: 89,
    items: 12
  },
  {
    id: 2,
    type: "keyword",
    title: "Insulated Tumbler Keywords",
    status: "Ready",
    date: "5 days ago",
    score: 94,
    items: 28
  },
  {
    id: 3,
    type: "listing",
    title: "Wireless Earbuds Listing",
    status: "Draft",
    date: "1 week ago",
    score: 76,
    items: 1
  },
  {
    id: 4,
    type: "product",
    title: "Stainless Steel Water Bottle",
    status: "Research",
    date: "2 weeks ago",
    score: 82,
    items: 8
  },
];

export default function MyProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast.success("Project deleted");
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold">My Projects</h1>
          <p className="text-muted-foreground">All your saved research, keywords & listings</p>
        </div>
        <Button size="lg">
          <FolderOpen className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-all group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant={project.type === "product" ? "default" : project.type === "keyword" ? "secondary" : "outline"}>
                      {project.type.toUpperCase()}
                    </Badge>
                    <CardTitle className="mt-3 line-clamp-2">{project.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteProject(project.id)}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Opportunity Score</span>
                  <span className="font-semibold">{project.score}/100</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items Saved</span>
                  <span className="font-medium">{project.items}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-muted-foreground">{project.date}</span>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                  <Button className="flex-1" size="sm">
                    Continue Working
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <FolderOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium">No projects found</h3>
            <p className="text-muted-foreground mt-2">Start researching and save your work</p>
          </div>
        )}
      </div>
    </div>
  );
}