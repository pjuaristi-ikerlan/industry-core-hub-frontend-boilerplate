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
  Image: string;
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
          description: part.Description,
          image: {
            alt: part.Name,
            src: part.Image
          },
          onButtonClick: () => handleButtonClick(part),
        }))}
        variant="expanded"
      />
    );
  }

export default ProductsList;
