# **Dynamic Event Calendar Application**

## **Overview**
The **Dynamic Event Calendar Application** is a React-based calendar app that allows users to manage events seamlessly. Users can add, edit, delete, and categorize events. The application provides drag-and-drop functionality for rescheduling events and supports event filtering and color-coded categorization. Data persistence is handled using `localStorage`.

---

## **Features**

### **Core Features**
1. **Calendar View**:
   - Dynamic calendar grid for the current month.
   - Highlight for today's date.
   - Highlight for the selected date.
   - Navigation between months.

2. **Event Management**:
   - Add events with details such as:
     - Event name.
     - Start and end time.
     - Description.
     - Category (e.g., Work, Personal, Health, etc.).
   - Edit and delete existing events.
   - Prevent overlapping events with collision detection.

3. **Search Functionality**:
   - Global event search by name.
   - Filtered search results displayed dynamically.

4. **Drag-and-Drop**:
   - Reschedule events by dragging them to another date on the calendar.

5. **Dynamic Categorization**:
   - Color-coded categories for events:
     - Work, Personal, Health, Education, Finance, Recreation, and Other.
   - Dynamically manage categories (add new categories and assign custom colors).

6. **Data Persistence**:
   - All events are saved to `localStorage` to persist between sessions.

---

## **Setup and Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/dynamic-event-calendar.git
cd dynamic-event-calendar
```

### **2. Install Dependencies**
Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
```bash
npm install
```

### **3. Start the Application**
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to view the application.

---

## **Project Structure**
```
├── src
│   ├── components
│   │   ├── CalendarGrid.tsx       # Main calendar component
│   │   ├── EventModal.tsx         # Modal for adding/editing events
│   │   └── ui                     # UI components (e.g., buttons, inputs)
│   ├── styles                     # Global styles
│   └── App.tsx                    # Application entry point
├── public
│   └── index.html                 # HTML template
├── README.md                      # Project documentation
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite configuration
```

---

## **Usage Instructions**

### **1. Adding Events**
- Click the "Add Event" button in the events panel.
- Fill in the event details:
  - Name, time, description, and category.
- Save the event.

### **2. Editing Events**
- Hover over an event in the events panel and click the "Edit" button.
- Update the event details and save.

### **3. Deleting Events**
- Hover over an event in the events panel and click the "Delete" button.

### **4. Rescheduling Events**
- Drag an event from the events panel and drop it onto a date in the calendar.

### **5. Searching Events**
- Use the search bar to filter events globally by name.

---

## **Technologies Used**
- **Frontend**:
  - React.js (with functional components and hooks).
  - TypeScript.
  - [shadcn/ui](https://shadcn.dev) for modern UI components.
- **State Management**:
  - React's `useState` and `useEffect`.
- **Data Persistence**:
  - `localStorage` for event storage.
- **Development Tools**:
  - Vite.js for fast development.

---

## **Planned Enhancements**
- Export event data as **JSON** or **CSV**.
- Add more granular categories.
- Deploy the application to platforms like Vercel or Netlify.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License.

---

## **Screenshots**
### Calendar Grid View
![Calendar View](path-to-calendar-image)

### Add Event Modal
![Add Event Modal](path-to-event-modal-image)

---