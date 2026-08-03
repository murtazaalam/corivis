import { FormType } from "@/types/form";
import { isValidName } from "@/utils/isValidName";

const numberRegex = /^[0-9]+$/;

export const contactValidator = (data: FormType) => {
    const status = { isValid: true, message: "" };

    if (!data.name || data.name === "") {
        status.isValid = false;
        status.message = "Name required";
        return status;
    }

    if (!data.email || data.email === "") {
        status.isValid = false;
        status.message = "Email required";
        return status;
    }

    if (!data.message || data.message === "") {
        status.isValid = false;
        status.message = "Message required";
        return status;
    }

    if (data.name.length < 4 || data.name.length > 20) {
        status.isValid = false;
        status.message = "Name must be 5-19 characters long";
        return status;
    }

    if (!isValidName(data.name)) {
        status.isValid = false;
        status.message = "Please enter a valid name";
        return status;
    }

    if (data.company_name && (data.company_name.length < 8 ||
        data.company_name.length > 30)) {
        status.isValid = false;
        status.message = "Company name must be 9-30 characters long";
        return status;
    }

    if (data.company_name && !isValidName(data.name)) {
        status.isValid = false;
        status.message = "Please enter a valid company name";
        return status;
    }

    if (data.contact_no && !numberRegex.test(data.contact_no)) {
        status.isValid = false;
        status.message = "Please enter a valid number";
        return status;
    }

    if (data.contact_no && data.contact_no.length !== 10) {
        status.isValid = false;
        status.message = "Please enter a nalid contact number";
        return status;
    }

    if (data.message.length < 10) {
        status.isValid = false;
        status.message = "Message must be greater than 10 characters";
        return status;
    }

    return status;
}