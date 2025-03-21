import React from "react";

type Props = {};

export default function WeekModal({}: Props) {
  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const daysInThisWeek: number[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    daysInThisWeek.push(date.getDate());
  }

  const weekMap = new Map<string, number>();
  for (let i = 0; i < WEEKDAYS.length; i++) {
    weekMap.set(WEEKDAYS[i], daysInThisWeek[i]);
  }

  return (
    <div className="mt-4">
      WeekModal
      <p> today date {weekMap}</p>
      <p> today date {weekMap.get(WEEKDAYS[new Date().getDay()])}</p>
    </div>
  );
}
