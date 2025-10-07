import serviceMasterCSV from "../data/serviceMaster.csv?raw";

interface ServiceMasterRow {
  serviceId: string;
  serviceNameShort: string;
  serviceName: string;
  imageUrl: string;
}

let parsedServices: ServiceMasterRow[] | null = null;

export const parseServiceMasterCSV = (): ServiceMasterRow[] => {
  if (parsedServices) {
    return parsedServices;
  }

  const lines = serviceMasterCSV.split("\n");
  const services: ServiceMasterRow[] = [];

  // Skip header row (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = line.split(",");
    if (columns.length >= 4) {
      services.push({
        serviceId: columns[0],
        serviceNameShort: columns[1],
        serviceName: columns[2],
        imageUrl: columns[3],
      });
    }
  }

  parsedServices = services;
  return services;
};

export const getServiceImageUrl = (serviceName: string): string | null => {
  const services = parseServiceMasterCSV();

  // Try to find exact match with non-empty image URL
  let service = services.find(
    (s) =>
      s.serviceName.toLowerCase() === serviceName.toLowerCase() &&
      s.imageUrl &&
      s.imageUrl.trim() !== ""
  );

  // If not found, try partial match with non-empty image URL
  if (!service) {
    service = services.find(
      (s) =>
        s.imageUrl &&
        s.imageUrl.trim() !== "" &&
        (s.serviceName.toLowerCase().includes(serviceName.toLowerCase()) ||
          serviceName.toLowerCase().includes(s.serviceName.toLowerCase()))
    );
  }

  // If not found, try with short name with non-empty image URL
  if (!service) {
    service = services.find(
      (s) =>
        s.imageUrl &&
        s.imageUrl.trim() !== "" &&
        s.serviceNameShort &&
        s.serviceNameShort.toLowerCase() === serviceName.toLowerCase()
    );
  }

  if (service && service.imageUrl && service.imageUrl.trim() !== "") {
    const imageUrl = `https://cdn.armut.com/images/services/${service.imageUrl}?tr=w-1200`;
    console.log(`Found service: ${serviceName}, Image URL: ${imageUrl}`);
    return imageUrl;
  }

  console.log(`No service found for: ${serviceName}`);
  return null;
};
