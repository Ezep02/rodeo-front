import React from 'react';
import { Product } from '@/internal/reservation/model/Product';
import PromotionCard from '../card/PromotionCard';

type Props = {
    promotionList: Product[]
    onClickAction: (product: Product) => void
}

const PromotionSection: React.FC<Props> = ({ promotionList, onClickAction }) => {
    return (
        <>
            {Array.isArray(promotionList) && promotionList.length > 0 && (
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 gap-6">
                    {promotionList.slice(0, 3).map((p, i) => (
                        <PromotionCard key={i} product={p} onClickAction={onClickAction} />
                    ))}
                </div>
            )}
        </>
    );
};

export default PromotionSection;