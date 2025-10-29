import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", current: 6, previous: 4 },
  { day: "Tue", current: 9, previous: 6 },
  { day: "Wed", current: 8, previous: 5 },
  { day: "Thu", current: 4, previous: 2 },
  { day: "Fri", current: 10, previous: 6 },
];

export default function NewCustomersChart() {
  return (
    <div className="bg-zinc-200/50 rounded-3xl shadow p-6">
      <h2 className="text-gray-800 text-lg font-semibold mb-4">Cortes</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          {/* Barras del periodo actual */}
          <Bar dataKey="current" fill="#000000" radius={[4, 4, 0, 0]} barSize={20} />
          {/* Barras del periodo anterior (sombreado) */}
          <Bar dataKey="previous" fill="url(#pattern)" radius={[4, 4, 0, 0]} barSize={20} />
          <defs>
            <pattern id="pattern" patternUnits="userSpaceOnUse" width="6" height="6">
              <path d="M0 0 L6 6" stroke="#ccc" strokeWidth="2" />
            </pattern>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
