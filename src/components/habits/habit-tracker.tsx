'use client';

import type { Habit } from '@/lib/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Plus, Check, Zap, Coffee, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { HabitSkeleton } from './habit-skeleton';

const initialHabits: Habit[] = [
  { id: '1', name: 'Meditate 5 mins', icon: Zap, frequency: 'daily', streak: 5, lastCompleted: '2024-05-20T10:00:00.000Z' },
  { id: '2', name: 'Read 10 pages', icon: BookOpen, frequency: 'daily', streak: 12, lastCompleted: '2024-05-20T10:00:00.000Z' },
  { id: '3', name: 'Morning Coffee', icon: Coffee, frequency: 'daily', streak: 2, lastCompleted: null },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabitName, setNewHabitName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    setLoading(true);
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      icon: Zap, // Default icon
      frequency: 'daily',
      streak: 0,
      lastCompleted: null,
    };
    setTimeout(() => {
        setHabits([...habits, newHabit]);
        setNewHabitName('');
        setIsDialogOpen(false);
        setLoading(false);
    }, 1000);
  };

  const handleCompleteHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id && (habit.lastCompleted ? !isToday(new Date(habit.lastCompleted)) : true)) {
          return {
            ...habit,
            streak: habit.streak + 1,
            lastCompleted: new Date().toISOString(),
          };
        }
        return habit;
      })
    );
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Habit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-headline">Create a new habit</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddHabit} className="grid gap-4 py-4">
            <Input
              id="habit-name"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="e.g., Drink water"
              className="bg-background/80"
            />
            <Button type="submit">Add Habit</Button>
          </form>
        </DialogContent>
      </Dialog>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
            <HabitSkeleton count={habits.length + 1}/>
        ) : (
            habits.map((habit) => {
            const isCompletedToday = habit.lastCompleted ? isToday(new Date(habit.lastCompleted)) : false;
            const Icon = habit.icon;
            return (
                <Card key={habit.id} className={cn("bg-background/50 transition-all with-left-shadow", isCompletedToday && "bg-primary/20 border-primary/50")}>
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Icon className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-semibold">{habit.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Flame className="w-4 h-4 text-orange-400" />
                                <span>{habit.streak} day streak</span>
                            </div>
                        </div>
                    </div>
                    <Button
                    size="icon"
                    variant={isCompletedToday ? "secondary" : "outline"}
                    onClick={() => handleCompleteHabit(habit.id)}
                    disabled={isCompletedToday}
                    className={cn("rounded-full w-12 h-12 shrink-0", isCompletedToday && "bg-primary/80 hover:bg-primary")}
                    aria-label={`Complete habit: ${habit.name}`}
                    >
                    <Check className="w-6 h-6" />
                    </Button>
                </CardContent>
                </Card>
            );
            })
        )}
      </div>
    </div>
  );
}
