import { useUser } from "@/hooks/useUser";

const HeaderSection = () => {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "¡Buen día!"
      : hours < 18
      ? "¡Buenas tardes!"
      : "¡Buenas noches!";

  const today = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });
  const { userInfo } = useUser();

  return (
    <div className="min-h-[300px] flex justify-baseline items-end bg-[radial-gradient(circle,rgba(189,250,145,1)_0%,rgba(247,247,247,1)_50%,rgba(255,255,255,1)_100%)]">
      <div className="p-4">
        {/* Saludo y fecha */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight">
            {greeting} <span className="">{userInfo?.username},</span>
          </h2>
          <p className="text-zinc-800">{today}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
