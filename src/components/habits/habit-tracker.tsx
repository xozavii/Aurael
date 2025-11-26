'use client';

import type { Habit } from '@/lib/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Plus, Check, Zap, Coffee, BookOpen, Trash2, Heart, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { isToday, isSameDay, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { HabitSkeleton } from './habit-skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Calendar } from '../ui/calendar';
import { DayPicker, DayContent, DayContentProps } from 'react-day-picker';
import { Confetti } from './confetti';

const initialHabits: Habit[] = [
  { id: '1', name: 'Meditate 5 mins', icon: Zap, frequency: 'daily', streak: 5, lastCompleted: '2024-05-20T10:00:00.000Z', history: ['2024-05-20T10:00:00.000Z', '2024-05-19T10:00:00.000Z', '2024-05-18T10:00:00.000Z', '2024-05-17T10:00:00.000Z', '2024-05-16T10:00:00.000Z'] },
  { id: '2', name: 'Read 10 pages', icon: BookOpen, frequency: 'daily', streak: 12, lastCompleted: '2024-05-20T10:00:00.000Z', history: [] },
  { id: '3', name: 'Morning Coffee', icon: Coffee, frequency: 'daily', streak: 2, lastCompleted: null, history: [] },
];

const FloatingHearts = () => {
    const hearts = Array.from({ length: 3 });
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {hearts.map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 25}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 1 + 0.5}rem`,
            }}
          >
            &#x2764;
          </div>
        ))}
      </div>
    );
  };

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabitName, setNewHabitName] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
      history: [],
    };
    setTimeout(() => {
        setHabits([...habits, newHabit]);
        setNewHabitName('');
        setIsAddDialogOpen(false);
        setLoading(false);
    }, 1000);
  };

  const handleToggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isCompletedToday = habit.lastCompleted ? isToday(new Date(habit.lastCompleted)) : false;
          
          if (isCompletedToday) {
            // Undo completion
            const newHistory = habit.history.slice(0, -1);
            const lastCompleted = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null;
            return {
              ...habit,
              streak: habit.streak > 0 ? habit.streak - 1 : 0,
              lastCompleted: lastCompleted,
              history: newHistory,
            };
          } else {
            // Complete habit
            const newCompletionDate = new Date().toISOString();
            return {
              ...habit,
              streak: habit.streak + 1,
              lastCompleted: newCompletionDate,
              history: [...habit.history, newCompletionDate],
            };
          }
        }
        return habit;
      })
    );
  };
  
  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };
  
  return (
    <div className="space-y-4">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            const completedDates = habit.history.map(date => parseISO(date));

            return (
                <Card key={habit.id} className={cn("bg-background/50 transition-all with-left-shadow group relative overflow-hidden", isCompletedToday && "shadow-2xl shadow-primary/30")}>
                  {isCompletedToday && <FloatingHearts />}
                  <CardContent className="p-4 flex items-center justify-between relative z-10">
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
                      <div className="relative flex items-center gap-1">
                          <div className="relative">
                            {isCompletedToday && <Confetti />}
                            <Button
                                size="icon"
                                variant={isCompletedToday ? "secondary" : "outline"}
                                onClick={() => handleToggleHabit(habit.id)}
                                className={cn("rounded-full w-12 h-12 shrink-0 z-10", isCompletedToday && "bg-primary/80 hover:bg-primary")}
                                aria-label={`Complete habit: ${habit.name}`}
                            >
                                <Check className="w-6 h-6" />
                            </Button>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Dialog>
                                <DialogTrigger asChild>
                                     <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CalendarIcon className="w-4 h-4 text-muted-foreground"/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-min bg-card shadow-2xl shadow-primary/20 border-primary/20">
                                    <DialogHeader>
                                        <DialogTitle className="font-headline flex items-center gap-2">
                                            {habit.name} Streak
                                        </DialogTitle>
                                    </DialogHeader>
                                    <Calendar
                                        mode="multiple"
                                        selected={completedDates}
                                        modifiers={{
                                            completed: completedDates,
                                        }}
                                        modifiersClassNames={{
                                            completed: 'day-completed',
                                        }}
                                        components={{
                                            Day: (props: DayContentProps) => {
                                                const isCompleted = completedDates.some(d => isSameDay(d, props.date));
                                                if (isCompleted) {
                                                    return (
                                                      <div className="relative flex h-full w-full items-center justify-center">
                                                        <Heart className="absolute h-8 w-8 text-primary/80 fill-primary/20" style={{ filter: 'drop-shadow(0 0 3px hsl(var(--primary)))' }} />
                                                        <span className="relative z-10 font-bold text-primary-foreground">
                                                          {props.date.getDate()}
                                                        </span>
                                                      </div>
                                                    );
                                                }
                                                return <DayContent {...props} />;
                                            },
                                        }}
                                        className="p-4"
                                    />
                                </DialogContent>
                            </Dialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-4 h-4 text-destructive"/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your habit.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteHabit(habit.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </div>
                      </div>
                  </CardContent>
                </Card>
            );
            })
        )}
      </div>
    </div>
  );
}
