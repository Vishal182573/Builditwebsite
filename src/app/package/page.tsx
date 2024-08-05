import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaChevronRight } from 'react-icons/fa';

interface MaterialOption {
    title: string;
    steel: string;
    bricks: string;
    cement: {
        slabs: string;
        brickworks: string;
    };
    learnMoreLink: string;
}

const materialOptions: MaterialOption[] = [
    {
        title: 'Classic',
        steel: 'DHANALAKSHMI/KAMADHENU steel will be used',
        bricks: 'RED BRICKS',
        cement: {
            slabs: 'For slabs and pillars [53-Grade cement Brand: Nagarjuna / JSW]',
            brickworks: 'For brickworks and internal works [43-Grade cement Brand: Nagarjuna, JSW, Chettinad]',
        },
        learnMoreLink: '#',
    },
    {
        title: 'Premium',
        steel: 'JAYRAJ/SREE TMT steel will be used',
        bricks: 'LIGHTWEIGHT RED BRICKS',
        cement: {
            slabs: 'For slabs and pillars [53-Grade cement Brand: BIRLA A1/BHARATHI]',
            brickworks: 'For brickworks and internal works [43-Grade cement Brand: Nagarjuna, JSW, Chettinad]',
        },
        learnMoreLink: '#',
    },
    {
        title: 'Luxury',
        steel: 'JSW / VIZAG / TATA TMT steel will be used',
        bricks: 'Karimnagar LIGHT WEIGHT RED BRICKS',
        cement: {
            slabs: 'For slabs and pillars [53-Grade cement Brand: ultra tech]',
            brickworks: 'For brickworks and internal works [43-Grade cement Brand: Bharathi/Birla]',
        },
        learnMoreLink: '#',
    },
];

const MaterialOptions: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {materialOptions.map((option) => (
                <Card key={option.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <CardTitle className="text-2xl font-bold">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <MaterialItem label="Steel" value={option.steel} />
                        <MaterialItem label="Bricks" value={option.bricks} />
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Cement:</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>{option.cement.slabs}</li>
                                <li>{option.cement.brickworks}</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t">

                        <a href={option.learnMoreLink}
                            className={"inline-flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"}
                        >
                            LEARN MORE
                            <FaChevronRight className="w-5 h-5 ml-2" />
                        </a>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

const MaterialItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col space-y-1">
        <span className="text-gray-600 font-medium">{label}:</span>
        <Badge variant="secondary" className="text-sm self-start">
            {value}
        </Badge>
    </div>
);

export default MaterialOptions;