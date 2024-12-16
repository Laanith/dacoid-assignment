import React from 'react';
import CalendarGrid from '../components/CalendarGrid';

const CalendarPage: React.FC = () => {
    return (
        <div className="h-screen w-screen m-auto p-4 flex flex-col items-center justify-center bg-gray-200">
            <CalendarGrid />
        </div>
    );
};

export default CalendarPage;
