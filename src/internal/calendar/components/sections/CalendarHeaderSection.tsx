const CalendarHeaderSection = () => {
  

  const today = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Tarjeta de perfil horizontal */}
      <div className="flex justify-between flex-col gap-3 bg-zinc-900 p-7 shadow-lg rounded-4xl">
        {/* Saludo y fecha */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-200 tracking-tight">
            ¡Bienvenido barbero!,
          </h2>
          <p className="text-zinc-300">{today}</p>
        </div>

        {/* Cantidad de citas */}
        <div className="flex flex-col">
          <h4 className="text-gray-300 text-sm">¿Que puedo hacer aqui?</h4>
          <span className="text-gray-200 font-semibold">
            Esta es tu agenda de citas
          </span>
        </div>
      </div>

      {/* Placeholder adicional */}
      <div className="rounded-4xl bg-zinc-200/50 p-6 text-gray-500 flex items-center justify-center">
        Próximamente
      </div>

      {/* Placeholder adicional */}
      <div className="rounded-4xl bg-zinc-200/50 p-6 text-gray-500 flex items-center justify-center">
        Próximamente
      </div>
    </section>
  );
};

export default CalendarHeaderSection;

// const ConnectCalendar = () => {
//   window.location.href = `${
//     import.meta.env.VITE_AUTH_BACKEND_URL
//   }/calendar/google-calendar/login`;
// };

// Veriffcar sesion de google calendar
// const { isCalendarConnected, barberInfo } = useGoogleCalendarStatus();

{
  /* <div>
        {isCalendarConnected ? (
          <MyCalendar barberInfo={barberInfo} />
        ) : (
          <Button onClick={ConnectCalendar}>Conectar calendario</Button>
        )}
      </div> */
}
