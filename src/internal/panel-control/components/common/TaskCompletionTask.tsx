const TaskCompletionCard = () => {
  const totalTasks = 50;
  const completedTasks = 39;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-5xl font-semibold text-gray-900">
            {completionRate}%
          </p>
          <p className="text-sm text-gray-500 mt-2">Tasa de finalización</p>
        </div>
        <div className="text-sm text-gray-100 bg-zinc-900 px-3 py-1 rounded-full">
          {completedTasks} de {totalTasks} turnos
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-900 rounded-full transition-all"
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskCompletionCard;
