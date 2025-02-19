import { useParams } from "react-router-dom";
import carPartsData from "../data/sample-data.json";
import { DropdownMenu, StatusTag, Button, Icon, Typography } from '@catena-x/portal-shared-components';

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

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const part = carPartsData.find((part) => part.uuid === id);

  if (!part) {
    return <div>Product not found</div>;
  }

  return (
    <div>
        <Typography variant="h1" className="rolesAddedHeading">{part.Name}</Typography>
        <StatusTag color="confirmed" label="Registered" variant="filled" />
        <StatusTag color="declined" label="Draft" variant="filled" />
        <StatusTag color="pending" label="Pending" variant="filled" />
        <DropdownMenu buttonText="Share">
            <Button color="secondary" size="small" onClick={() => console.log("Copy unique ID")}>
            <Icon fontSize="16" iconName="ContentCopy" /> 
                Copy unique ID
            </Button>
            <Button color="secondary" size="small" onClick={() => console.log("Download")}>
                <Icon fontSize="16" iconName="FileDownload" /> 
                Download
            </Button>
            <Button color="secondary" size="small" onClick={() => console.log("Share with partner")}>
                <Icon fontSize="16" iconName="IosShare" /> 
            Share with partner
            </Button>
        </DropdownMenu>
        <p><strong>Part Instance ID:</strong> {part.PartInstanceID}</p>
        <p><strong>Manufacturer:</strong> {part.Manufacturer}</p>
        <p><strong>Status:</strong> {part.Status}</p>
        <p><strong>Material:</strong> {part.Material}</p>
        <p><strong>Category:</strong> {part.Category}</p>
        <p><strong>Weight:</strong> {part.WeightKg} kg</p>
        <p><strong>Single Level Bom:</strong> {part.SingleLevelBom} kg</p>
        <p><strong>Description:</strong> {part.description} kg</p>
        <img src="https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=640&q=420" alt={part.Name} />
        
        <Button color="success" size="large" onClick={() => console.log("Add button")}>
                <Icon fontSize="16" iconName="Add" /> 
            Share with partner
        </Button>
    </div>
  );
}

export default ProductDetail;
