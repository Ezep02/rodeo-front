import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Hands-on Art of Regenerative Aesthetics Masterclass",
    date: "15 jun 2024",
    time: "36 D",
    duration: "12 H • 46 M • 12 S",
    location: "VERO BEACH, FL 32963",
    seats: 18,
    totalSeats: 120,
    badge: "NEW",
    status: "available",
  },
  {
    id: 2,
    title: "Building Med Spa Business or Maybe Longer Event Name",
    date: "25 jul 2024",
    time: "12 H",
    duration: "46 M • 12 S",
    location: "MIAMI, FL 33963",
    seats: 72,
    totalSeats: 102,
    status: "available",
  },
  {
    id: 3,
    title: "Building Med Spa Business or Maybe Longer Event Name",
    date: "30 jan 2025",
    time: "12 H",
    duration: "46 M • 12 S",
    location: "LOS ANGELES, CA 23963",
    seats: 0,
    totalSeats: 100,
    badge: "SOLD OUT",
    status: "sold-out",
  },
  {
    id: 4,
    title: "Botulin Toxin Fundamentals Course or Maybe Longer Event Name",
    date: "22 feb 2026",
    time: "12 H",
    duration: "46 M • 12 S",
    location: "NEW YORK CITY, NY 32963",
    seats: 69,
    totalSeats: 122,
    status: "available",
  },
];

const MyAppointment = () => {
  return (
    <section className="flex flex-col gap-4 pt-6 px-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            Actividad
          </h2>
          <p className="text-sm text-zinc-500">All results (12)</p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-zinc-200 text-zinc-700 hover:bg-zinc-100"
        >
          Filtrar por
        </Button>
      </div>

      {/* Event List */}
      <div className="space-y-5 pt-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 rounded-3xl transition-all duration-300"
          >
            {/* Fecha */}
            <div className="flex items-center justify-center w-24 text-sm font-medium text-zinc-600 pt-2">
              <span>{event.date}</span>
            </div>

            {/* Caja del evento */}
            <div className="flex-1 bg-zinc-100/85 hover:bg-zinc-100 border border-zinc-100 transition-all rounded-3xl p-5 flex justify-between items-start gap-4">
              <div className="flex-1 space-y-2">
                {/* Título + badge */}
                <div className="flex items-center gap-2">
                  <h3 className="text-base md:text-lg font-semibold text-zinc-900 leading-snug">
                    {event.title}
                  </h3>
                  {event.badge && (
                    <Badge
                      className={`rounded-full text-xs px-2 py-0.5 ${
                        event.badge === "SOLD OUT"
                          ? "bg-rose-100 text-rose-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {event.badge}
                    </Badge>
                  )}
                </div>

                {/* Datos secundarios */}
                <div className="text-sm text-zinc-500 flex flex-wrap gap-3">
                  <span>{event.location}</span>
                  <span>• {event.time}</span>
                  <span>• {event.duration}</span>
                  <span>
                    {event.seats}/{event.totalSeats} seats
                  </span>
                </div>
              </div>

              {/* Botón */}
              <div className="flex items-center">
                <Button
                  disabled={event.status === "sold-out"}
                  className={`rounded-full text-sm font-medium transition-colors px-5 py-2 ${
                    event.status === "sold-out"
                      ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-zinc-800"
                  }`}
                >
                  {event.status === "sold-out" ? "Sold Out" : "Register Now"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointment;
