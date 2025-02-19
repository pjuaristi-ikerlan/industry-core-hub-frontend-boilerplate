import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import carPartsData from "../data/sample-data.json";
import { Cards } from '@catena-x/portal-shared-components';

interface CarPart {
  uuid: string;
  PartInstanceID: string;
  Name: string;
  Status: string;
  SingleLevelBom: string;
  Manufacturer: string;
  Material: string;
  WeightKg: number;
  Category: string;
  Description: string;
}

function ProductsList() {
    const [carParts, setCarParts] = useState<CarPart[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      setCarParts(carPartsData);
    }, []);

    const handleButtonClick = (part: CarPart) => {
      navigate(`/product/${part.uuid}`);  // Navigate to the details page
    };
  
    return (
      <Cards
        buttonText="VIEW"
        items={carParts.map((part) => ({
          key: part.Name,
          title: part.Name,
          subtitle: part.Manufacturer,
          description: (
            <>
                <p style={{margin: '0px'}}>Category: {part.Category}</p>
                <p style={{margin: '0px'}}>Status: {part.Status}</p>
                <p style={{margin: '0px'}}>Material: {part.Material}</p>
                <p style={{margin: '0px'}}>Weight: {part.WeightKg} kg</p>
            </>),
          image: {
            alt: part.Name,
            src: "https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420"
          },
          onButtonClick: () => handleButtonClick(part),
        }))}
        variant="expanded"
      />
    );
  }

export default ProductsList;
