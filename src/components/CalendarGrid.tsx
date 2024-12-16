import React, { useState, useEffect } from "react";
import EventModal from "./EventModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

interface Event {
  id: string;
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  category: string;
}

const CalendarGrid: React.FC = () => {
  const today = new Date();

  const formatFullDate = (year: number, month: number, day: number): string =>
    `${String(day).padStart(2, "0")}-${String(month + 1).padStart(
      2,
      "0"
    )}-${year}`;

  // State Management
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(
    formatFullDate(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [filterKeyword, setFilterKeyword] = useState<string>("");
  const [jumpToDate, setJumpToDate] = useState<string>("");
  const [draggedEventId, setDraggedEventId] = useState<string | null>(null);

  const [categories, setCategories] = useState<{ [key: string]: string }>({
    Work: "bg-blue-200",
    Personal: "bg-green-200",
    Health: "bg-red-200",
    Education: "bg-yellow-200",
    Finance: "bg-purple-200",
    Recreation: "bg-pink-200",
    Other: "bg-gray-200",
  });

  // Load events from localStorage
  useEffect(() => {
    console.log(setCategories);
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) setEvents(JSON.parse(storedEvents));
  }, []);

  const saveEventsToStorage = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // Utility Functions for Export
  const exportEventsAsJSON = (events: Event[]) => {
    const jsonBlob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `events-${currentYear}-${currentMonth + 1}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportEventsAsCSV = (events: Event[]) => {
    const csvHeader = "ID,Date,Name,Start Time,End Time,Description,Category\n";
    const csvRows = events
      .map(
        (event) =>
          `${event.id},${event.date},${event.name},${event.startTime},${event.endTime},"${event.description || ""}",${event.category}`
      )
      .join("\n");

    const csvBlob = new Blob([csvHeader + csvRows], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `events-${currentYear}-${currentMonth + 1}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Utility function to filter events for the current month
  const getEventsForCurrentMonth = () => {
    return events.filter((event) => {
      const  [month, year] = event.date.split("-").slice(1,3).map(Number);
      return month - 1 === currentMonth && year === currentYear;
    });
  };

  // Event Handlers
  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEventsToStorage(updatedEvents);
  };

  const handleEditEvent = (event: Event) => {
    setEditEvent(event);
    setIsModalOpen(true);
  };

  const handleAddOrUpdateEvent = (newEvent: Event) => {
  // Validate start and end time
  if (newEvent.startTime >= newEvent.endTime) {
    alert("Start time must be earlier than end time.");
    return;
  }

  const updatedEvents = editEvent
    ? events.map((event) => (event.id === newEvent.id ? newEvent : event))
    : [...events, newEvent];

  saveEventsToStorage(updatedEvents);
  setEditEvent(null);
};


  const openModalForNewEvent = () => {
    setEditEvent(null);
    setIsModalOpen(true);
  };

  const handleJumpToDate = () => {
    if (jumpToDate) {
      const [year, month, day] = jumpToDate.split("-").map(Number);
      setCurrentYear(year);
      setCurrentMonth(month - 1);
      setSelectedDate(formatFullDate(year, month - 1, day));
    }
  };

  const handleDragStart = (eventId: string) => {
    setDraggedEventId(eventId);
  };

  const handleDrop = (targetDate: string) => {
    if (draggedEventId) {
      const updatedEvents = events.map((event) =>
        event.id === draggedEventId ? { ...event, date: targetDate } : event
      );
      saveEventsToStorage(updatedEvents);
      setDraggedEventId(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  // Generate calendar days
  const generateCalendarDays = (
    year: number,
    month: number
  ): (number | null)[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday

    const days: (number | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) days.push(null); // Empty slots
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const globalFilteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  const selectedDateEvents = events.filter(
    (event) => event.date === selectedDate
  );

  const days = generateCalendarDays(currentYear, currentMonth);

  return (
    <div className="flex w-full h-screen justify-end items-center">
      {/* Calendar Section */}
      <div className="flex justify-center items-center mx-auto p-4 bg-white rounded-[6px] h-fit self-center shadow-md">
        <div>
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4 gap-4">
            <button
              className="btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              onClick={handlePrevMonth}
                      >
                          <FastRewindIcon />
                          {" "}
              Previous
            </button>
            <h2 className="text-xl font-bold">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button
              className="btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              onClick={handleNextMonth}
            >
                          Next{" "}
            <FastForwardIcon />        
            </button>
          </div>

          {/* Jump to Date */}
          <div className="mb-4">
            <label
              htmlFor="jumpToDate"
              className="block text-sm font-medium mb-2"
            >
              Jump to Date:
            </label>
            <input
              id="jumpToDate"
              type="date"
              value={jumpToDate}
              onChange={(e) => setJumpToDate(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleJumpToDate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const date = day
                ? formatFullDate(currentYear, currentMonth, day)
                : null;

              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              const isSelected =
                selectedDate ===
                (day ? formatFullDate(currentYear, currentMonth, day) : null);

              return (
                <div
                  key={index}
                  className={`p-2 text-center border rounded cursor-pointer ${
                    isToday ? "border-2 border-blue-500 text-black" : ""
                  } ${
                    isSelected ? "border-2 border-green-500 text-black" : ""
                  } hover:bg-gray-200`}
                  onClick={() => date && setSelectedDate(date)}
                  onDragOver={handleDragOver}
                  onDrop={() => date && handleDrop(date)}
                >
                  <div>{day || ""}</div>
                  <span className="flex flex-row align-bottom items-end flex-wrap gap-[2px]">
                    {events
                      .filter((event) => event.date === date)
                      .map((event, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 mt-1 rounded-full ${
                            categories[event.category] || "bg-gray-200"
                          }`}
                        />
                      ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="w-1/2 h-full bg-gray-100 p-4 border-l border-gray-300 rounded-[6px] shadow-md">
        {/* Search Filter */}
        <input
          type="text"
          placeholder="Search events globally"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {filterKeyword && (
          <div>
            <h4 className="font-semibold mb-2">Search Results:</h4>
            <ul>
              {globalFilteredEvents.length > 0 ? (
                globalFilteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className={`p-2 border rounded mb-2 ${
                      categories[event.category] || "bg-gray-200"
                    }`}
                  >
                    <h4 className="font-semibold">{event.name}</h4>
                    <p>Date: {event.date}</p>
                    <p>
                      Time: {event.startTime} - {event.endTime}
                    </p>
                    {event.description && <p>{event.description}</p>}
                  </li>
                ))
              ) : (
                <li>No matching events found.</li>
              )}
            </ul>
          </div>
        )}
        <h3 className="text-lg font-bold mb-4">Events on {selectedDate}</h3>
        <ul>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => (
              <li
                key={event.id}
                className={`relative p-2 border rounded mb-2 group hover:bg-gray-50 ${
                  categories[event.category] || "bg-gray-200"
                }`}
                draggable
                onDragStart={() => handleDragStart(event.id)}
              >
                <h4 className="font-semibold">{event.name}</h4>
                <p>
                  {event.startTime} - {event.endTime}
                </p>
                {event.description && <p>{event.description}</p>}
                <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EditNoteIcon /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteOutlineIcon /> Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No events for this date.</li>
          )}
        </ul>
        <button
          onClick={openModalForNewEvent}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
        {/* Export Events */}
        <div className="mt-4 flex w-full justify-end">
          <div className="relative mt-auto">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Export This Month's Events
            </button>
            <div className="absolute bg-white shadow-md rounded mt-2 w-48">
              <button
                onClick={() => exportEventsAsJSON(getEventsForCurrentMonth())}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Export as JSON
              </button>
              <button
                onClick={() => exportEventsAsCSV(getEventsForCurrentMonth())}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Export as CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <EventModal
          selectedDate={selectedDate}
          events={events}
          addEvent={handleAddOrUpdateEvent}
          closeModal={() => setIsModalOpen(false)}
          initialEvent={editEvent}
          categories={categories}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
