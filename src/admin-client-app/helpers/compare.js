export default (field, asc) =>
{
    const order = asc ? 1 : -1;

    switch (field)
    {
        case "_id":
            return (a, b) => {
                const A = a[field] || -Number.MAX_VALUE;
                const B = b[field] || -Number.MAX_VALUE;
                return (Number.parseInt(A) - Number.parseInt(B)) * order;
            };

        case "created_date":
        case "updated_date":
            return (a, b) => {
                const A = a[field] || 0;
                const B = b[field] || 0;
                return (Date.parse(A) - Date.parse(B)) * order;
            };
            
        default:
            return (a, b) => {
                const A = a[field] || "";
                const B = b[field] || "";
                return A.localeCompare(B) * order;
            }
    }
};