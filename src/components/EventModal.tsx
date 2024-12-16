import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // shadcn Input
import { Button } from "@/components/ui/button"; // shadcn Button
import { Textarea } from "@/components/ui/textarea"; // shadcn Textarea

interface Event {
  id: string;
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  category: string;
}

interface EventModalProps {
  selectedDate: string;
  events: Event[];
  addEvent: (event: Event) => void;
  closeModal: () => void;
  initialEvent?: Event | null;
  categories: { [key: string]: string };
}

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  addEvent,
  closeModal,
  initialEvent,
  categories,
}) => {
  const [eventName, setEventName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [errors, setErrors] = useState<{ startTime?: string; endTime?: string }>({});

  useEffect(() => {
    if (initialEvent) {
      setEventName(initialEvent.name);
      setStartTime(initialEvent.startTime);
      setEndTime(initialEvent.endTime);
      setDescription(initialEvent.description || "");
      setCategory(initialEvent.category || "Other");
    }
  }, [initialEvent]);

  const validate = () => {
    const newErrors: { startTime?: string; endTime?: string } = {};

    if (startTime >= endTime) {
      newErrors.startTime = "Start time must be earlier than end time.";
      newErrors.endTime = "End time must be later than start time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const newEvent: Event = {
      id: initialEvent ? initialEvent.id : Date.now().toString(),
      date: selectedDate,
      name: eventName,
      startTime,
      endTime,
      description,
      category,
    };

    addEvent(newEvent);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialEvent ? "Edit Event" : "Add Event"} for {selectedDate}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium mb-1">
              Event Name *
            </label>
            <Input
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium mb-1">
              Start Time *
            </label>
            <Input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setErrors((prev) => ({ ...prev, startTime: undefined }));
              }}
              required
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium mb-1">
              End Time *
            </label>
            <Input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setErrors((prev) => ({ ...prev, endTime: undefined }));
              }}
              required
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              rows={3}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              className="bg-gray-300"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              {initialEvent ? "Update Event" : "Add Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
