import { useContext } from "react";
import { Service } from "../../models/Services.models";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { useForm } from "react-hook-form";

interface ServiceFormProps {
  service: Service;
}

const EditServiceForm: React.FC<ServiceFormProps> = ({ service }) => {
  const { HandleEditarServicio, UpdateServiceData, setSelectedServiceToEdit, selectedServiceToEdit } = useContext(PanelControlContext)!;

  const { register, handleSubmit } = useForm<Service>();


  const UpdateData = handleSubmit(async (data:Service) => {
    
    setSelectedServiceToEdit({
      ID: selectedServiceToEdit.ID,
      description: data.description,
      price: data.price,
      service_duration: data.service_duration,
      title: data.title,
      created_by_id: selectedServiceToEdit.created_by_id
    })

    UpdateServiceData()
  });

  return (
    <main className="absolute inset-0 grid grid-cols-12 grid-rows-12 place-items-center  bg-opacity-70 backdrop-blur-sm z-20">
      <form
        className="
         
            w-full bg-white shadow-md rounded-lg p-6 flex flex-col gap-6
            xl:col-start-4 xl:col-end-11 xl:row-start-3 xl:row-end-9 h-full
            col-start-1 col-end-13 row-start-1 row-end-13
          "
        onSubmit={UpdateData}
      >
        <header className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Editar Servicio</h3>
        </header>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título del servicio"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={service?.title}
            {...register("title",{
              required: true,
              maxLength:150,
              minLength: 1
            })}
            
          />
          <textarea
            placeholder="Descripción del servicio"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={service?.description}
            {...register("description")}
          />
          <input
         
           
            placeholder="Precio"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={service?.price}
            {...register("price", {
              valueAsNumber: true,
              required: true,              
            })}
          />
          <input
        
            placeholder="Duración en minutos"
            defaultValue={service?.service_duration}
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register("service_duration",{
              valueAsNumber: true,
              
            } )}
          />
        </div>

        <footer className="flex justify-end gap-4">
          <button
            type="button"
            onClick={HandleEditarServicio}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Guardar
          </button>
        </footer>
      </form>
    </main>
  );
};

export default EditServiceForm;
