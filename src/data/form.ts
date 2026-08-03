import { FormType } from "@/types/form";

export const contactFormInitialData: FormType = {
  name: "",
  email: "",
  message: "",
  contact_no: "",
  company_name: "",
};
export const brochureFormInitialData: FormType = {
  name: "",
  email: "",
  brochure_name: ""
};

export const consultationFormInitialData: FormType = {
  name: "",
  email: "",
  budget: "",
  message: "",
  services: [],
  contact_no: "",
  company_name: "",
};