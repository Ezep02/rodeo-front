import { Service } from "../../models/ServicesModels";
import { useForm } from "react-hook-form";

interface ServiceFormProps {
  service: Service;
}

const EditServiceForm: React.FC<ServiceFormProps> = ({ service }) => {
 
  const { register } = useForm<Service>();

  // const { UpdateServiceData } = useServices()

  // const UpdateData = handleSubmit(async (data: Service) => {
  //   let updateObjet: Service = {
  //     ID: selectedServiceToEdit!.ID,
  //     description: data.description,
  //     price: data.price,
  //     service_duration: data.service_duration,
  //     title: data.title,
  //     created_by_id: selectedServiceToEdit!.created_by_id
  //   }

  //   UpdateServiceData(updateObjet)
  // });

  return (
    <main className="absolute inset-0 grid grid-cols-12 grid-rows-12 place-items-center bg-opacity-70 z-20">
      <form
        className="   
            w-full bg-white rounded-lg p-6 flex flex-col gap-6
            xl:col-start-4 xl:col-end-11 xl:row-start-3 xl:row-end-11 h-full
            col-start-1 col-end-13 row-start-1 row-end-13
          "

      >
        <header className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Editar Servicio</h3>
        </header>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-gray-600 text-sm font-medium">Nombre de servicio</label>
          <input
            type="text"
            placeholder="Título del servicio"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={service?.title}
            {...register("title", {
              required: true,
              maxLength: 150,
              minLength: 1
            })}

          />
          <label htmlFor="" className="text-gray-600 text-sm font-medium">Descripcion</label>
          <textarea
            placeholder="Descripción del servicio"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={service?.description}
            {...register("description")}
          />

          <label htmlFor="" className="text-gray-600 text-sm font-medium">Precio</label>
          <input
            placeholder="Precio"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={service?.price}
            {...register("price", {
              valueAsNumber: true,
              required: true,
            })}
          />

          <label htmlFor="" className="text-gray-600 text-sm font-medium">Duracion</label>
          <input
            placeholder="Duración en minutos"
            defaultValue={service?.service_duration}
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register("service_duration", {
              valueAsNumber: true,

            })}
          />
        </div>

        <footer className="flex justify-end gap-4">
          <button
            type="button"
            // onClick={HandleOpenEditPopUp}
            className="px-4 py-2 border text-zinc-700 text-sm font-medium rounded-2xl  hover:text-zinc-600 transition-all hover:shadow"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
          >
            Guardar
          </button>
        </footer>
      </form>
    </main>
  );
};

export default EditServiceForm;
