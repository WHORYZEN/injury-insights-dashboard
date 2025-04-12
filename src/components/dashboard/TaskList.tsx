
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/data/tasks";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-3 rounded-lg border ${task.completed ? 'bg-secondary/50' : ''}`}
            >
              <div className="flex items-start gap-2">
                <Checkbox checked={task.completed} className="mt-1" />
                <div className="flex-1">
                  <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </div>
                  
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                    
                    {task.caseName && (
                      <Badge variant="outline" className="text-xs font-normal">
                        {task.caseName}
                      </Badge>
                    )}
                    
                    {task.estimatedTime && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{task.estimatedTime} mins</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {task.assignee && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback className="text-xs">
                      {task.assignee.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
