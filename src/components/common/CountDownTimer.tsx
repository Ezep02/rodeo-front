

import React, { useEffect, useState } from 'react'



interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

type Props = {
    date: Date
    time: string
}

const CountDownTimer: React.FC<Props> = ({ date, time }) => {


    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });


    useEffect(() => {
        if (!date || !time) return;

        const calculateTimeLeft = () => {
            const targetDate = new Date(date);
            const [hours, minutes] = time.split(':').map(Number);
            targetDate.setHours(hours, minutes, 0, 0);

            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [time, date]);


    return (
        <div className="">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Tiempo restante</h3>
            <div className="bg-gray-900 rounded-xl p-6 text-white">
                <div className="grid grid-cols-4 gap-4 text-center">
                    {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                        <div key={unit}>
                            <div className="text-2xl font-bold">{String(timeLeft[unit]).padStart(2, '0')}</div>
                            <div className="text-xs text-gray-300 capitalize">{unit}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CountDownTimer
