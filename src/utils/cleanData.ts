export const cleanedData = (data: any) => {
    const newData = Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) => value !== "" && value !== null && value !== undefined
        )
    );
    return newData;
}