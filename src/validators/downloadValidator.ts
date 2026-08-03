import { FormType } from "@/types/form";
import { isValidName } from "@/utils/isValidName";

export const downloadValidator = (data: FormType) => {
    const status = { isValid: true, message: "" };

    if (!data.brochure_name || data.brochure_name === "") {
        status.isValid = false;
        status.message = "Brochure required";
        return status;
    }

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

    return status;
}