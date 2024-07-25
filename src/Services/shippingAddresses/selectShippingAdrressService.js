import { selectShippingAdrressModel } from "../../Models/shippingAddresses/selectShippingAdrressModel.js";

export const selectShippingAdrressService = async (body) => {
  const { address } = body;

  // Selecciono la direccion de envio
  const selectionAddress = await selectShippingAdrressModel(address);

  return selectionAddress;
};
