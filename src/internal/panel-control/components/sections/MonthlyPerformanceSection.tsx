import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import PerformanceChart from "../charts/PerformanceChart";
import useBarber from "../../hooks/useBarber";
import { AlertCircle, BarChartIcon } from "lucide-react";

const MonthlyPerformanceSection = () => {
    const { yearlyCutsChartData } = useBarber();

    return (
        <Card className="bg-gray-900/50 border-gray-800">
            {Array.isArray(yearlyCutsChartData) && yearlyCutsChartData.length > 0 ? (
                <PerformanceChart Data={yearlyCutsChartData} />
            ) : (
                <Card className="bg-transparent border-none sm:col-span-4 md:col-span-4 xl:col-span-2 col-span-1">
                    <CardHeader className="flex items-start gap-4">
                        <CardTitle className="flex items-center gap-2 text-zinc-50 text-sm sm:text-2xl">

                            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                                <BarChartIcon className="w-5 h-5 text-rose-500" />
                            </div>
                            <div>
                                Rendimiento Mensual
                                <CardDescription className='text-gray-400'>Análisis de cortes por mes</CardDescription>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8 gap-2">
                        <AlertCircle className="w-6 h-6 text-gray-400" />
                        <p className="text-sm text-rose-500">Sin datos para mostrar</p>
                    </CardContent>
                </Card>
            )}
        </Card>
    );
};

export default MonthlyPerformanceSection;

