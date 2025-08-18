import { Product } from "../../model/Product";
import { IoAddCircleOutline } from "react-icons/io5";

type Props = {
    product: Product;
    onClickAction: (prod: Product) => void;
};

const PromotionCard: React.FC<Props> = ({ product, onClickAction }) => (
    <div className="relative group overflow-hidden rounded-lg cursor-pointer">
        {/* Imagen con blur al hacer hover */}
        <img
            src={product.preview_url}
            alt={product.name || "Promoción"}
            className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
        />
        {/* Overlay con texto, también con blur al hacer hover */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:blur-sm">
            <h3 className="text-white text-lg font-semibold">{product.name}</h3>
            <p className="text-white text-sm">
                {product.description || "Oferta especial por tiempo limitado."}
            </p>
        </div>

        <button
            onClick={() => onClickAction(product)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Seleccionar producto"
        >
            <div className="w-12 h-12 rounded-full  bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 cursor-pointer">
                <IoAddCircleOutline size={44} className="text-zinc-50 hover:text-zinc-400" />
            </div>
        </button>
    </div>
);

export default PromotionCard;
